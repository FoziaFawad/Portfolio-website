import { educationData, certificationsData } from "@/data/education";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export function Education() {
  return (
    <section id="education" className="py-24 relative bg-zinc-950/40 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 border-amber-500/30 text-amber-400">
            Academic Background
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Education & Certifications
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Formal computer science foundations, academic honors, and verified industry credentials.
          </p>
        </div>

        {/* Education Degree Cards */}
        <div className="space-y-6 mb-14">
          {educationData.map((edu) => (
            <Card
              key={edu.id}
              className="glass-panel glass-panel-hover border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 hover:border-amber-400/30"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-medium text-amber-400 mt-1">
                    {edu.institution}
                    {edu.location && <span className="text-zinc-500 font-normal"> • {edu.location}</span>}
                  </p>
                </div>
                <div className="flex flex-col sm:items-end">
                  <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800 w-fit">
                    {edu.period}
                  </span>
                  {edu.grade && (
                    <span className="text-xs font-semibold text-emerald-400 mt-1.5">
                      {edu.grade}
                    </span>
                  )}
                </div>
              </div>

              {edu.honors && (
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-amber-300">
                  <span>🏆</span>
                  <span>{edu.honors}</span>
                </div>
              )}

              {/* Key Coursework */}
              {edu.coursework && (
                <div className="mt-5">
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
                    Core Coursework:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="text-xs px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-800/80 text-zinc-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Activities */}
              {edu.activities && (
                <div className="mt-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 font-semibold">
                    Extracurriculars & Leadership:
                  </p>
                  <ul className="text-xs text-zinc-400 space-y-1 list-disc list-inside">
                    {edu.activities.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Certifications Sub-grid */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center sm:text-left flex items-center gap-2">
            <span className="text-amber-400">📜</span> Verified Professional Certifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-amber-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-amber-400">
                    {cert.issuer}
                  </span>
                  <h4 className="text-sm font-semibold text-white mt-1 leading-snug">
                    {cert.title}
                  </h4>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono">Issued {cert.date}</span>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

