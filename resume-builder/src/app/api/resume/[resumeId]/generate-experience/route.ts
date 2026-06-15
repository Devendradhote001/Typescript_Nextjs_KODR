import { generateAiResponse } from "@/lib/gemini";
import { IApiResponse } from "@/types/apiResponse.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body = await req.json();

    const { experienceLevel, companyName, designation } = body;

    if (!experienceLevel || !companyName || !designation)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );

    let prompt = `
    You are an expert Resume Writer, ATS Optimization Specialist, and Senior Technical Recruiter.

Your task is to generate a professional, ATS-friendly work experience description based ONLY on the information provided.

## User Input

- Experience Level: {${experienceLevel}}
- Company Name: {${companyName}}
- Designation: {${designation}}

## Instructions

Generate 4 to 6 professional resume bullet points that accurately reflect the likely responsibilities and contributions associated with the given designation and experience level.

The content should:

- Be ATS-friendly and recruiter-friendly.
- Sound natural and professionally written.
- Use strong action verbs.
- Be concise, impactful, and technically relevant.
- Reflect increasing responsibility based on the experience level.
- Focus on responsibilities, collaboration, development, problem-solving, and professional contributions.
- Be suitable for direct inclusion in a resume.

## Experience Guidelines

- Fresher:
  - Focus on learning, collaboration, assisting in development tasks, debugging, and understanding best practices.

- 1–2 Years:
  - Emphasize feature development, bug fixing, testing, API integration, collaboration, and code quality.

- 3–5 Years:
  - Highlight ownership of modules, technical decision-making, mentoring, optimization, cross-functional collaboration, and scalable development.

- 5+ Years:
  - Focus on leadership, architecture, mentoring, project planning, strategic initiatives, technical direction, and delivery.

## Strict Rules

- Do NOT invent projects.
- Do NOT invent measurable achievements.
- Do NOT invent percentages or numbers.
- Do NOT invent clients or products.
- Do NOT invent technologies that were not provided.
- Do NOT mention confidential business details.
- Do NOT use buzzword stuffing.
- Do NOT use markdown.
- Do NOT use emojis.
- Do NOT use headings.
- Do NOT use numbering.

Each bullet should be 15–30 words long and start with a strong action verb.

Return ONLY the bullet points as plain text.
    `;

    const result = await generateAiResponse(prompt);
    let experienceDescription = result;

    return NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "experience description generated",
        data: {
          experienceDescription,
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
