import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import bodyParser from "body-parser";
import cors from "cors";
import { Rootrouter } from "./routes/index.js";

async function main() {
  // Load environment variables
  dotenv.config({
    path: "./.env",
  });

  // Validate required environment variables
  if (!process.env.MONGO_URI) {
    console.error("ERROR: MONGO_URI is not defined in environment variables");
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error("ERROR: JWT_SECRET is not defined in environment variables");
    process.exit(1);
  }

  if (!process.env.PORT) {
    console.error("ERROR: PORT is not defined in environment variables");
    process.exit(1);
  }

  // Create a new express application
  const app = express();

  // Security headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // Body parser middleware
  app.use(
    bodyParser.json({
      limit: "10kb",
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      credentials: true,
    })
  );

  app.use(express.json());

  // MongoDB connection
  await connectDB();

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use("/api/v1", Rootrouter);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  });

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Global error handler:", err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  });

  // Start server
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
