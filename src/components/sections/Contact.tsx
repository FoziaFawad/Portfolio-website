"use client";

import * as React from "react";
import { personalData } from "@/data/personal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export function Contact() {
  const [copied, setCopied] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 border-amber-500/30 text-amber-400">
            Let&apos;s Connect
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Get In Touch
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Have a project in mind, an engineering role, or an open-source collaboration? Let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="glass-panel border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2">
                Contact Information
              </h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                Feel free to reach out directly via email or connect across professional networks.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4">
                {/* Email with copy button */}
                <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">✉️</span>
                    <div>
                      <p className="text-[10px] font-mono uppercase text-zinc-500">Email</p>
                      <a
                        href={personalData.socials.email}
                        className="text-xs sm:text-sm font-medium text-amber-400 hover:underline"
                      >
                        {personalData.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 text-xs rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                  >
                    {copied ? "Copied! ✓" : "Copy"}
                  </button>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="text-[10px] font-mono uppercase text-zinc-500">Location</p>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200">
                      {personalData.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
                  Online Profiles:
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={personalData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-amber-400/50 transition-colors"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={personalData.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-amber-400/50 transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                  {personalData.socials.twitter && (
                    <a
                      href={personalData.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-amber-400/50 transition-colors"
                    >
                      X (Twitter) ↗
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <Card className="glass-panel border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-2xl text-white font-bold">
                  Send a Message
                </CardTitle>
                <CardDescription className="text-zinc-400 text-sm">
                  I typically respond within 24 business hours.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                {formSubmitted ? (
                  <div className="p-8 text-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                    <span className="text-3xl mb-2 block">✨</span>
                    <h4 className="text-lg font-bold text-white">Thank You for Reaching Out!</h4>
                    <p className="text-sm text-zinc-300 mt-2">
                      Your message has been recorded. I will review your inquiry and get back to you shortly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-mono uppercase text-zinc-400 mb-1.5"
                        >
                          Your Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-mono uppercase text-zinc-400 mb-1.5"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-mono uppercase text-zinc-400 mb-1.5"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project Discussion / Engineering Role"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-mono uppercase text-zinc-400 mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hello Fozia, I'd like to discuss a project..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-sm resize-none"
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
