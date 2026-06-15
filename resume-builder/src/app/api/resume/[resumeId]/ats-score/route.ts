import { generateAiResponse } from "@/lib/gemini";
import { IApiResponse } from "@/types/apiResponse.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body = await req.json();

    const { resumeText } = body;

    if (!resumeText)
      return NextResponse.json<IApiResponse>(
        {
          success: false,
          message: "Resume text is required",
        },
        { status: 400 }
      );

    let prompt = `
    You are an expert ATS Resume Analyzer, Professional Resume Writer, and Senior Technical Recruiter.

Your task is to analyze the provided resume content and generate an estimated ATS compatibility score along with detailed, actionable feedback.

## User Input

Resume Content:
{{resumeText}}

## Instructions

Carefully analyze the resume for:

- Professional Summary
- Work Experience
- Projects
- Technical Skills
- Education
- Certifications
- Keywords
- Formatting Consistency
- Clarity and Readability
- Content Quality
- Action Verbs
- Resume Completeness
- ATS Compatibility

Evaluate whether the resume effectively demonstrates:
- Relevant skills
- Technical expertise
- Experience presentation
- Career progression
- Impactful language
- Keyword optimization
- Professional structure

## Scoring

Generate an ESTIMATED ATS Compatibility Score between 0 and 100.

The score should consider:
- Keyword relevance
- Section completeness
- Content quality
- Resume organization
- Technical relevance
- Readability
- Action-oriented writing
- Consistency

Do NOT claim that this score comes from a real ATS system.

## Feedback

Provide:

1. Estimated ATS Score
2. Overall Assessment (2-4 sentences)
3. Strengths (3-6 bullet points)
4. Areas for Improvement (3-6 bullet points)
5. Missing Sections (if any)
6. Keyword Optimization Suggestions
7. Content Improvement Suggestions
8. Final Recommendation

## Rules

- Base the analysis ONLY on the provided resume.
- Do NOT invent missing information.
- Do NOT assume projects or experience that are not present.
- Do NOT fabricate skills or achievements.
- Keep feedback practical and actionable.
- Be constructive and professional.

## Output Format (JSON)

{
  "estimatedATSScore": 85,
  "overallAssessment": "...",
  "strengths": [
    "...",
    "..."
  ],
  "areasForImprovement": [
    "...",
    "..."
  ],
  "missingSections": [
    "..."
  ],
  "keywordSuggestions": [
    "...",
    "..."
  ],
  "contentSuggestions": [
    "...",
    "..."
  ],
  "finalRecommendation": "..."
}

Return ONLY valid JSON.
    `;

    const result = await generateAiResponse(prompt);
    let atsScore = result;

    return NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "experience description generated",
        data: {
          atsScore,
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
