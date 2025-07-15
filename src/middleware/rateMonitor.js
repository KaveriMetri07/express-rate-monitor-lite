// src/middleware/rateMonitor.js
import "dotenv/config";
import Log from "../models/log.model.js";
import getClientIp from "../utils/helpers.utils.js";
import fetch from "node-fetch"; // Optional: for sending alerts via webhook

/**
 * Middleware to log and optionally rate-limit API requests.
 * @param {Object} options
 * @param {number} options.limit - Max requests allowed in window
 * @param {number} options.window - Time window in seconds
 * @param {string} options.mode - 'alert' (logs only) or 'block' (blocks request)
 * @param {string} options.webhookUrl - Optional alert webhook URL
 */

const rateMonitor = ({
  limit = 100,
  window = 60,
  mode = "alert",
  webhookUrl,
} = {}) => {
  return async (req, res, next) => {
    try {
      const ip = getClientIp(req);
      const endpoint = req.originalUrl;
      const now = new Date();
      const windowStart = new Date(now.getTime() - window * 1000);

      // Count past requests from this IP + endpoint in time window
      const requestCount = await Log.countDocuments({
        ip,
        endpoint,
        timestamp: { $gte: windowStart },
      });

      const blocked = requestCount >= limit;

      // Log this request
      await Log.create({
        ip,
        endpoint,
        hits: requestCount + 1,
        blocked,
      });

      if (blocked) {
        if (mode === "block") {
          return res
            .status(429)
            .json({ message: "Too many requests. Try again later." });
        }

        // ALERT Mode
        console.log(` ALERT: IP ${ip} exceeded limit on ${endpoint}`);

        //Determine webhook source (env fallback)
        const finalWebhookUrl = webhookUrl || process.env.WEBHOOK_URL;

        // Send webhook if URL provided
        if (finalWebhookUrl) {
          try {
            await fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                content: `🚨 Rate limit exceeded by IP: ${ip} on ${endpoint} at ${new Date().toISOString()}`,
              }),
            });

            console.log("Webhook alert sent.");
          } catch (err) {
            console.error("Webhook failed:", err.message);
          }
        }
      }

      next();
    } catch (err) {
      console.error("Rate monitor error:", err.message);
      next(); // Don't block the request if something fails
    }
  };
};

export default rateMonitor;
