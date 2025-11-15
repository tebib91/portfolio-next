export interface CV {
  name: string;
  title: string;
  experienceYears: number;
  contact: {
    email: string;
    phone: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
  };
  experiences: Experience[];
  skills: Skills;
  languages: {
    francais: number;
    anglais: number;
  };
  education: {
    degree: string;
    school: string;
    period: string;
  };
  strengths: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  team?: string;
  project: string;
  tasks: string[];
  technologies: string[];
  imageUrl: string;
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  testing: string[];
  devops: string[];
  cloud: string[];
  databases: string[];
}

