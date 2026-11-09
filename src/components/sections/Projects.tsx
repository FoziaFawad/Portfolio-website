"use client";

import * as React from "react";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { ProjectCategory } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Projects() {
  const [filter, setFilter] = React.useState<ProjectCategory>("all");

  const filteredProjects = projectsData.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  const individualCount = projectsData.filter((p) => p.category === "individual").length;
  const contributedCount = projectsData.filter((p) => p.category === "contributed").length;

  return (
    <section id="projects" className="py-24 relative bg-[#0a0a0f] border-t border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3 border-amber-500/30 text-amber-400">
            Portfolio Work
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Featured Projects & Contributions
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Engineering architectures built individually from inception, as well as collaborative open-source & enterprise contributions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#df984f] text-zinc-950 shadow-md font-semibold"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800"
            }`}
          >
            All Projects ({projectsData.length})
          </button>
          <button
            onClick={() => setFilter("individual")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              filter === "individual"
                ? "bg-[#df984f] text-zinc-950 shadow-md font-semibold"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800"
            }`}
          >
            Individual Projects ({individualCount})
          </button>
          <button
            onClick={() => setFilter("contributed")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              filter === "contributed"
                ? "bg-[#df984f] text-zinc-950 shadow-md font-semibold"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-800"
            }`}
          >
            Contributed Projects ({contributedCount})
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isContributed = project.category === "contributed";

            return (
              <Card
                key={project.id}
                className="glass-panel glass-panel-hover flex flex-col justify-between overflow-hidden group border border-zinc-800/80 hover:border-amber-400/30"
              >
                <div>
                  {/* Image with Explicit Dimension & Safe Relative Container */}
                  <div
                    style={{ position: "relative" }}
                    className="relative h-56 sm:h-64 w-full bg-zinc-900/80 overflow-hidden"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-md ${
                          isContributed
                            ? "bg-purple-900/80 text-purple-200 border border-purple-500/40"
                            : "bg-amber-900/80 text-amber-200 border border-amber-500/40"
                        }`}
                      >
                        {isContributed ? "🤝 Contributed Project" : "⚡ Individual Solo Project"}
                      </span>
                      {project.year && (
                        <span className="text-xs font-mono text-zinc-400 bg-zinc-900/80 px-2.5 py-0.5 rounded-full border border-zinc-800">
                          {project.year}
                        </span>
                      )}
                    </div>

                    {/* Bottom Tagline on Image */}
                    <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
                      <p className="text-xs font-medium text-amber-300 line-clamp-1">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  <CardHeader className="pt-5">
                    {/* Role indication if present */}
                    {project.role && (
                      <p className="text-xs font-mono text-zinc-400 mb-1">
                        Role: <span className="text-zinc-200 font-medium">{project.role}</span>
                      </p>
                    )}

                    <CardTitle className="text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors">
                      {project.title}
                    </CardTitle>

                    <CardDescription className="text-zinc-300 text-sm mt-2 leading-relaxed">
                      {project.description}
                    </CardDescription>

                    {/* Contributed Highlights */}
                    {isContributed && project.contributions && (
                      <div className="mt-4 p-3.5 rounded-lg bg-zinc-900/70 border border-purple-500/20 space-y-1.5">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                          My Contributions:
                        </p>
                        <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                          {project.contributions.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Key Metrics / Highlights */}
                    {project.metrics && (
                      <div className="mt-3 text-xs font-mono text-amber-400/90 flex items-center gap-1.5">
                        <span>📊</span> {project.metrics}
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-zinc-800">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[11px] bg-zinc-900 text-zinc-300 border border-zinc-800"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </div>

                <CardFooter className="pt-4 border-t border-zinc-800 gap-3 justify-end">
                  {project.githubUrl && (
                    <Button href={project.githubUrl} external size="sm" variant="outline">
                      Source Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button href={project.liveUrl} external size="sm" variant="primary">
                      Live Preview ↗
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
