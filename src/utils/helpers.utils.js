// src/utils/helpers.js

const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];

  if (forwarded) {
    // In case of proxy, x-forwarded-for may contain multiple IPs
    return forwarded.split(",")[0].trim();
  }

  return req.ip || req.connection.remoteAddress || "unknown";
};

export default getClientIp;
