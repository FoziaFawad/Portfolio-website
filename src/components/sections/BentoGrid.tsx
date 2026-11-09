import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SkillCategory, SkillItem } from "@/types";
import { skillsData } from "@/data/skills";

export function BentoGrid() {
  return (
    <section id="bento" className="py-20 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3">
            Overview
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Engineered for Impact
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            A modular glance at my technical philosophy, capabilities, and core focus areas.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Main Expertise (spans 2 cols on md) */}
          <Card className="md:col-span-2 flex flex-col justify-between">
            <CardHeader>
              <Badge variant="default" className="w-fit mb-2">
                Core Specialty
              </Badge>
              <CardTitle className="text-2xl">Modern Full-Stack Applications</CardTitle>
              <CardDescription>
                Building resilient web apps from the database layer up to interactive,
                accessible frontends using React 19, Next.js App Router, and serverless edge functions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mt-4">
                {skillsData.flatMap((cat: SkillCategory) => cat.items.slice(0, 3)).map((skill: SkillItem) => (
                  <Badge key={skill.name} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Performance Stats */}
          <Card className="flex flex-col justify-between bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">
                Metrics
              </Badge>
              <CardTitle className="text-2xl">High Velocity</CardTitle>
              <CardDescription>
                Zero-compromise performance and speed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">99+</p>
                <p className="text-xs text-zinc-500">Lighthouse Performance</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">&lt;100ms</p>
                <p className="text-xs text-zinc-500">Global Edge Latency</p>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Code Quality */}
          <Card>
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">
                Standards
              </Badge>
              <CardTitle>Type Safety & Reliability</CardTitle>
              <CardDescription>
                Strict TypeScript strict-mode adherence, automated CI/CD pipelines, and high test coverage.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Card 4: Architecture & Cloud (spans 2 cols on md) */}
          <Card className="md:col-span-2">
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">
                Infrastructure
              </Badge>
              <CardTitle>Cloud-Native Architecture</CardTitle>
              <CardDescription>
                Deploying serverless, containerized, and globally distributed systems with automated observability,
                infrastructure-as-code, and minimal maintenance overhead.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

