import { EducationItem, CertificationItem } from "@/types";

export const educationData: EducationItem[] = [
  {
    id: "edu-salim-habib",
    degree: "Bachelors in Software Engineering (SE)",
    institution: "Salim Habib University",
    location: "Karachi, Pakistan",
    period: "2026 - Present",
    grade: "In Progress (Undergraduate)",
    honors: "Pursuing Bachelor's Degree in Software Engineering",
    coursework: [
      "Object-Oriented Programming (OOP)",
      "C++ & Java Programming",
      "Full Stack Web Development",
      "Network Security Fundamentals",
      "Risk Management & Software Engineering",
    ],
    activities: [
      "Developing web applications & technical prototypes",
      "Active participant in hackathons & technical workshops",
    ],
  },
  {
    id: "edu-new-fazaia",
    degree: "Intermediate (Pre-Medical)",
    institution: "New Fazaia College",
    location: "Karachi, Pakistan",
    period: "2024 - 2025",
    grade: "Grade B",
    coursework: [
      "Biological Sciences",
      "Chemistry",
      "Physics",
      "Analytical & Scientific Problem-Solving",
    ],
  },
  {
    id: "edu-sm-public",
    degree: "Matriculation (Biology)",
    institution: "SM Public Academy",
    location: "Karachi, Pakistan",
    period: "2023 - 2024",
    grade: "Grade A",
    coursework: [
      "Biology & General Sciences",
      "Mathematics",
      "Computer Studies",
    ],
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-cybersecurity",
    title: "Foundations of Cybersecurity, Manage Security Risks & Network Security",
    issuer: "Coursera",
    date: "2026",
    credentialUrl: "https://www.coursera.org/",
  },
  {
    id: "cert-zad-academy",
    title: "Islamic Studies (Aqeedah, Seerah, Fiqh, Tarbiyah, Arabic, Hadith)",
    issuer: "Zad Academy",
    date: "2026",
    credentialUrl: "https://www.zad-academy.com/",
  },
];
