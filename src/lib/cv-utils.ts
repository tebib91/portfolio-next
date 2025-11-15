import { cvData } from "@/data/cv";

/**
 * Extract all unique technologies from CV data
 */
export function getAllTechnologies(): string[] {
  const technologies = new Set<string>();
  const skillToNotAdd = ['BDD', 'TDD', 'Selenium']
  // Add technologies from experiences
  // cvData.experiences.forEach((exp) => {
  //   exp.technologies.forEach((tech) => technologies.add(tech));
  // });

  // Add technologies from skills
  Object.values(cvData.skills).forEach((skillArray) => {
    skillArray.forEach((skill: string) => {
      if (!skillToNotAdd.includes(skill)) {
        technologies.add(skill);
      }
    });
  });

  return Array.from(technologies).sort();
}

