import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/resume-kodr");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in mongodb connection", error);
  }
};

export default connectDB;
