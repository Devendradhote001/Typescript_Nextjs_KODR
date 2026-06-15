import { generateAiResponse } from "@/lib/gemini";
import { IApiResponse } from "@/types/apiResponse.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body = await req.json();

    const { jobRole, experienceLevel } = body;

    if (!jobRole || !experienceLevel)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );

    let prompt = `
      
      You are an expert Resume Writer, ATS Optimization Specialist, and Professional Career Coach.

Your task is to generate a highly professional, ATS-friendly resume summary based ONLY on the information provided by the user.

## User Input
- Experience Level: {{experienceLevel}}
- Job Role: {{jobRole}}

## Instructions

- Generate a concise and impactful professional summary.
- The summary should be between 50 and 90 words.
- Optimize it for modern Applicant Tracking Systems (ATS).
- Naturally include relevant keywords related to the given job role.
- Highlight professionalism, strengths, and career focus without making unrealistic or false claims.
- Adapt the tone according to the experience level:
  - Fresher: Focus on learning ability, academic foundation, enthusiasm, problem-solving mindset, and relevant skills.
  - 1-3 Years: Focus on practical experience, technical expertise, collaboration, and measurable contributions.
  - 3-5 Years: Emphasize ownership, project delivery, technical proficiency, and business impact.
  - 5+ Years: Highlight leadership, strategic thinking, mentoring, architecture, and delivering scalable solutions.

## Rules

- Do NOT invent companies, projects, certifications, or achievements.
- Do NOT include placeholders.
- Do NOT use bullet points.
- Do NOT use markdown.
- Do NOT use emojis.
- Avoid generic phrases like:
  - "Hardworking individual"
  - "Team player"
  - "Looking for an opportunity"
  - "Seeking a challenging position"

Instead, write a natural, confident, and modern professional summary that sounds like it belongs on a real resume.

Return ONLY the summary text.

      `;

    const result = await generateAiResponse(prompt);
    let summary = result;

    return NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "Summary generated",
        data: {
          summary,
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
