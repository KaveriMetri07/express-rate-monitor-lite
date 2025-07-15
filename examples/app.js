import "dotenv/config";
import express from "express";
import rateMonitor from "../src/middleware/rateMonitor.js";

const app = express();
app.use(express.json());
app.use(
  rateMonitor({
    limit: 100,
    window: 60,
    mode: "alert",
    webhookUrl: process.env.WEBHOOK_URL, // Optional: URL for sending alerts (e.g., Discord, Slack)
  })
);
app.get("/", (req, res) => {
  res.send("Hello from Express with rate monitor!");
});

export default app;
