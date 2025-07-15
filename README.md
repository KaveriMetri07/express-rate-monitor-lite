# express-rate-monitor

A lightweight Express middleware to monitor, log, and rate-limit API requests based on IP & endpoint. Fully customizable with MongoDB + optional alert system.

## Features

- Log every API request with IP and route
- Set limits and time windows (e.g., 100 requests in 60 seconds)
- Supports "alert" mode (just logs) or "block" mode (sends 429 response)
- Optional webhook alert on abuse
- Works with MongoDB and ES6 modules

---

## Installation

```bash
npm install express-rate-monitor

```

## ** Usage**

```javascript
import express from "express";
import rateMonitor from "express-rate-monitor";

const app = express();

app.use(
  rateMonitor({
    limit: 100, // Max requests
    window: 60, // Time window in seconds
    mode: "block", // "alert" or "block"
    webhookUrl: "https://your.webhook.site", // optional
  })
);

app.get("/", (req, res) => {
  res.send("Hello world!");
});
```

## ** MongoDB Setup**

Set MONGO_URI in .env:
MONGO_URI=mongodb+srv://your-db-url

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

## **Author**

Created by **Kaveri** — inspired by real-world security issues faced in production apps.
