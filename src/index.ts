import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  //   if MONGODB_URL is not set, then throw an error
  if (!process.env.MONGODB_URI) {
    return console.log("MONGODB_URL not found");
  }

  if (isConnected) {
    return console.log("MONGODB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
    });

    isConnected = true;
    // console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB not connected");
  }
};
