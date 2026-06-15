import connectDB from "@/config/db";
import { getMe } from "@/lib/getMe";
import ResumeModel from "@/models/resume.model";
import { IApiResponse } from "@/types/apiResponse.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = await getMe();

    if (!user)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "Unauthorized request",
        },
        { status: 401 }
      );

    const newResume = await ResumeModel.create({
      userId: user._id,
    });

    if (!newResume)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "failed to create resume",
        },
        { status: 400 }
      );

    return NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "Resume created",
      },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json<IApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
