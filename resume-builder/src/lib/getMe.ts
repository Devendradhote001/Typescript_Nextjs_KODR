import { IApiResponse } from "@/types/apiResponse.types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "./jwt";
import UserModel from "@/models/user.model";

export const getMe = async (): Promise<Object> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token)
    return NextResponse.json<IApiResponse>(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 404,
      }
    );

  const decode = verifyToken(token);

  if (!decode)
    return NextResponse.json<IApiResponse>(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );

  const user = await UserModel.findById(decode.userId);

  return user;
};
