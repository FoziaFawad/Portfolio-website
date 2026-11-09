import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* 1. Lantern Hero with Interactive Pull-Cord Glow */}
      <Hero />

      {/* 2. In-Depth About Section */}
      <About />

      {/* 3. Projects (Individual Solo & Contributed Tabs) */}
      <Projects />

      {/* 4. Categorized Skills & Stack */}
      <Skills />

      {/* 5. Career Experience Timeline */}
      <Experience />

      {/* 6. Education & Certifications */}
      <Education />

      {/* 7. Contact Details & Inquiry Form */}
      <Contact />
    </>
  );
}
