import { Project } from "@/types";

export const projectsData: Project[] = [
  // INDIVIDUAL PROJECTS
  {
    id: "proj-jewelry-marketplace",
    title: "Jewelry Marketplace Platform",
    tagline: "Artisanal Gemstones & Fine Jewelry E-Commerce Web Application",
    category: "individual",
    role: "Sole Creator & Frontend Developer",
    description:
      "A specialized e-commerce jewelry and gemstones marketplace platform inspired by hands-on sales and marketing operations at Fawad Gems. Features dynamic product catalogs, artisanal jewelry showcases, client order inquiry workflows, and responsive checkout interfaces.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "RESTful APIs", "Git"],
    image: "/images/project-2.png",
    liveUrl: "https://github.com/FoziaFawad/Jewelry_marketplace",
    githubUrl: "https://github.com/FoziaFawad/Jewelry_marketplace",
    featured: true,
    year: "2026",
    metrics: "Full Catalog & Client Inquiry Workflow",
  },
  {
    id: "proj-portfolio-website",
    title: "Personal Engineering Portfolio",
    tagline: "Bespoke Portfolio with Artisanal Glowing Lamp & Orbital Radar Constellation",
    category: "individual",
    role: "Sole Creator & Designer",
    description:
      "Modern personal developer portfolio engineered with Next.js App Router, React 19, Tailwind CSS, and TypeScript. Features an interactive artisanal glowing table lamp hero with volumetric lighting and audio switch, alongside an interactive SVG orbital constellation competency radar.",
    tags: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Antigravity", "Vercel"],
    image: "/images/project-1.png",
    liveUrl: "https://github.com/FoziaFawad/Portfolio-website",
    githubUrl: "https://github.com/FoziaFawad/Portfolio-website",
    featured: true,
    year: "2026",
    metrics: "100% Custom SVG Radar & Audio Synthesis",
  },
  {
    id: "proj-frontend-lab",
    title: "Frontend Practice Lab",
    tagline: "Foundational Web Development, Semantic Markup & Interactive DOM Laboratory",
    category: "individual",
    role: "Sole Developer",
    description:
      "Foundational modern web development repository containing semantic HTML5 structures, responsive CSS3 grid and flexbox styling architectures, and vanilla JavaScript ES6+ interactive component logic.",
    tags: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Git", "GitHub"],
    image: "/images/project-2.png",
    liveUrl: "https://github.com/FoziaFawad/frontend-practice-lab",
    githubUrl: "https://github.com/FoziaFawad/frontend-practice-lab",
    featured: false,
    year: "2026",
    metrics: "Core Web Foundations & Semantic UI",
  },

  // CONTRIBUTED PROJECTS
  {
    id: "proj-thermoagent-ai",
    title: "ThermoAgent AI Web App",
    tagline: "Autonomous Multi-Agent Geospatial AI for Real-Time Urban Heat Island Mitigation",
    category: "contributed",
    role: "Co-Developer & Frontend Engineer (FortyGuard Hackathon)",
    contributions: [
      "Engineered the responsive Next.js, React, and Tailwind CSS web application interface deployed live on Vercel.",
      "Integrated street-level 2m ambient heat feeds with building footprints and geospatial map intelligence.",
      "Implemented interactive audit telemetry for structural heat causes and actionable cooling proposals (cool roofs, green corridors) with physics-based ROI projections.",
      "Collaborated closely with co-developer Muhammad Sohaib on autonomous multi-agent pipeline visualization.",
    ],
    description:
      "ThermoAgent-AI is an autonomous multi-agent geospatial AI for real-time Urban Heat Island (UHI) mitigation built for the FortyGuard Hackathon. Combining street-level 2m ambient heat feeds with building footprints, it audits structural heat causes and generates actionable cooling proposals like cool roofs and green corridors with physics-based ROI and energy savings projections.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Geospatial AI", "Vercel"],
    image: "/images/project-1.png",
    liveUrl: "https://thermo-agent-ai-2.vercel.app/",
    githubUrl: "https://github.com/FoziaFawad/ThermoAgentAI-Web-App",
    featured: true,
    year: "2026",
    metrics: "FortyGuard Hackathon Project • Live on Vercel",
  },
];
