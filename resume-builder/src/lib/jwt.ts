import { JWTPayload } from "@/types/user.types";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const generateJWT = (payload: JWTPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
