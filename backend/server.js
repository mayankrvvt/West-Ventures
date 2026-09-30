import "dotenv/config";

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import jobsRouter from "./routes/jobs.js";
import leadsRouter from "./routes/leads.js";

const app = express();

const PORT = Number(process.env.PORT) || 5050;

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
|
| Add your Vercel/custom frontend domains through CLIENT_URL.
|
| Example:
|
| CLIENT_URL=https://your-site.vercel.app,https://westventures.ca
|
| During local development, localhost and 127.0.0.1 ports are allowed.
|
*/

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  // Requests such as curl/Postman may not send an Origin header.
  if (!origin) {
    return true;
  }

  // Explicitly configured production origins.
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Allow localhost during development.
  if (process.env.NODE_ENV !== "production") {
    try {
      const url = new URL(origin);

      if (
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1"
      ) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      console.error("Blocked CORS origin:", origin);

      // Don't throw an error here.
      // Simply reject the origin.
      return callback(null, false);
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,

    optionsSuccessStatus: 204,
  })
);

/*
|--------------------------------------------------------------------------
| BODY PARSER
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "1mb",
  })
);

/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    status: "OK",
    message: "West Ventures backend is healthy.",
  });
});

/*
|--------------------------------------------------------------------------
| ADMIN LOGIN
|--------------------------------------------------------------------------
*/

app.post("/api/admin/login", (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.JWT_SECRET
    ) {
      return res.status(500).json({
        message: "Admin authentication is not configured.",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email: process.env.ADMIN_EMAIL,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Unable to process admin login.",
    });
  }
});

/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/

app.use("/api/jobs", jobsRouter);

app.use("/api/leads", leadsRouter);

/*
|--------------------------------------------------------------------------
| 404 HANDLER
|--------------------------------------------------------------------------
*/

app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({
      message: "API route not found.",
      method: req.method,
      path: req.path,
    });
  }

  next();
});

/*
|--------------------------------------------------------------------------
| GLOBAL ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    message: error.message || "Internal server error.",
  });
});

/*
|--------------------------------------------------------------------------
| START SERVER
|--------------------------------------------------------------------------
*/

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing.");

    process.exit(1);
  }

  try {
    /*
    |--------------------------------------------------------------------------
    | MongoDB
    |--------------------------------------------------------------------------
    */

    await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `MongoDB connected: ${mongoose.connection.host}`
    );

    /*
    |--------------------------------------------------------------------------
    | Express
    |--------------------------------------------------------------------------
    |
    | 0.0.0.0 is important for Render.
    | Render provides the PORT environment variable.
    |
    */

    const server = app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `West Ventures API running on port ${PORT}`
        );

        console.log(
          `Environment: ${
            process.env.NODE_ENV || "development"
          }`
        );
      }
    );

    /*
    |--------------------------------------------------------------------------
    | SERVER ERROR
    |--------------------------------------------------------------------------
    */

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use.`
        );

        console.error(
          `Run: lsof -i :${PORT}`
        );

        process.exit(1);
      }

      console.error(
        "Backend server error:",
        error
      );

      process.exit(1);
    });
  } catch (error) {
    console.error(
      "Failed to start backend:",
      error
    );

    process.exit(1);
  }
}

start();