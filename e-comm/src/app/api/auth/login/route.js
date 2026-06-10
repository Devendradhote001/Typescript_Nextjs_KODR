import { connectDB } from "@/config/db";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { email, password } = body;

    if (!email || !password)
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );

    const isExistedUser = await UserModel.findOne({ email });

    if (!isExistedUser)
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );

    if (!password === isExistedUser.password)
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
        }
      );

    return NextResponse.json(
      {
        success: true,
        message: "User registered",
        data: isExistedUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error in reg api", error);
    return NextResponse.json(
      {
        success: false,
        message: "something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
