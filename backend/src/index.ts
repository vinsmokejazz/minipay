import express from "express";
import dotenv from "dotenv";

async function main() {

  
  // Load environment variables
  dotenv.config({
    path: "./.env",
  });

  // Create a new express application
  const app = express();

  app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
  });
}

main();
