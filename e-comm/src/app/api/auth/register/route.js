import { connectDB } from "@/config/db";
import UserModel from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password, mobile } = body;

    if (!name || !email || !password)
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );

    const isExistedUser = await UserModel.findOne({ email });

    if (isExistedUser)
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );

    const newUser = await UserModel.create({
      name,
      email,
      password,
      mobile,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered",
        data: newUser,
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
