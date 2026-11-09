import { SkillCategory } from "@/types";

export interface SkillNode {
  id: string;
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Security" | "Tools" | "Professional";
  level: "Expert" | "Advanced" | "Proficient";
  proficiency: number;
  experience: string;
  badge1: string;
  badge2: string;
  codeSnippet?: string;
  featured?: boolean;
}

export const orbitalSkills: SkillNode[] = [
  // Core Flagship Trajectory (Default Display on "All Craft")
  {
    id: "ts",
    name: "TypeScript",
    category: "Languages",
    level: "Expert",
    proficiency: 95,
    experience: "Active Daily Craft",
    badge1: "SYNTACTIC ARCHITECTURE & STRICT STATIC TYPING",
    badge2: "FULL-STACK WEB INTEGRATION & TYPE SAFETY",
    codeSnippet: "interface FullStackApp { frontend: 'Next.js'; backend: 'Node.js'; typed: true; }",
    featured: true,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    level: "Expert",
    proficiency: 94,
    experience: "Core Framework",
    badge1: "APP ROUTER & REACT SERVER COMPONENTS",
    badge2: "OPTIMIZED METADATA & STREAMING ARCHITECTURE",
    codeSnippet: "export default function Page() { return <main className='min-h-screen' />; }",
    featured: true,
  },
  {
    id: "react",
    name: "React",
    category: "Frontend",
    level: "Expert",
    proficiency: 94,
    experience: "Component Architecture",
    badge1: "INTERACTIVE COMPONENT HIERARCHIES & HOOKS",
    badge2: "DYNAMIC CLIENT-SIDE STATE MANAGEMENT",
    codeSnippet: "const [state, setState] = React.useState<TechnicalSkill>(initialState);",
    featured: true,
  },
  {
    id: "nodejs",
    name: "Node.js & REST APIs",
    category: "Backend",
    level: "Advanced",
    proficiency: 90,
    experience: "Backend Runtime",
    badge1: "RESTFUL API DESIGN & ASYNC ROUTE HANDLERS",
    badge2: "EVENT-DRIVEN BACKEND ARCHITECTURE",
    codeSnippet: "app.get('/api/skills', async (req, res) => res.json({ verified: true }));",
    featured: true,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Expert",
    proficiency: 94,
    experience: "Modern Styling",
    badge1: "RESPONSIVE GLASSMORPHIC UI PRIMITIVES",
    badge2: "SEAMLESS DARK MODE DESIGN TOKENS",
    codeSnippet: "className='bg-zinc-950/80 backdrop-blur-xl border border-white/10'",
    featured: true,
  },
  {
    id: "cybersecurity",
    name: "Network Security",
    category: "Security",
    level: "Advanced",
    proficiency: 88,
    experience: "Coursera Certified",
    badge1: "NETWORK DEFENSE & SECURITY RISK MITIGATION",
    badge2: "AUTHENTICATION & THREAT MANAGEMENT",
    codeSnippet: "// Coursera: Foundations of Cybersecurity & Network Security",
    featured: true,
  },

  // Languages
  {
    id: "js",
    name: "JavaScript (ES6+)",
    category: "Languages",
    level: "Expert",
    proficiency: 94,
    experience: "Core Web Language",
    badge1: "ASYNCHRONOUS PROMISES & EVENT LOOP MASTERY",
    badge2: "MODERN ES6+ SYNTAX & DOM MANIPULATION",
    codeSnippet: "const fetchTelemetry = async () => (await fetch('/api/data')).json();",
    featured: false,
  },
  {
    id: "cpp",
    name: "C++",
    category: "Languages",
    level: "Advanced",
    proficiency: 88,
    experience: "Academic SE Degree",
    badge1: "MEMORY MANAGEMENT & POINTER ARITHMETIC",
    badge2: "DATA STRUCTURES & ALGORITHMIC RIGOR",
    codeSnippet: "#include <iostream>\nint main() { std::cout << \"Salim Habib Univ SE\"; return 0; }",
    featured: false,
  },
  {
    id: "java",
    name: "Java",
    category: "Languages",
    level: "Advanced",
    proficiency: 86,
    experience: "Academic SE Degree",
    badge1: "OBJECT-ORIENTED PROGRAMMING (OOP) PARADIGMS",
    badge2: "ROBUST TYPE SYSTEMS & CLASS INHERITANCE",
    codeSnippet: "public class SoftwareEngineer { private String name = 'Syeda Fozia Fawad'; }",
    featured: false,
  },
  {
    id: "oop",
    name: "OOP Architecture",
    category: "Languages",
    level: "Expert",
    proficiency: 92,
    experience: "Foundational Pillar",
    badge1: "ENCAPSULATION, INHERITANCE & POLYMORPHISM",
    badge2: "DESIGN PATTERNS & CLEAN CODE PRINCIPLES",
    featured: false,
  },

  // Frontend UI
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    category: "Frontend",
    level: "Expert",
    proficiency: 96,
    experience: "Web Semantics",
    badge1: "SEMANTIC ACCESSIBLE MARKUP & SEO STRUCTURE",
    badge2: "MODERN CSS GRID & FLEXBOX LAYOUTS",
    featured: false,
  },

  // Security & Concepts
  {
    id: "risk-mgmt",
    name: "Risk Management",
    category: "Security",
    level: "Advanced",
    proficiency: 88,
    experience: "Coursera Certified",
    badge1: "SYSTEM VULNERABILITY AUDITING & RISK MATRICES",
    badge2: "INCIDENT RESPONSE & COMPLIANCE PROTOCOLS",
    featured: false,
  },

  // Tools & Platforms
  {
    id: "git-github",
    name: "Git & GitHub",
    category: "Tools",
    level: "Expert",
    proficiency: 92,
    experience: "Version Control",
    badge1: "BRANCHING, PULL REQUESTS & CODE REVIEWS",
    badge2: "CONTINUOUS COLLABORATIVE REPOSITORY WORKFLOWS",
    codeSnippet: "git checkout -b feature/real-time-mitigation && git push origin main",
    featured: false,
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Tools",
    level: "Expert",
    proficiency: 92,
    experience: "Deployment Platform",
    badge1: "SERVERLESS EDGE DEPLOYMENT & CI/CD",
    badge2: "THERMOAGENT AI PRODUCTION HOSTING",
    featured: false,
  },
  {
    id: "vscode-antigravity",
    name: "VS Code & Antigravity",
    category: "Tools",
    level: "Expert",
    proficiency: 95,
    experience: "Primary IDE & AI Agent",
    badge1: "ADVANCED AGENTIC PAIR-PROGRAMMING",
    badge2: "STREAMLINED CODEBASE AUDIT & EXTENSIONS",
    featured: false,
  },

  // Professional & Soft Skills
  {
    id: "podcast-hosting",
    name: "Podcast Host (DeepTech)",
    category: "Professional",
    level: "Expert",
    proficiency: 94,
    experience: "Oct 2026 - Present",
    badge1: "TECHNICAL CONTENT CREATION & MEDIA BROADCASTING",
    badge2: "DEVELOPER COMMUNITY ENGAGEMENT & OUTREACH",
    featured: false,
  },
  {
    id: "presentation-comm",
    name: "Public Presentation",
    category: "Professional",
    level: "Expert",
    proficiency: 94,
    experience: "Proven Communicator",
    badge1: "CLEAR & CONFIDENT MULTI-STAKEHOLDER COMMUNICATION",
    badge2: "DYNAMIC TECHNICAL DEMONSTRATIONS & PITCHING",
    featured: false,
  },
  {
    id: "teamwork-mgmt",
    name: "Teamwork & Management",
    category: "Professional",
    level: "Expert",
    proficiency: 92,
    experience: "Fawad Gems & Hackathons",
    badge1: "CROSS-FUNCTIONAL COLLABORATION & LEADERSHIP",
    badge2: "STRATEGIC PLANNING & EXECUTION DISCIPLINE",
    featured: false,
  },
  {
    id: "problem-solving",
    name: "Problem-Solving",
    category: "Professional",
    level: "Expert",
    proficiency: 94,
    experience: "Analytical Mindset",
    badge1: "ALGORITHMIC THINKING & ROOT CAUSE RESOLUTION",
    badge2: "PERSISTENT EXPLORATION & RAPID LEARNING CURVE",
    featured: false,
  },
];

