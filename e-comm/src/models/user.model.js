import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "name is required"],
      trim: true,
    },
    password: {
      type: String,
      minlength: [6, "Min 6 characters"],
    },
    mobile: {
      type: String,
      minlength: 10,
      maxlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
