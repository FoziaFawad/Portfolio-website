export * from "./project";

export interface PersonalInfo {
  name: string;
  preferredName?: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  resumeUrl: string;
  availableForHire: boolean;
  statusText: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
    portfolio?: string;
  };
}

export interface AboutInfo {
  introduction: string;
  paragraphs: string[];
  highlights: {
    label: string;
    value: string;
    detail: string;
  }[];
  philosophy: string;
  interests: string[];
}

export interface SkillItem {
  name: string;
  level?: "Expert" | "Advanced" | "Proficient" | "Familiar";
  icon?: string;
}

export interface SkillCategory {
  category: string;
  description?: string;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  current?: boolean;
  type?: "Full-time" | "Contract" | "Internship" | "Open Source";
  description: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  grade?: string;
  honors?: string;
  coursework?: string[];
  activities?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
}
