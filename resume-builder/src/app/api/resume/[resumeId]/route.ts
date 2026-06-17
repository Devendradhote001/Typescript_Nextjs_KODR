import connectDB from "@/config/db";
import { getMe } from "@/lib/getMe";
import ResumeModel from "@/models/resume.model";
import { IApiResponse } from "@/types/apiResponse.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    await connectDB();

    const { resumeId } = await params;

    const user = await getMe();

    if (!user)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "Unauthorized request",
        },
        { status: 401 }
      );

    const resume = await ResumeModel.findOne({
      _id: resumeId,
      user_id: user._id,
    });

    if (!resume)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "Resume not found",
        },
        { status: 404 }
      );

    return NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "Resume fetched",
        data: resume,
      },
      { status: 200 }
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    await connectDB();

    const { resumeId } = await params;

    const user = await getMe();

    if (!user)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "Unauthorized request",
        },
        { status: 401 }
      );

    const body = await req.json();

    const updatedResume = await ResumeModel.findOneAndUpdate(
      {
        _id: resumeId,
        user_id: user._id,
      },
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedResume)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "Failed to update resume",
        },
        { status: 400 }
      );

    return NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "Resume updated",
        data: updatedResume,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in update api", error);
    return NextResponse.json<IApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ resumeId: string }> }
// ) {
//   try {
//     await connectDB();

//     const { resumeId } = await params;

//     const user = await getMe();

//     if (!user)
//       return NextResponse.json<IApiResponse>(
//         {
//           success: false,
//           message: "Unauthorized request",
//         },
//         { status: 401 }
//       );

//     const body = await req.json();

//     const updatedResume = await ResumeModel.findOneAndUpdate(
//       {
//         _id: resumeId,
//         user_id: user._id,
//       },
//       {
//         $set: body,
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!updatedResume)
//       return NextResponse.json<IApiResponse>(
//         {
//           success: false,
//           message: "Failed to update resume",
//         },
//         { status: 400 }
//       );

//     return NextResponse.json<IApiResponse>(
//       {
//         success: true,
//         message: "Resume updated",
//         data: updatedResume,
//       },
//       { status: 500 }
//     );
//   } catch (error) {
//     return NextResponse.json<IApiResponse>(
//       {
//         success: false,
//         message: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }
