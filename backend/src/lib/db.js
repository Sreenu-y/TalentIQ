import mongoose from "mongoose";

import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(ENV.DB_URL);
    console.log("Connected to MongoDB", con.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1); // 0 means success, 1 means failure
  }
};
