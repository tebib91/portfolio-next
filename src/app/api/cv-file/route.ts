import { NextResponse } from "next/server";
import { cvData } from "@/data/cv";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    // For now, we'll generate a simple text-based CV
    // In production, you'd want to use a PDF generation library like pdfkit or puppeteer
    // or serve a pre-generated PDF file
    
    // Check if CV file exists in public folder
    try {
      const filePath = join(process.cwd(), "public", "cv.pdf");
      const fileBuffer = await readFile(filePath);
      
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="Ahmed_Tabib_CV.pdf"',
        },
      });
    } catch {
      // If file doesn't exist, generate a simple text CV
      const cvText = `
AHMED TABIB - CV
================

${cvData.name}
${cvData.title}
${cvData.experienceYears}+ years of experience

CONTACT
-------
Email: ${cvData.contact.email}
Phone: ${cvData.contact.phone}
Location: ${cvData.contact.location}
Website: ${cvData.contact.website}
GitHub: ${cvData.contact.github}
LinkedIn: ${cvData.contact.linkedin}

EXPERIENCE
----------
${cvData.experiences.map(exp => `
${exp.title} - ${exp.company}
${exp.location} | ${exp.period}
${exp.project}
Technologies: ${exp.technologies.join(", ")}
`).join("\n")}

SKILLS
------
Languages: ${cvData.skills.languages.join(", ")}
Frameworks: ${cvData.skills.frameworks.join(", ")}
Testing: ${cvData.skills.testing.join(", ")}
DevOps: ${cvData.skills.devops.join(", ")}
Cloud: ${cvData.skills.cloud.join(", ")}
Databases: ${cvData.skills.databases.join(", ")}

EDUCATION
---------
${cvData.education.degree}
${cvData.education.school} | ${cvData.education.period}
      `.trim();

      return new NextResponse(cvText, {
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": 'attachment; filename="Ahmed_Tabib_CV.txt"',
        },
      });
    }
  } catch (error) {
    console.error("Error serving CV file:", error);
    return NextResponse.json(
      { error: "Failed to generate CV file" },
      { status: 500 }
    );
  }
}

