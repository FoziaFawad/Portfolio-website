# Portfolio Website

A modern, responsive, and high-performance portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 📁 Project Architecture & Folder Structure

```
portfolio-website/
├── public/                      # Static assets served from root URL
│   ├── images/                  # Project screenshots, preview mockups
│   │   ├── project-1.png
│   │   └── project-2.png
│   ├── avatar.jpg               # Profile image
│   └── resume.pdf               # Downloadable CV
│
├── src/                         # Keeps application code distinct from root configs
│   ├── app/                     # Next.js App Router (Routing Engine)
│   │   ├── layout.tsx           # Root layout: fonts, SEO metadata, theme provider
│   │   ├── page.tsx             # Homepage assembling the portfolio sections
│   │   ├── globals.css          # Tailwind CSS directives & custom utility classes
│   │   ├── not-found.tsx        # Custom 404 page
│   │   ├── icon.ico             # Favicon
│   │   └── opengraph-image.png  # Automatic social media preview card
│   │
│   ├── components/              # Reusable UI elements
│   │   ├── layout/              # Persistent structural layout components
│   │   │   ├── Navbar.tsx       # Sticky top navigation with responsive mobile menu
│   │   │   └── Footer.tsx       # Clean footer with social & copyright links
│   │   ├── sections/            # Page-level portfolio sections
│   │   │   ├── Hero.tsx         # Headline, bio, social badges, status
│   │   │   ├── BentoGrid.tsx    # Modern modular cards grid
│   │   │   ├── Experience.tsx   # Interactive timeline / milestones
│   │   │   ├── Projects.tsx     # Featured engineering repositories
│   │   │   └── Contact.tsx      # Contact form or mail CTA
│   │   └── ui/                  # Atomic, reusable design primitives
│   │       ├── Button.tsx       # Button component with variants & link support
│   │       ├── Card.tsx         # Card, CardHeader, CardTitle, CardContent, CardFooter
│   │       └── Badge.tsx        # Status & tech tag badges
│   │
│   ├── data/                    # Decoupled content (edit projects without touching JSX)
│   │   ├── projects.ts          # Project list, descriptions, live links, repo links
│   │   ├── skills.ts            # Tech stack categories (Languages, Frameworks, Tools)
│   │   └── experience.ts        # Milestones, internships, achievements
│   │
│   ├── types/                   # Shared TypeScript definitions
│   │   ├── project.d.ts         # Project interface types
│   │   └── index.d.ts           # Global types (Experience, Skill, Navigation)
│   │
│   └── lib/                     # Utilities and helper functions
│       └── utils.ts             # Tailwind class merger (cn utility)
│
├── .gitignore                   # Git exclusion rules (node_modules, .next, .env)
├── next.config.ts               # Next.js build and image optimization settings
├── package.json                 # Project dependencies & scripts
├── postcss.config.mjs           # Tailwind PostCSS configuration
├── tailwind.config.ts           # Design tokens, custom animations, color palettes
└── tsconfig.json                # TypeScript path aliases (e.g., "@/components/*")
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🛠️ How to Customize

- **Update Projects**: Edit `src/data/projects.ts` to add your projects, repository URLs, and live links.
- **Update Experience**: Edit `src/data/experience.ts` to add your career milestones and achievements.
- **Update Skills**: Edit `src/data/skills.ts` with your technical stack and categories.
- **Replace Static Assets**: Replace `public/avatar.jpg`, `public/resume.pdf`, and screenshots inside `public/images/`.
