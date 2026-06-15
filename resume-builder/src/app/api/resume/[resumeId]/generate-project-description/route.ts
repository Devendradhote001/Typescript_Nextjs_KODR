import { generateAiResponse } from "@/lib/gemini";
import { IApiResponse } from "@/types/apiResponse.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body = await req.json();

    const { projectName, techStack, overview } = body;

    if (!projectName || !techStack || !overview)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );

    let prompt = `
    You are an expert Resume Writer, ATS Optimization Specialist, and Senior Technical Recruiter.

Your task is to generate a professional, ATS-friendly resume project description based ONLY on the information provided by the user.

## User Input

- Project Name: {${projectName}}
- Tech Stack: {${techStack}} (Array)
- Project Overview: {${overview}}

## Instructions

Generate a concise yet impactful project description that:

- Is between 80 and 150 words.
- Is optimized for modern Applicant Tracking Systems (ATS).
- Naturally incorporates relevant technical keywords from the provided tech stack.
- Clearly explains the project's purpose and functionality.
- Highlights technical implementation and problem-solving aspects.
- Demonstrates practical application of the listed technologies.
- Uses strong action-oriented language.
- Sounds professional and suitable for inclusion in a resume.

## Requirements

- Base the description ONLY on the provided inputs.
- Do NOT invent features, metrics, users, companies, or achievements.
- Do NOT make false claims about scalability, performance improvements, or business impact unless explicitly mentioned.
- Do NOT add technologies that are not present in the provided tech stack.
- Do NOT use buzzword stuffing.
- Do NOT use markdown.
- Do NOT use emojis.
- Do NOT use bullet points.
- Do NOT include headings.
- Write in clear, grammatically correct English.

## ATS Optimization

- Naturally include relevant technical keywords from the tech stack.
- Emphasize implementation, architecture, integrations, data handling, authentication, UI development, API communication, or other aspects only if supported by the provided overview.
- Prioritize clarity and readability over keyword repetition.

Return ONLY the project description text.
    `;

    const result = await generateAiResponse(prompt);
    let projectDescription = result;

    return NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "project description generated",
        data: {
          projectDescription,
        },
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
