import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

let isConnected: boolean = false;

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  //   if MONGODB_URL is not set, then throw an error
  if (!process.env.MONGODB_URI || !DB_NAME) {
    return console.log("MONGODB_URL not found");
  }

  if (isConnected) {
    return console.log("MONGODB is already connected");
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    isConnected = true;
    console.log(
      `\n MongoDB is connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB not connected");
    process.exit(1);
  }
};

export default connectToDatabase;