// Backward-compatible category grouping for BentoGrid / summary views
export const skillsData: SkillCategory[] = [
  {
    category: "Frontend Development",
    description: "Modern, responsive, and performant user interface development",
    items: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "JavaScript (ES6+)", level: "Expert" },
      { name: "HTML5 & CSS3", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
    ],
  },
  {
    category: "Backend & Programming",
    description: "Core programming languages and service architectures",
    items: [
      { name: "Node.js", level: "Advanced" },
      { name: "RESTful APIs", level: "Advanced" },
      { name: "Object-Oriented Programming (OOP)", level: "Expert" },
      { name: "C++", level: "Advanced" },
      { name: "Java", level: "Advanced" },
    ],
  },
  {
    category: "Security & Concepts",
    description: "Network defense and security risk fundamentals (Coursera certified)",
    items: [
      { name: "Network Security Fundamentals", level: "Advanced" },
      { name: "Security Risk Management", level: "Advanced" },
      { name: "Foundations of Cybersecurity", level: "Advanced" },
    ],
  },
  {
    category: "Tools & Platforms",
    description: "Developer tooling, cloud hosting, and workflows",
    items: [
      { name: "Git", level: "Expert" },
      { name: "GitHub", level: "Expert" },
      { name: "Vercel", level: "Expert" },
      { name: "VS Code", level: "Expert" },
      { name: "Antigravity", level: "Expert" },
    ],
  },
  {
    category: "Professional & Soft Skills",
    description: "Interpersonal, leadership, and media competencies",
    items: [
      { name: "Podcast Host (DeepTech)", level: "Expert" },
      { name: "Technical Content Creation", level: "Expert" },
      { name: "Public Presentation", level: "Expert" },
      { name: "Teamwork & Management", level: "Expert" },
      { name: "Confident Communicator", level: "Expert" },
    ],
  },
  {
    category: "Languages (Spoken)",
    description: "Natural multilingual communication",
    items: [
      { name: "Urdu (Native)", level: "Expert" },
      { name: "English (Advanced)", level: "Advanced" },
      { name: "Arabic (Elementary)", level: "Proficient" },
    ],
  },
];
