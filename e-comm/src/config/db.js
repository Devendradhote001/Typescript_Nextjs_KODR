import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb://0.0.0.0/test-next-db");
  console.log("mongodb connected..");
};
