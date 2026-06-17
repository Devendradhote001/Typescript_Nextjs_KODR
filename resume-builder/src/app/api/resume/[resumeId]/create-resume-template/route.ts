import { generateAiResponse } from "@/lib/gemini";
import ResumeModel from "@/models/resume.model";
import { IApiResponse } from "@/types/apiResponse.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const { resumeId } = await params;

    let resume = await ResumeModel.findById(resumeId);
    console.log("resume this side->", resume);

    let prompt = `
   You are a world-class ATS Resume Writer, Technical Recruiter, and Professional Resume Designer.

Your task is to convert the provided Resume JSON into a highly professional ATS-optimized resume and prepare content specifically for PDF generation.

OBJECTIVE:

* Generate a modern ATS-friendly resume.
* Target ATS Score: 95+
* Optimize for Full Stack Developer, MERN Stack Developer, Software Engineer, and Frontend Developer roles.
* Ensure recruiter readability and ATS compatibility.

STRICT RULES:

1. Return ONLY resume content.
2. Do NOT explain anything.
3. Do NOT provide analysis.
4. Do NOT provide ATS score.
5. Do NOT provide recommendations.
6. Do NOT wrap response inside markdown.
7. Do NOT use code blocks.
8. Do NOT use emojis.
9. Do NOT use tables.
10. Do NOT use columns.
11. Do NOT use special characters that break PDF rendering.
12. Do NOT output JSON.
13. Do NOT output HTML.
14. Do NOT output Markdown.
15. Generate content ready to be inserted directly into a PDF document.

RESUME LAYOUT:

FULL NAME

CONTACT INFORMATION
Email
Phone
LinkedIn
GitHub
Portfolio

PROFESSIONAL SUMMARY

* 4-6 lines
* ATS optimized
* Include years of experience
* Include top technologies
* Include measurable impact

TECHNICAL SKILLS

Programming Languages:
Frontend:
Backend:
Databases:
Cloud & DevOps:
Tools & Platforms:

PROFESSIONAL EXPERIENCE

For each company include:

Company Name
Designation
Start Date – End Date

Requirements:

* Generate 5-7 achievement-based bullet points
* Use action verbs
* Include metrics wherever possible
* Highlight scalability, performance, APIs, authentication, database design, deployment, and collaboration

PROJECTS

For each project include:

Project Name
Technologies Used
GitHub Link
Live Link

Requirements:

* Generate 4-6 strong bullet points
* Explain business impact
* Explain technical implementation
* Highlight architecture decisions
* Highlight performance improvements
* Highlight AI integrations if applicable

EDUCATION

Degree
Institute
Graduation Date
CGPA

ACHIEVEMENTS

* Convert achievements into professional accomplishment statements.

WRITING STYLE

Use powerful verbs such as:
Developed, Engineered, Designed, Built, Architected, Optimized, Automated, Integrated, Implemented, Deployed, Improved, Reduced, Increased, Scaled.

PDF OPTIMIZATION RULES

The generated content will be directly converted into a PDF.

Therefore:

* Maintain clean section spacing.
* Keep resume within 1-2 pages.
* Avoid unnecessary text.
* Prioritize achievements over responsibilities.
* Use concise and impactful language.
* Ensure professional formatting suitable for PDF export.

FINAL OUTPUT REQUIREMENT

Return ONLY the final resume text.

No explanations.
No markdown.
No JSON.
No code blocks.
No additional text.

Resume Data:

${JSON.stringify(resume)}


    `;

    const result = await generateAiResponse(prompt);
    let resume_template = result;

    return NextResponse.json<IApiResponse>(
      {
        success: true,
        message: "Resume generated",
        data: {
          resume_template,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in resume making", error);
    return NextResponse.json<IApiResponse>(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
