import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

async function main() {
  // Load environment variables
  dotenv.config({
    path: "./.env",
  });

  // Create a new express application
  const app = express();
  app.use(express.json);

  // MongoDB connection function
  connectDB();

  app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
  });
}

main();
