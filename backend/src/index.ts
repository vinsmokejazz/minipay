import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import bodyParser from "body-parser";
import cors from "cors";


import { Rootrouter} from "./routes/index.js";


async function main() {

  // Load environment variables
  dotenv.config({
    path: "./.env",
  });

  // Create a new express application
  const app = express();

  app.use(bodyParser.json({
    limit:"10kb"
  }));

  app.use(cors());
  app.use(express.json());

  // MongoDB connection function
  await connectDB();


  // routes
  app.use("/api/v1", Rootrouter);

  app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
  });
}

main();
