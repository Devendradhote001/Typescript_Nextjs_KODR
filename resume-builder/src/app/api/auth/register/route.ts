import { IApiResponse } from "@/types/apiResponse.types";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import { RegisterBody } from "@/types/user.types";
import UserModel from "@/models/user.model";
import { generateJWT } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: RegisterBody = await req.json();

    const { email, password, name, mobile } = body;

    if (!email || !password || !name)
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

    if (isExisted)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 409,
        }
      );

    const newUser = await UserModel.create({
      name,
      email,
      password,
      mobile,
    });

    const token = generateJWT({ userId: newUser._id.toString() });

    const response = NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "User registered successfully",
        data: newUser,
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
