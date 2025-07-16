# express-rate-monitor-lite

[![npm version](https://badge.fury.io/js/express-rate-monitor-lite.svg)](https://www.npmjs.com/package/express-rate-monitor-lite)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight Express middleware to monitor, log, and rate-limit API requests based on IP & endpoint. Fully customizable with MongoDB + optional alert system.

## Features

- Rate-limit requests per IP + endpoint
- Log every API request (IP, route, timestamp) to MongoDB
- Block or Alert-only mode
- Optional webhook alerts (Discord, Slack, etc.)
- Modern ES6 module support
- Super easy to configure in any Express app

---

## Installation

```bash
npm install express-rate-monitor-lite

```

## ** Usage**

```javascript
import express from "express";
import rateMonitor from "express-rate-monitor-lite";

const app = express();

app.use(
  rateMonitor({
    limit: 100, // Max requests
    window: 60, // Time window (in seconds)
    mode: "block", // "block" or "alert"
    webhookUrl: "https://your.webhook.site", // Optional webhook for alerts
  })
);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
```

## ** MongoDB Setup**

Set MONGO_URI in .env:
MONGO_URI=mongodb+srv://your-db-url

## **Then call the connection in your main file (e.g., index.js):**

```javascript
import { connectTODB } from "express-rate-monitor-lite/src/db/connect.js";

connectTODB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
```

## Logs Stored in MongoDB:

```json
{
  "ip": "::1",
  "endpoint": "/",
  "hits": 6,
  "blocked": true,
  "timestamp": "2025-07-11T..."
}
```

## **Webhook Alert Format**

    When a rate limit is exceeded (in either alert or block mode), a POST request is sent to your webhook URL with the following JSON payload:
    ```json
    {
      "content": "🚨 Rate limit exceeded by IP: ::1 on endpoint: /"
    }
    ```
    This allows you to receive real-time alerts when your API is being abused or when a rate limit is hit.
    Great for integrating with tools like Discord or Slack.

## **Configuration Options**

| Option       | Type   | Default   | Description                                 |
| ------------ | ------ | --------- | ------------------------------------------- |
| `limit`      | Number | `100`     | Max requests allowed within the time window |
| `window`     | Number | `60`      | Time window in seconds                      |
| `mode`       | String | `"block"` | `"alert"` logs only, `"block"` sends 429    |
| `webhookUrl` | String | `null`    | Optional URL to send abuse alerts           |

## **Author**

Created by **Kaveri** —
Inspired by real-world security issues faced in production apps.
Let your Express app defend itself like a pro!

## **License**

Licensed under the MIT License
