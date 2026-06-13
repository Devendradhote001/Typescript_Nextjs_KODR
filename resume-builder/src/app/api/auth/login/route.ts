import { IApiResponse } from "@/types/apiResponse.types";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import { LoginBody } from "@/types/user.types";
import UserModel from "@/models/user.model";
import { generateJWT } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: LoginBody = await req.json();

    const { email, password } = body;

    if (!email || !password)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );

    const isExisted = await UserModel.findOne({ email });

    if (!isExisted)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );

    const comparePass = isExisted.comparePass(password);

    if (!comparePass)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );

    const token = generateJWT({ userId: isExisted._id.toString() });

    const response = NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "user loggedin",
        data: isExisted,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    return NextResponse.json<IApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
