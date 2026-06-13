import { IUser } from "@/types/user.types";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Omit<IUser, "_id">, Document {
  comparePass(candidatePassword: string): boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, "email already registered"],
      required: [true, "email is required"],
      trim: true,
    },
    mobile: {
      type: String,
      minLength: [10, "minimum 10 char required"],
      maxLength: [10, "minimum 10 char required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "min 6 char required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (): void {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePass = function (candidatePassword: string): boolean {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;
