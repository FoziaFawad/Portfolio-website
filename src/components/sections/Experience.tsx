import { experienceData } from "@/data/experience";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function Experience() {
  return (
    <section id="experience" className="py-24 relative border-t border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 border-amber-500/30 text-amber-400">
            Career Journey
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Professional Experience
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Engineering roles, leadership contributions, and production achievements.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-8 space-y-12">
          {experienceData.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-10">
              {/* Glowing timeline node */}
              <div
                className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-zinc-950 ${
                  item.current
                    ? "bg-amber-400 ring-4 ring-amber-400/20"
                    : "bg-zinc-600 ring-2 ring-zinc-800"
                }`}
              />

              <Card className="glass-panel glass-panel-hover border border-zinc-800/80 bg-zinc-900/60 hover:border-amber-400/30">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl sm:text-2xl text-white font-bold">
                          {item.role}
                        </CardTitle>
                        {item.current && (
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-amber-400 mt-1">
                        {item.company}
                        <span className="text-zinc-500 font-normal">
                          {" "}
                          • {item.location} {item.type ? `(${item.type})` : ""}
                        </span>
                      </p>
                    </div>

                    <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800 w-fit">
                      {item.period}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-2">
                  <ul className="space-y-2.5 text-sm text-zinc-300">
                    {item.description.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-amber-400/80 mt-1 text-xs">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {item.skills && (
                    <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-zinc-800/80">
                      {item.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-[11px] bg-zinc-950 text-zinc-400 border border-zinc-800"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
