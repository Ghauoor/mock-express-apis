// func that take req obj and either res to clien or pass it to the other middleware func.

// Request Processing Pipeline
// Request --> json() --> route() --> Response
// If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
// cross cutting concerns --> logging auth authorization
// called in sequence
const fs = require("fs");
function log(req, res, next) {
  console.log("Logging....");
  next();
}

function auth(req, res, next) {
  console.log("Authenticating....");
  next();
}

function logger(req, res, next) {
  fs.appendFile(
    "log.txt",
    `\nDate: ${Date.now()} ipAddress:${req.ip} requestMethod: ${
      req.method
    } path: ${req.path}\n`,
    (err) => {
      if (err) {
        console.error("Error writing to log file", err);
      }
      next();
    }
  );
}

// Middleware to validate API key
function validateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  const validApiKey = "HelloWorld";

  if (!apiKey) {
    return res.status(401).json({ error: "API key is required" });
  }

  if (apiKey === validApiKey) {
    next(); // Proceed to the next middleware or request handler
  } else {
    return res.status(403).json({ error: "Invalid API key" });
  }
}

module.exports = { log, logger, auth, validateApiKey };
