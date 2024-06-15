import mongoose, { connect } from "mongoose";
import { mongoDB_URL } from "../config.js";

// connecting database
const connectDB = async () => {
  await mongoose
    .connect(mongoDB_URL)
    .then(() => {
      console.log("Server connected to database!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
