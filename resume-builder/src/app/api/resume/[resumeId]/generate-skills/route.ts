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
      
      You are an expert Resume Writer, ATS Optimization Specialist, and Senior Technical Recruiter.

Your task is to generate a highly relevant list of professional skills based ONLY on the provided user information.

## User Input

- Job Role: {${jobRole}}
- Experience Level: {${experienceLevel}}

## Instructions

Generate a curated list of skills that are:

- Highly relevant to the specified job role.
- Appropriate for the given experience level.
- ATS-friendly and commonly recognized by recruiters.
- Frequently used in real-world job descriptions.
- Valuable for maximizing resume relevance and searchability.

## Skill Distribution

Include a balanced mix of:

- Technical Skills
- Tools & Technologies
- Frameworks & Libraries (when applicable)
- Programming Languages (when applicable)
- Databases (when applicable)
- Cloud & DevOps Skills (when applicable)
- Version Control & Development Tools
- Testing & Debugging Skills
- Methodologies & Best Practices
- Professional / Soft Skills

Adjust the complexity and seniority of the skills according to the experience level:

- Fresher:
  Focus on fundamental technologies, learning-oriented skills, and commonly expected tools.

- 1–3 Years:
  Include practical development skills, frameworks, debugging, collaboration tools, testing, and deployment knowledge.

- 3–5 Years:
  Include advanced technologies, architecture concepts, performance optimization, system design fundamentals, mentoring, and code quality practices.

- 5+ Years:
  Include leadership-oriented skills, architecture, scalability, cloud platforms, DevOps practices, security, performance optimization, and technical strategy.

## Rules

- Return between 20 and 35 unique skills.
- Avoid duplicate or synonymous entries.
- Do NOT include proficiency levels.
- Do NOT include explanations or descriptions.
- Do NOT use numbering.
- Do NOT use markdown.
- Do NOT use emojis.
- Return one skill per line.
- Prioritize industry-standard terminology and ATS-friendly keywords.

Return ONLY the list of skills in array.

      `;

    const result = await generateAiResponse(prompt);
    let skills = result;

    return NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "skills generated",
        data: {
          skills,
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
