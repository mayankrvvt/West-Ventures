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
| Production origins can be added through CLIENT_URL:
|
| CLIENT_URL=https://westventures.ca,https://www.westventures.ca
|
| During local development, localhost/127.0.0.1 ports are allowed so
| Vite can move between 5173, 5174, 5175, etc. without breaking CORS.
|
*/

const allowedOrigins = (
  process.env.CLIENT_URL || ""
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  // Requests such as curl/Postman may not send an Origin header.
  if (!origin) {
    return true;
  }

  // Explicitly configured origins.
  if (allowedOrigins.includes(origin)) {
    return true;
  }

  // Allow localhost and 127.0.0.1 during development.
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

      // Return false instead of throwing an error. This prevents
      // the CORS middleware from generating an unexpected 500.
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
  res.status(200).json({
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
        message:
          "Admin authentication is not configured.",
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
|
| This makes missing API routes easier to identify.
|
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
    message:
      error.message || "Internal server error.",
  });
});

/*
|--------------------------------------------------------------------------
| START SERVER
|--------------------------------------------------------------------------
*/

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error(
      "MONGODB_URI is missing from backend/.env"
    );

    process.exit(1);
  }

  try {
    /*
    |--------------------------------------------------------------------------
    | MongoDB
    |--------------------------------------------------------------------------
    */

    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      `MongoDB connected: ${mongoose.connection.host}`
    );

    /*
    |--------------------------------------------------------------------------
    | Express
    |--------------------------------------------------------------------------
    */

    const server = app.listen(PORT, () => {
      console.log(
        `West Ventures API running on http://localhost:${PORT}`
      );

      console.log(
        `Environment: ${
          process.env.NODE_ENV || "development"
        }`
      );
    });

    /*
    |--------------------------------------------------------------------------
    | PORT ERROR
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