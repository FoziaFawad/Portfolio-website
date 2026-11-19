"use client";

import * as React from "react";

export default function Home() {
  const [filter, setFilter] = React.useState<"all" | "owned" | "contributed">("all");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuClosing, setMenuClosing] = React.useState(false);
  const [openFaqs, setOpenFaqs] = React.useState<{ [key: number]: boolean }>({ 1: true });
  const lenisRef = React.useRef<any>(null);

  // Initialize Lenis, word/line split reveals, and parallax
  React.useEffect(() => {
    let isMounted = true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Lenis smooth scroll
    import("lenis")
      .then((LenisModule) => {
        if (!isMounted) return;
        const Lenis = LenisModule.default;
        const lenis = new Lenis({ smoothWheel: true });
        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Parallax update tied to Lenis scroll
        const updateParallax = () => {
          if (prefersReducedMotion || window.innerWidth < 1024) {
            document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((plate) => {
              plate.style.transform = "";
            });
            return;
          }

          const vh = window.innerHeight;
          document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((plate) => {
            const container = plate.parentElement;
            if (!container) return;
            const rect = container.getBoundingClientRect();
            if (rect.height === 0) return;
            const totalDistance = vh + rect.height;
            const traveled = vh - rect.top;
            const progress = Math.max(0, Math.min(1, traveled / totalDistance));
            const offsetRem = 2.5 - progress * 5.0;
            plate.style.transform = `translate3d(0, ${offsetRem.toFixed(4)}rem, 0)`;
          });
        };

        lenis.on("scroll", updateParallax);
        window.addEventListener("resize", updateParallax);
        updateParallax();
      })
      .catch(() => {
        // Fallback gracefully
      });

    // 2. Word-by-word reveal
    document.querySelectorAll<HTMLElement>('[data-reveal="words"]').forEach((el) => {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = "true";
      const stagger = Number(el.dataset.wordStagger || 18);
      const baseDelay = Number(el.dataset.baseDelay || 0);
      const text = el.textContent?.trim().replace(/\s+/g, " ") || "";
      const words = text.split(" ");

      el.textContent = "";
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "word-span";
        span.textContent = word;
        span.style.setProperty("--word-delay", `${baseDelay + i * stagger}ms`);
        el.appendChild(span);
        if (i < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });
    });

    // 3. Line-by-line reveal
    const splitHeadingIntoLines = (el: HTMLElement) => {
      const stagger = Number(el.dataset.lineStagger || 90);
      const alreadyRevealed = el.classList.contains("is-in");

      if (!el.dataset.originalHtml) {
        el.dataset.originalHtml = el.innerHTML.trim();
      }

      const temp = document.createElement("div");
      temp.innerHTML = el.dataset.originalHtml;

      const tokens: { text: string; italic: boolean }[] = [];
      temp.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const parts = (node.textContent || "").replace(/\s+/g, " ").split(" ");
          parts.forEach((part) => {
            if (part) tokens.push({ text: part, italic: false });
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const elNode = node as HTMLElement;
          const isItalic = elNode.classList.contains("italic-accent");
          const parts = (node.textContent || "").replace(/\s+/g, " ").split(" ");
          parts.forEach((part) => {
            if (part) tokens.push({ text: part, italic: isItalic });
          });
        }
      });

      el.innerHTML = "";
      const measureSpans = tokens.map((tok, idx) => {
        const s = document.createElement("span");
        s.textContent = tok.text;
        if (tok.italic) s.className = "italic-accent";
        el.appendChild(s);
        if (idx < tokens.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
        return { el: s, tok };
      });

      const lines: { text: string; italic: boolean }[][] = [];
      let currentLine: { text: string; italic: boolean }[] = [];
      let lastTop: number | null = null;

      measureSpans.forEach(({ el: spanEl, tok }) => {
        const top = Math.round(spanEl.getBoundingClientRect().top);
        if (lastTop === null || Math.abs(top - lastTop) <= 4) {
          currentLine.push(tok);
        } else {
          lines.push(currentLine);
          currentLine = [tok];
        }
        lastTop = top;
      });
      if (currentLine.length) lines.push(currentLine);

      el.innerHTML = "";
      lines.forEach((lineTokens, lineIdx) => {
        const clip = document.createElement("span");
        clip.className = "line-clip";

        const inner = document.createElement("span");
        inner.className = "line-inner";
        inner.style.setProperty("--line-delay", `${lineIdx * stagger}ms`);

        lineTokens.forEach((tok, tIdx) => {
          if (tok.italic) {
            const em = document.createElement("span");
            em.className = "italic-accent";
            em.textContent = tok.text;
            inner.appendChild(em);
          } else {
            inner.appendChild(document.createTextNode(tok.text));
          }
          if (tIdx < lineTokens.length - 1) {
            inner.appendChild(document.createTextNode(" "));
          }
        });

        clip.appendChild(inner);
        el.appendChild(clip);
      });

      if (alreadyRevealed) {
        el.classList.add("is-in");
      }
    };

    const lineHeadings = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal="lines"]'));
    lineHeadings.forEach(splitHeadingIntoLines);

    // 4. Intersection Observer for reveals
    const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -10% 0px" }
      );
      revealEls.forEach((el) => observer.observe(el));
    }

    return () => {
      isMounted = false;
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // Modal Menu Handlers
  const handleOpenMenu = () => {
    setMenuClosing(false);
    setMenuOpen(true);
    if (lenisRef.current) lenisRef.current.stop();
    document.documentElement.style.overflow = "hidden";
  };

  const handleCloseMenu = (targetId?: string) => {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
      document.documentElement.style.overflow = "";
      if (lenisRef.current) lenisRef.current.start();
      if (targetId) {
        const target = document.querySelector(targetId);
        if (target && lenisRef.current) {
          lenisRef.current.scrollTo(target, { offset: 0 });
        } else if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 420);
  };

  // Toggle FAQ
  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Smooth scroll helper for main page links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Projects data
  const projects = [
    {
      id: "eternelle",
      title: "Éternelle Gems",
      year: "2026",
      category: "owned",
      role: "",
      desc: "Full-stack multi-vendor e-commerce platform for Silver 925 and natural gemstone jewelry, architected with custom order flows, dynamic QR provenance tracking, and post-purchase maintenance ledgers.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
      repo: "https://github.com/foziafawad",
      img: "/assets/eternelle-gems.jpg",
      aspect: "16 / 9",
    },
    {
      id: "thermoagent",
      title: "ThermoAgent AI (EcoTherm AI)",
      year: "2026",
      category: "contributed",
      role: "",
      desc: "Autonomous multi-agent urban microclimate intelligence platform co-developed with Muhammad Sohaib for the FortyGuard Hackathon '26, integrating real-time ambient temperature telemetry and spatial heat mapping.",
      tags: ["Next.js", "TypeScript", "RESTful APIs", "AI Agents"],
      repo: "https://github.com/foziafawad",
      img: "/assets/thermoagent.jpg",
      aspect: "16 / 9.5",
    },
    {
      id: "portfolio",
      title: "foziafawad / portfolio-website",
      year: "2026",
      category: "owned",
      role: "",
      desc: "Responsive developer portfolio built with Next.js App Router, TypeScript, and Tailwind CSS, deployed on Vercel with modular UI primitives and clean typographic hierarchy.",
      tags: ["Next.js", "React", "TypeScript", "Vercel"],
      repo: "https://github.com/foziafawad/portfolio-website",
      img: "/assets/portfolio-site.jpg",
      aspect: "16 / 8",
    },
    {
      id: "climate",
      title: "Climate Change & Heatwave Observatory",
      year: "2026",
      category: "owned",
      role: "",
      desc: "Climate and temperature analytics dashboard for Pakistan, mapping historical meteorological telemetry (1961–2017) across weather stations and forecasting temperature trends to 2037 with LightGBM and XGBoost models.",
      tags: ["Machine Learning", "LightGBM / XGBoost", "Data Visualization", "Geospatial Mapping"],
      repo: "https://github.com/muhammadsohaib-cs/climate_research_project",
      img: "/assets/pakistan-climate.jpg",
      aspect: "16 / 11",
    },
    {
      id: "hims",
      title: "IHIMS — Industrial Hazard & Incident Management System",
      year: "2026",
      category: "contributed",
      role: "",
      desc: "Collaborative systems specification and real-time safety alert workflow co-authored with Muhammad Sohaib, Mahnoor Khalid, and Muhammad Rohaan Khan, integrating risk management and governance protocols.",
      tags: ["Risk Management", "System Architecture", "Team Contribution"],
      repo: "https://github.com/foziafawad",
      img: "/assets/ihims-dashboard.jpg",
      aspect: "16 / 9",
    },
  ];

  const visibleProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <>
      {/* ========================================================================
           HEADER (FIXED, MIX-BLEND-DIFFERENCE)
           ======================================================================== */}
      <header className="site-header">
        <div className="site-header__inner">
          <div className="site-header__meta">
            <p className="site-header__role">Software Engineering Undergraduate</p>
            <p className="site-header__sub">Full Stack &middot; Cybersecurity &middot; OOP</p>
          </div>

          <a href="#top" onClick={(e) => handleNavClick(e, "#top")} className="brand-logo" aria-label="Syeda Fozia Fawad — Back to top">
            <span className="brand-logo__diamond" aria-hidden="true"></span>
            <span className="brand-logo__wordmark">Syeda fozia fawad</span>
          </a>

          <div className="site-header__right">
            <nav className="primary-nav" aria-label="Primary">
              <a href="#stack" onClick={(e) => handleNavClick(e, "#stack")} className="primary-nav__link">
                <span className="primary-nav__dot" aria-hidden="true"></span>
                <span>Stack</span>
              </a>
              <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="primary-nav__link">
                <span className="primary-nav__dot" aria-hidden="true"></span>
                <span>Projects</span>
              </a>
              <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="primary-nav__link">
                <span className="primary-nav__dot" aria-hidden="true"></span>
                <span>About</span>
              </a>
            </nav>

            <button
              type="button"
              className="menu-trigger"
              id="open-menu-btn"
              onClick={handleOpenMenu}
              aria-expanded={menuOpen}
              aria-controls="modal-menu"
              aria-label="Open navigation menu"
            >
              <span className="menu-trigger__label">Menu</span>
              <span className="menu-trigger__bars" aria-hidden="true">
                <span className="menu-trigger__bar"></span>
                <span className="menu-trigger__bar"></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ======================================================================
             HERO
             ====================================================================== */}
        <section className="hero" aria-label="Introduction">
          <div className="container">
            <div className="hero__grid">
              <div className="hero__left">
                <div className="eyebrow" data-reveal="fade" style={{ "--delay": "0ms" } as React.CSSProperties}>
                  <span className="eyebrow__line" aria-hidden="true"></span>
                  <span className="eyebrow__text">Software Engineering Undergraduate &middot; Full Stack Web Developer</span>
                </div>

                <h1 className="hero__title" data-reveal="lines" data-line-stagger="140">
                  Systems, <span className="italic-accent">engineered</span> in code.
                </h1>

                <p className="hero__lead" data-reveal="words" data-word-stagger="18" data-base-delay="500">
                  Motivated and dedicated student currently pursuing a Bachelor&apos;s in Software Engineering at Salim Habib University — combining full stack web development, object-oriented programming, and cybersecurity fundamentals to solve complex problems.
                </p>

                <div className="hero__actions" data-reveal="fade-up" style={{ "--delay": "800ms" } as React.CSSProperties}>
                  <a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="cta-btn cta-btn--light-solid">
                    <span>View GitHub projects</span>
                    <span className="cta-btn__arrow" aria-hidden="true">&rarr;</span>
                  </a>
                  <a href="#stack" onClick={(e) => handleNavClick(e, "#stack")} className="cta-btn cta-btn--light-ghost">
                    <span>Explore tech stack</span>
                    <span className="cta-btn__arrow" aria-hidden="true">&rarr;</span>
                  </a>
                </div>

                <dl className="hero__facts" data-reveal="fade" style={{ "--delay": "1000ms" } as React.CSSProperties}>
                  <div>
                    <dt className="hero__fact-term">Institution</dt>
                    <dd className="hero__fact-val">Salim Habib Univ.</dd>
                  </div>
                  <div>
                    <dt className="hero__fact-term">Degree</dt>
                    <dd className="hero__fact-val">BS Software Engineering</dd>
                  </div>
                  <div>
                    <dt className="hero__fact-term">GitHub</dt>
                    <dd className="hero__fact-val">github.com/foziafawad</dd>
                  </div>
                </dl>
              </div>

              <div className="hero__right">
                <div className="media-frame hero__portrait" data-reveal="plate" style={{ "--delay": "200ms" } as React.CSSProperties}>
                  <img
                    src="/assets/portrait-fozia-clear.jpg"
                    alt="Syeda Fozia Fawad — Software Engineering Undergraduate"
                    fetchPriority="high"
                    style={{ filter: "none", objectPosition: "center 18%" }}
                  />
                </div>
              </div>
            </div>

            <div className="hero__scroll-cue" data-reveal="fade" style={{ "--delay": "1400ms" } as React.CSSProperties} aria-hidden="true">
              <span className="hero__scroll-text">Scroll to enter</span>
              <span className="hero__scroll-line"></span>
            </div>
          </div>
        </section>

        {/* ======================================================================
             STATEMENT
             ====================================================================== */}
        <section className="statement rule-dashed" aria-label="Profile summary">
          <div className="statement__inner">
            <div className="eyebrow statement__eyebrow" data-reveal="fade">
              <span className="eyebrow__line" aria-hidden="true"></span>
              <span className="eyebrow__text">Profile summary</span>
            </div>

            <p className="statement__quote" data-reveal="words" data-word-stagger="30">
              Motivated and dedicated student currently pursuing a Bachelor&apos;s in Software Engineering at Salim Habib University. A fast learner with a strong foundation in programming, cybersecurity, and soft skills such as teamwork and management — passionate about leveraging technology to solve complex problems and continuously expanding my technical toolkit.
            </p>

            <span className="statement__sig" data-reveal="fade-up" style={{ "--delay": "400ms" } as React.CSSProperties}>
              — Syeda Fozia Fawad
            </span>
          </div>
        </section>

        {/* ======================================================================
             CONTINUOUS SLIDING TECH STACK MARQUEE
             ====================================================================== */}
        <section id="stack" className="tech-marquee rule-dashed anchored-section" aria-labelledby="stack-heading">
          <div className="tech-marquee__header">
            <div className="eyebrow eyebrow--dark" data-reveal="fade">
              <span className="eyebrow__line" aria-hidden="true"></span>
              <span className="eyebrow__text">Technologies &amp; Tooling</span>
            </div>
            <h2 id="stack-heading" className="tech-marquee__title" data-reveal="lines" data-line-stagger="90">
              Tech <span className="italic-accent">Stack</span>
            </h2>
            <p className="tech-marquee__sub" data-reveal="fade">
              Technologies I use to bring ideas to life
            </p>
          </div>

          <div className="marquee-wrapper" data-reveal="fade">
            {/* ROW 1: Frontend & Web Architecture (Slides Left Continuously) */}
            <div className="marquee-row" aria-label="Frontend and Web Technologies">
              <div className="marquee-track">
                {/* Set A */}
                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10h4M9 10v6M14 14.5c0 1 .8 1.5 1.8 1.5s1.7-.5 1.7-1.4c0-1.8-3.5-1.1-3.5-3 0-.9.8-1.6 1.8-1.6s1.6.5 1.7 1.3"/></svg>
                  </div>
                  <span className="tech-item__label">TypeScript</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/></svg>
                  </div>
                  <span className="tech-item__label">React</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 15V9l7.5 9.5M15 9v6"/></svg>
                  </div>
                  <span className="tech-item__label">Next.js</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M6 10c1.2-2.2 3-3 5-2 1.8.9 2.6 2.5 4.5 2.5 1.5 0 2.7-.8 3.5-2.5M5 15.5c1.2-2.2 3-3 5-2 1.8.9 2.6 2.5 4.5 2.5 1.5 0 2.7-.8 3.5-2.5"/></svg>
                  </div>
                  <span className="tech-item__label">Tailwind CSS</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M4 3h16l-1.5 16L12 21l-6.5-2L4 3z"/><path d="M15.5 8h-7l.4 4h6.2l-.5 4.5-2.6.8-2.6-.8-.2-2"/></svg>
                  </div>
                  <span className="tech-item__label">HTML</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M4 3h16l-1.5 16L12 21l-6.5-2L4 3z"/><path d="M8.5 8h7l-.3 3.5H10m5.1 0l-.4 4.5-2.7.8-2.7-.8-.2-1.8"/></svg>
                  </div>
                  <span className="tech-item__label">CSS</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M10 9v5.5c0 1.2-.7 1.8-1.8 1.8-.9 0-1.5-.4-1.7-1.2M13.5 14.8c.3.8 1 1.2 2 1.2 1.1 0 1.8-.6 1.8-1.5 0-1.9-3.6-1.1-3.6-3.1 0-.9.8-1.6 1.9-1.6.9 0 1.6.4 1.8 1.1"/></svg>
                  </div>
                  <span className="tech-item__label">JavaScript</span>
                </div>

                {/* Set B (Seamless Loop Clone) */}
                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10h4M9 10v6M14 14.5c0 1 .8 1.5 1.8 1.5s1.7-.5 1.7-1.4c0-1.8-3.5-1.1-3.5-3 0-.9.8-1.6 1.8-1.6s1.6.5 1.7 1.3"/></svg>
                  </div>
                  <span className="tech-item__label">TypeScript</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/></svg>
                  </div>
                  <span className="tech-item__label">React</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 15V9l7.5 9.5M15 9v6"/></svg>
                  </div>
                  <span className="tech-item__label">Next.js</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M6 10c1.2-2.2 3-3 5-2 1.8.9 2.6 2.5 4.5 2.5 1.5 0 2.7-.8 3.5-2.5M5 15.5c1.2-2.2 3-3 5-2 1.8.9 2.6 2.5 4.5 2.5 1.5 0 2.7-.8 3.5-2.5"/></svg>
                  </div>
                  <span className="tech-item__label">Tailwind CSS</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M4 3h16l-1.5 16L12 21l-6.5-2L4 3z"/><path d="M15.5 8h-7l.4 4h6.2l-.5 4.5-2.6.8-2.6-.8-.2-2"/></svg>
                  </div>
                  <span className="tech-item__label">HTML</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M4 3h16l-1.5 16L12 21l-6.5-2L4 3z"/><path d="M8.5 8h7l-.3 3.5H10m5.1 0l-.4 4.5-2.7.8-2.7-.8-.2-1.8"/></svg>
                  </div>
                  <span className="tech-item__label">CSS</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M10 9v5.5c0 1.2-.7 1.8-1.8 1.8-.9 0-1.5-.4-1.7-1.2M13.5 14.8c.3.8 1 1.2 2 1.2 1.1 0 1.8-.6 1.8-1.5 0-1.9-3.6-1.1-3.6-3.1 0-.9.8-1.6 1.9-1.6.9 0 1.6.4 1.8 1.1"/></svg>
                  </div>
                  <span className="tech-item__label">JavaScript</span>
                </div>
              </div>
            </div>

            {/* ROW 2: Backend, Languages, Security & Tooling (Slides Right Continuously) */}
            <div className="marquee-row marquee-row--reverse" aria-label="Backend, Languages, Security, and Developer Tools">
              <div className="marquee-track">
                {/* Set A */}
                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><polygon points="12 2 20.5 7 20.5 17 12 22 3.5 17 3.5 7 12 2"/><path d="M9 14.5V9.5l6 5V9.5"/></svg>
                  </div>
                  <span className="tech-item__label">Node.js</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16"/></svg>
                  </div>
                  <span className="tech-item__label">RESTful APIs</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><polygon points="12 2 20.5 7 20.5 17 12 22 3.5 17 3.5 7 12 2"/><path d="M12.5 9.5a3 3 0 1 0 0 5M15 12h3M16.5 10.5v3"/></svg>
                  </div>
                  <span className="tech-item__label">C++</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M6 14h10v2a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-2zM16 15h2a1.5 1.5 0 0 1 0 3h-2M9 5c0 1.5 1.5 2 1.5 3.5S9 10.5 9 11.5M13 4c0 1.5 1.5 2 1.5 3.5S13 9.5 13 10.5"/></svg>
                  </div>
                  <span className="tech-item__label">Java</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><rect x="3" y="4" width="7" height="7" rx="1"/><rect x="14" y="4" width="7" height="7" rx="1"/><rect x="8.5" y="14" width="7" height="7" rx="1"/><path d="M6.5 11v2h11v-2M12 13v1"/></svg>
                  </div>
                  <span className="tech-item__label">OOP</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M12 2l7 3.5v6c0 5-3 8.8-7 10.5-4-1.7-7-5.5-7-10.5v-6L12 2z"/><path d="M9.5 12l1.8 1.8 3.5-3.6"/></svg>
                  </div>
                  <span className="tech-item__label">Network Security</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M12 3l8 14H4L12 3z"/><path d="M12 9v4M12 15.5h.01"/></svg>
                  </div>
                  <span className="tech-item__label">Risk Management</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M6 8.5v7a2.5 2.5 0 0 0 2.5 2.5h7M18 8.5v7"/></svg>
                  </div>
                  <span className="tech-item__label">Git &amp; GitHub</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><polygon points="12 4 21 19 3 19 12 4"/></svg>
                  </div>
                  <span className="tech-item__label">Vercel</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M16.5 3.5L20 5.2v13.6l-3.5 1.7L4 12l12.5-8.5zM16.5 7.5L9.5 12l7 4.5v-9z"/></svg>
                  </div>
                  <span className="tech-item__label">VS Code</span>
                </div>

                <div className="tech-item">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M12 3l7 16-7-4-7 4 7-16z"/></svg>
                  </div>
                  <span className="tech-item__label">Antigravity</span>
                </div>

                {/* Set B (Seamless Loop Clone) */}
                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><polygon points="12 2 20.5 7 20.5 17 12 22 3.5 17 3.5 7 12 2"/><path d="M9 14.5V9.5l6 5V9.5"/></svg>
                  </div>
                  <span className="tech-item__label">Node.js</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16"/></svg>
                  </div>
                  <span className="tech-item__label">RESTful APIs</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><polygon points="12 2 20.5 7 20.5 17 12 22 3.5 17 3.5 7 12 2"/><path d="M12.5 9.5a3 3 0 1 0 0 5M15 12h3M16.5 10.5v3"/></svg>
                  </div>
                  <span className="tech-item__label">C++</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M6 14h10v2a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4v-2zM16 15h2a1.5 1.5 0 0 1 0 3h-2M9 5c0 1.5 1.5 2 1.5 3.5S9 10.5 9 11.5M13 4c0 1.5 1.5 2 1.5 3.5S13 9.5 13 10.5"/></svg>
                  </div>
                  <span className="tech-item__label">Java</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><rect x="3" y="4" width="7" height="7" rx="1"/><rect x="14" y="4" width="7" height="7" rx="1"/><rect x="8.5" y="14" width="7" height="7" rx="1"/><path d="M6.5 11v2h11v-2M12 13v1"/></svg>
                  </div>
                  <span className="tech-item__label">OOP</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M12 2l7 3.5v6c0 5-3 8.8-7 10.5-4-1.7-7-5.5-7-10.5v-6L12 2z"/><path d="M9.5 12l1.8 1.8 3.5-3.6"/></svg>
                  </div>
                  <span className="tech-item__label">Network Security</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M12 3l8 14H4L12 3z"/><path d="M12 9v4M12 15.5h.01"/></svg>
                  </div>
                  <span className="tech-item__label">Risk Management</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M6 8.5v7a2.5 2.5 0 0 0 2.5 2.5h7M18 8.5v7"/></svg>
                  </div>
                  <span className="tech-item__label">Git &amp; GitHub</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><polygon points="12 4 21 19 3 19 12 4"/></svg>
                  </div>
                  <span className="tech-item__label">Vercel</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M16.5 3.5L20 5.2v13.6l-3.5 1.7L4 12l12.5-8.5zM16.5 7.5L9.5 12l7 4.5v-9z"/></svg>
                  </div>
                  <span className="tech-item__label">VS Code</span>
                </div>

                <div className="tech-item" aria-hidden="true">
                  <div className="tech-item__icon">
                    <svg viewBox="0 0 24 24"><path d="M12 3l7 16-7-4-7 4 7-16z"/></svg>
                  </div>
                  <span className="tech-item__label">Antigravity</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
             PROJECTS & CONTRIBUTIONS SHOWCASE (ZIG-ZAG + FILTER TABS)
             ====================================================================== */}
        <section id="projects" className="works rule-dashed section-pad anchored-section" aria-labelledby="projects-heading">
          <div className="container">
            <div className="works__header-row">
              <header className="section-heading">
                <div className="eyebrow section-heading__eyebrow" data-reveal="fade">
                  <span className="eyebrow__line" aria-hidden="true"></span>
                  <span className="eyebrow__text">Projects &amp; Contributions</span>
                </div>
                <h2 id="projects-heading" className="section-heading__title" data-reveal="lines" data-line-stagger="90">
                  Engineering <span className="italic-accent">works</span> built &amp; shipped.
                </h2>
              </header>

              <div className="works__header-right" data-reveal="fade">
                <p className="works__header-note">
                  Full-stack applications, multi-agent systems, security architectures, and collaborative builds from my GitHub repositories and team contributions.
                </p>
                <div className="works__filters" role="tablist" aria-label="Filter projects">
                  <button
                    type="button"
                    className={`filter-pill ${filter === "all" ? "is-active" : ""}`}
                    onClick={() => setFilter("all")}
                  >
                    All Projects ({projects.length})
                  </button>
                  <button
                    type="button"
                    className={`filter-pill ${filter === "owned" ? "is-active" : ""}`}
                    onClick={() => setFilter("owned")}
                  >
                    Solo &amp; Lead (4)
                  </button>
                  <button
                    type="button"
                    className={`filter-pill ${filter === "contributed" ? "is-active" : ""}`}
                    onClick={() => setFilter("contributed")}
                  >
                    Contributed (2)
                  </button>
                </div>
              </div>
            </div>

            <div className="works__grid" id="works-grid">
              {visibleProjects.map((proj, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <article
                    key={proj.id}
                    className={`work-card ${isEven ? "work-card--even" : "work-card--odd"}`}
                    data-category={proj.category}
                  >
                    <figure>
                      <div className="work-card__media" style={{ aspectRatio: proj.aspect }} data-reveal="plate">
                        {proj.role ? <span className="work-card__role-badge">{proj.role}</span> : null}
                        <div className="work-card__parallax" data-parallax>
                          <img
                            src={proj.img}
                            alt={proj.title}
                            loading="lazy"
                            style={
                              ["eternelle", "thermoagent", "climate", "portfolio", "hims"].includes(proj.id)
                                ? { filter: "none", objectFit: "cover" }
                                : undefined
                            }
                          />
                        </div>
                      </div>
                      <figcaption className="work-card__caption">
                        <div className="work-card__top-meta">
                          <h3 className="work-card__title">{proj.title}</h3>
                          <span className="work-card__year">{proj.year}</span>
                        </div>
                        <p className="work-card__desc">{proj.desc}</p>
                        <div className="work-card__footer">
                          <div className="work-card__tags">
                            {proj.tags.map((tag) => (
                              <span key={tag} className="work-card__tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a
                            href={proj.repo}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="work-card__repo-link"
                          >
                            <span>GitHub</span>
                            <span aria-hidden="true">&nearr;</span>
                          </a>
                        </div>
                      </figcaption>
                    </figure>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================================================================
             PINNED CTA #1 (DARK, WITH PORTRAIT — NEXT STEPS / OPPORTUNITIES)
             ====================================================================== */}
        <section className="pinned-cta rule-dashed" aria-labelledby="pinned-cta-1-heading">
          <div className="container">
            <div className="pinned-cta__split">
              <div className="pinned-cta__copy">
                <div className="pinned-cta__copy-inner">
                  <div className="eyebrow eyebrow--dark pinned-cta__eyebrow" data-reveal="fade">
                    <span className="eyebrow__line" aria-hidden="true"></span>
                    <span className="eyebrow__text">Next steps</span>
                  </div>

                  <h2 id="pinned-cta-1-heading" className="pinned-cta__title" data-reveal="lines" data-line-stagger="90">
                    Seeking Software Engineering &amp; Cybersecurity roles.
                  </h2>

                  <p className="pinned-cta__body" data-reveal="words" data-word-stagger="16">
                    Eager to apply full stack development and security fundamentals in a professional environment — open to internships and entry-level opportunities.
                  </p>

                  <div className="pinned-cta__action" data-reveal="fade-up" style={{ "--delay": "300ms" } as React.CSSProperties}>
                    <a
                      href="https://github.com/foziafawad"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="cta-btn cta-btn--dark-solid"
                    >
                      <span>Explore GitHub Profile</span>
                      <span className="cta-btn__arrow" aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="pinned-cta__media">
                <div className="media-frame media-frame--dark pinned-cta__plate" data-reveal="plate">
                  <img
                    src="/assets/workspace-code.jpg"
                    alt="Syeda Fozia Fawad — Software Engineering Workstation"
                    loading="lazy"
                    style={{ filter: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
             CORE STRENGTHS (GREY)
             ====================================================================== */}
        <section className="principles rule-dashed section-pad" aria-labelledby="principles-heading">
          <div className="container">
            <header className="section-heading">
              <div className="eyebrow section-heading__eyebrow" data-reveal="fade">
                <span className="eyebrow__line" aria-hidden="true"></span>
                <span className="eyebrow__text">Core strengths</span>
              </div>
              <h2 id="principles-heading" className="section-heading__title" data-reveal="lines" data-line-stagger="90">
                Three pillars of my technical toolkit.
              </h2>
            </header>

            <div className="principles__grid">
              <article className="principle-card" data-reveal="fade-up" style={{ "--delay": "0ms" } as React.CSSProperties}>
                <span className="principle-card__num">01</span>
                <h3 className="principle-card__title">Full Stack Web Engineering.</h3>
                <p className="principle-card__body">
                  Building responsive, structured web interfaces and APIs with React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Node.js, and Tailwind CSS.
                </p>
              </article>

              <article className="principle-card" data-reveal="fade-up" style={{ "--delay": "90ms" } as React.CSSProperties}>
                <span className="principle-card__num">02</span>
                <h3 className="principle-card__title">Cybersecurity &amp; Risk Awareness.</h3>
                <p className="principle-card__body">
                  Applying network security fundamentals and structured security risk management certified through Coursera.
                </p>
              </article>

              <article className="principle-card" data-reveal="fade-up" style={{ "--delay": "180ms" } as React.CSSProperties}>
                <span className="principle-card__num">03</span>
                <h3 className="principle-card__title">Communication &amp; Leadership.</h3>
                <p className="principle-card__body">
                  Confident communicator with strong problem-solving capabilities, effective in teamwork, management, and public presentation.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ======================================================================
             ABOUT
             ====================================================================== */}
        <section id="about" className="about rule-dashed section-pad anchored-section" aria-labelledby="about-heading">
          <div className="container">
            <div className="about__top">
              <div className="about__left">
                <div className="eyebrow about__eyebrow" data-reveal="fade">
                  <span className="eyebrow__line" aria-hidden="true"></span>
                  <span className="eyebrow__text">About</span>
                </div>
                <h2 id="about-heading" className="about__title" data-reveal="lines" data-line-stagger="90">
                  Leveraging technology to solve complex problems.
                </h2>
              </div>

              <div className="about__right">
                <div className="about__copy">
                  <p className="about__para" data-reveal="words" data-word-stagger="10">
                    I am a motivated and dedicated Software Engineering undergraduate at Salim Habib University, building a strong foundation across modern web development, object-oriented programming, and cybersecurity.
                  </p>
                  <p className="about__para" data-reveal="words" data-word-stagger="10">
                    My technical toolkit spans React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Node.js, RESTful APIs, C++, and Java — supported by practical workflows in Git, GitHub, Vercel, VS Code, and Antigravity.
                  </p>
                  <p className="about__para" data-reveal="words" data-word-stagger="10">
                    Beyond code, I bring hands-on experience in technical content creation at DeepTech and client relations at Fawad Gems, alongside fluency in Urdu (Native), English (Advanced), and Arabic (Elementary).
                  </p>
                </div>
              </div>
            </div>

            <div className="about__photos">
              <div className="media-frame about__photo-cell" data-reveal="plate" style={{ "--delay": "0ms" } as React.CSSProperties}>
                <img src="/assets/eternelle-gems.jpg" alt="Full stack web architecture — Éternelle Gems" loading="lazy" style={{ filter: "none" }} />
              </div>
              <div className="media-frame about__photo-cell" data-reveal="plate" style={{ "--delay": "100ms" } as React.CSSProperties}>
                <img src="/assets/thermoagent.jpg" alt="ThermoAgent AI dashboard" loading="lazy" style={{ filter: "none" }} />
              </div>
              <div className="media-frame about__photo-cell" data-reveal="plate" style={{ "--delay": "200ms" } as React.CSSProperties}>
                <img src="/assets/pakistan-climate.jpg" alt="Climate Change & Heatwave Observatory dashboard" loading="lazy" style={{ filter: "none" }} />
              </div>
            </div>

            <dl className="about__ledger" data-reveal="fade-up">
              <div>
                <dt className="about__ledger-dt">University</dt>
                <dd className="about__ledger-dd">Salim Habib University</dd>
              </div>
              <div>
                <dt className="about__ledger-dt">Program</dt>
                <dd className="about__ledger-dd">Bachelors (SE) &middot; 2026–Present</dd>
              </div>
              <div>
                <dt className="about__ledger-dt">Languages</dt>
                <dd className="about__ledger-dd">Urdu, English, Arabic</dd>
              </div>
              <div>
                <dt className="about__ledger-dt">GitHub</dt>
                <dd className="about__ledger-dd">Fozia Fawad</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ======================================================================
             EXPERIENCE & EDUCATION TIMELINE (STICKY HEADING)
             ====================================================================== */}
        <section id="experience" className="process rule-dashed section-pad anchored-section" aria-labelledby="process-heading">
          <div className="container">
            <div className="process__grid">
              <div className="process__left">
                <div className="process__sticky">
                  <header className="section-heading">
                    <div className="eyebrow section-heading__eyebrow" data-reveal="fade">
                      <span className="eyebrow__line" aria-hidden="true"></span>
                      <span className="eyebrow__text">Work &amp; academic path</span>
                    </div>
                    <h2 id="process-heading" className="section-heading__title" data-reveal="lines" data-line-stagger="90">
                      Experience and education timeline.
                    </h2>
                  </header>
                </div>
              </div>

              <div className="process__right">
                <ol>
                  <li className="process-step" data-reveal="fade-up">
                    <span className="process-step__num">01</span>
                    <div className="process-step__content">
                      <h3 className="process-step__title">Podcast Host &amp; Content Creator &mdash; DeepTech (Oct 2026–Present)</h3>
                      <p className="process-step__body">
                        Hosting technical podcast discussions, producing insightful engineering media, and actively engaging with the developer and tech community.
                      </p>
                    </div>
                  </li>

                  <li className="process-step" data-reveal="fade-up">
                    <span className="process-step__num">02</span>
                    <div className="process-step__content">
                      <h3 className="process-step__title">Bachelors (Software Engineering) &mdash; Salim Habib Univ. (2026–Present)</h3>
                      <p className="process-step__body">
                        Pursuing undergraduate studies in Software Engineering with coursework and focus across programming, OOP, web systems, and cybersecurity.
                      </p>
                    </div>
                  </li>

                  <li className="process-step" data-reveal="fade-up">
                    <span className="process-step__num">03</span>
                    <div className="process-step__content">
                      <h3 className="process-step__title">Sales and Marketing &mdash; Fawad Gems (2019–2021)</h3>
                      <p className="process-step__body">
                        Managed client relations, implemented marketing strategies, and supported business growth.
                      </p>
                    </div>
                  </li>

                  <li className="process-step" data-reveal="fade-up">
                    <span className="process-step__num">04</span>
                    <div className="process-step__content">
                      <h3 className="process-step__title">Intermediate &amp; Matriculation (2023–2025)</h3>
                      <p className="process-step__body">
                        Intermediate (Pre-Med) at New Fazaia College (2024–2025, Grade B) following Matriculation (Bio) at SM Public Academy (2023–2024, Grade A).
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
             PINNED CTA #2 (DARK, CENTERED, NO IMAGE)
             ====================================================================== */}
        <section id="contact" className="pinned-cta rule-dashed anchored-section" aria-labelledby="pinned-cta-2-heading">
          <div className="container">
            <div className="pinned-cta__centered">
              <div className="eyebrow eyebrow--dark pinned-cta__eyebrow" data-reveal="fade">
                <span className="eyebrow__line" aria-hidden="true"></span>
                <span className="eyebrow__text">Contact</span>
              </div>

              <h2 id="pinned-cta-2-heading" className="pinned-cta__title" data-reveal="lines" data-line-stagger="90">
                Open to internships and entry-level roles.
              </h2>

              <p className="pinned-cta__body" data-reveal="words" data-word-stagger="16">
                Thank you for reviewing my profile. Reach out directly via email or connect through LinkedIn and GitHub to discuss opportunities in Software Engineering or Cybersecurity.
              </p>

              <div className="pinned-cta__action" data-reveal="fade-up" style={{ "--delay": "300ms" } as React.CSSProperties}>
                <a href="mailto:syfozi.fawad857@gmail.com" className="cta-btn cta-btn--dark-solid">
                  <span>syfozi.fawad857@gmail.com</span>
                  <span className="cta-btn__arrow" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================
             EDUCATION RECORD (3-COLUMN CARDS)
             ====================================================================== */}
        <section className="testimonials rule-dashed section-pad" aria-labelledby="testimonials-heading">
          <div className="container">
            <header className="section-heading">
              <div className="eyebrow section-heading__eyebrow" data-reveal="fade">
                <span className="eyebrow__line" aria-hidden="true"></span>
                <span className="eyebrow__text">Education</span>
              </div>
              <h2 id="testimonials-heading" className="section-heading__title" data-reveal="lines" data-line-stagger="90">
                Academic foundation and progression.
              </h2>
            </header>

            <div className="testimonials__grid">
              <figure className="testimonial-card" data-reveal="fade-up" style={{ "--delay": "0ms" } as React.CSSProperties}>
                <blockquote className="testimonial-card__quote">
                  Bachelors in Software Engineering &mdash; currently pursuing undergraduate studies in software systems, programming, and security.
                </blockquote>
                <figcaption className="testimonial-card__meta">
                  <p className="testimonial-card__author">Salim Habib University</p>
                  <p className="testimonial-card__role">2026 &ndash; Present</p>
                </figcaption>
              </figure>

              <figure className="testimonial-card" data-reveal="fade-up" style={{ "--delay": "110ms" } as React.CSSProperties}>
                <blockquote className="testimonial-card__quote">
                  Intermediate (Pre-Med) &mdash; completed higher secondary education with Grade B.
                </blockquote>
                <figcaption className="testimonial-card__meta">
                  <p className="testimonial-card__author">New Fazaia College</p>
                  <p className="testimonial-card__role">2024 &ndash; 2025 &middot; Grade B</p>
                </figcaption>
              </figure>

              <figure className="testimonial-card" data-reveal="fade-up" style={{ "--delay": "220ms" } as React.CSSProperties}>
                <blockquote className="testimonial-card__quote">
                  Matriculation (Biology) &mdash; completed secondary school education with Grade A.
                </blockquote>
                <figcaption className="testimonial-card__meta">
                  <p className="testimonial-card__author">SM Public Academy</p>
                  <p className="testimonial-card__role">2023 &ndash; 2024 &middot; Grade A</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ======================================================================
             CERTIFICATIONS & LANGUAGES LEDGER (GREY)
             ====================================================================== */}
        <section id="credentials" className="exhibitions rule-dashed section-pad anchored-section" aria-labelledby="exhibitions-heading">
          <div className="container">
            <header className="section-heading exhibitions__heading">
              <div className="eyebrow section-heading__eyebrow" data-reveal="fade">
                <span className="eyebrow__line" aria-hidden="true"></span>
                <span className="eyebrow__text">Certifications &amp; languages</span>
              </div>
              <h2 id="exhibitions-heading" className="section-heading__title" data-reveal="lines" data-line-stagger="90">
                Additional certifications &amp; fluency.
              </h2>
            </header>

            <ul className="exhibitions__list">
              <li className="exhibition-item" data-reveal="fade-up" style={{ "--delay": "0ms" } as React.CSSProperties}>
                <span className="exhibition-item__idx">01</span>
                <span className="exhibition-item__name">Coursera: Foundations of Cybersecurity</span>
              </li>
              <li className="exhibition-item" data-reveal="fade-up" style={{ "--delay": "80ms" } as React.CSSProperties}>
                <span className="exhibition-item__idx">02</span>
                <span className="exhibition-item__name">Coursera: Manage Security Risks</span>
              </li>
              <li className="exhibition-item" data-reveal="fade-up" style={{ "--delay": "160ms" } as React.CSSProperties}>
                <span className="exhibition-item__idx">03</span>
                <span className="exhibition-item__name">Coursera: Network Security</span>
              </li>
              <li className="exhibition-item" data-reveal="fade-up" style={{ "--delay": "0ms" } as React.CSSProperties}>
                <span className="exhibition-item__idx">04</span>
                <span className="exhibition-item__name">Zad Academy: Islamic Studies (Aqeedah, Seerah, Fiqh)</span>
              </li>
              <li className="exhibition-item" data-reveal="fade-up" style={{ "--delay": "80ms" } as React.CSSProperties}>
                <span className="exhibition-item__idx">05</span>
                <span className="exhibition-item__name">Zad Academy: Tarbiyah, Arabic &amp; Hadith</span>
              </li>
              <li className="exhibition-item" data-reveal="fade-up" style={{ "--delay": "160ms" } as React.CSSProperties}>
                <span className="exhibition-item__idx">06</span>
                <span className="exhibition-item__name">Urdu &mdash; Native Proficiency</span>
              </li>
              <li className="exhibition-item" data-reveal="fade-up" style={{ "--delay": "0ms" } as React.CSSProperties}>
                <span className="exhibition-item__idx">07</span>
                <span className="exhibition-item__name">English &mdash; Advanced Proficiency</span>
              </li>
              <li className="exhibition-item" data-reveal="fade-up" style={{ "--delay": "80ms" } as React.CSSProperties}>
                <span className="exhibition-item__idx">08</span>
                <span className="exhibition-item__name">Arabic &mdash; Elementary Proficiency</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ======================================================================
             FAQ (ACCORDION)
             ====================================================================== */}
        <section className="faq rule-dashed section-pad" aria-labelledby="faq-heading">
          <div className="container">
            <div className="faq__grid">
              <div className="faq__left">
                <header className="section-heading">
                  <div className="eyebrow section-heading__eyebrow" data-reveal="fade">
                    <span className="eyebrow__line" aria-hidden="true"></span>
                    <span className="eyebrow__text">Overview</span>
                  </div>
                  <h2 id="faq-heading" className="section-heading__title" data-reveal="lines" data-line-stagger="90">
                    Profile &amp; availability.
                  </h2>
                </header>
              </div>

              <div className="faq__right">
                {/* Q1 */}
                <div className={`faq-item ${openFaqs[1] ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="faq-item__trigger"
                      id="faq-btn-1"
                      onClick={() => toggleFaq(1)}
                      aria-expanded={openFaqs[1] ? "true" : "false"}
                      aria-controls="faq-panel-1"
                    >
                      <span className="faq-item__question">What roles am I currently seeking?</span>
                      <span className="faq-item__glyph" aria-hidden="true">+</span>
                    </button>
                  </h3>
                  <div
                    id="faq-panel-1"
                    className="faq-item__panel"
                    role="region"
                    aria-labelledby="faq-btn-1"
                  >
                    <div className="faq-item__answer-wrap">
                      <p className="faq-item__answer">
                        As a Software Engineering undergraduate at Salim Habib University (2026&ndash;Present), I am actively seeking internships and entry-level opportunities in Software Engineering, Full-Stack Web Development, and Cybersecurity. I am open to on-site, hybrid, and remote roles&mdash;as well as collaborative research and engineering projects&mdash;where I can contribute to building reliable web applications, object-oriented systems, and security-conscious architectures.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Q2 */}
                <div className={`faq-item ${openFaqs[2] ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="faq-item__trigger"
                      id="faq-btn-2"
                      onClick={() => toggleFaq(2)}
                      aria-expanded={openFaqs[2] ? "true" : "false"}
                      aria-controls="faq-panel-2"
                    >
                      <span className="faq-item__question">What is my primary full stack and programming toolkit?</span>
                      <span className="faq-item__glyph" aria-hidden="true">+</span>
                    </button>
                  </h3>
                  <div
                    id="faq-panel-2"
                    className="faq-item__panel"
                    role="region"
                    aria-labelledby="faq-btn-2"
                  >
                    <div className="faq-item__answer-wrap">
                      <p className="faq-item__answer">
                        My core web stack includes React, Next.js (App Router), TypeScript, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS on the frontend, paired with Node.js and RESTful APIs on the backend. For systems and object-oriented programming, I work with C++ and Java. My daily development workflow relies on Git, GitHub, Vercel, VS Code, and Antigravity, applied across production builds such as &Eacute;ternelle Gems, ThermoAgent AI, the Climate Change &amp; Heatwave Observatory, and IHIMS.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Q3 */}
                <div className={`faq-item ${openFaqs[3] ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="faq-item__trigger"
                      id="faq-btn-3"
                      onClick={() => toggleFaq(3)}
                      aria-expanded={openFaqs[3] ? "true" : "false"}
                      aria-controls="faq-panel-3"
                    >
                      <span className="faq-item__question">What cybersecurity training have I completed?</span>
                      <span className="faq-item__glyph" aria-hidden="true">+</span>
                    </button>
                  </h3>
                  <div
                    id="faq-panel-3"
                    className="faq-item__panel"
                    role="region"
                    aria-labelledby="faq-btn-3"
                  >
                    <div className="faq-item__answer-wrap">
                      <p className="faq-item__answer">
                        I have completed specialized Coursera certifications in Foundations of Cybersecurity, Manage Security Risks, and Network Security. Through this training and my academic coursework, I have built practical grounding in network security fundamentals, threat and vulnerability assessment, risk management frameworks, security governance, and designing resilient incident-reporting workflows.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Q4 */}
                <div className={`faq-item ${openFaqs[4] ? "is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      className="faq-item__trigger"
                      id="faq-btn-4"
                      onClick={() => toggleFaq(4)}
                      aria-expanded={openFaqs[4] ? "true" : "false"}
                      aria-controls="faq-panel-4"
                    >
                      <span className="faq-item__question">How can recruiters or teams reach me directly?</span>
                      <span className="faq-item__glyph" aria-hidden="true">+</span>
                    </button>
                  </h3>
                  <div
                    id="faq-panel-4"
                    className="faq-item__panel"
                    role="region"
                    aria-labelledby="faq-btn-4"
                  >
                    <div className="faq-item__answer-wrap">
                      <p className="faq-item__answer">
                        You can reach me directly via email at{" "}
                        <a href="mailto:syfozi.fawad857@gmail.com">syfozi.fawad857@gmail.com</a>, connect with me on LinkedIn as{" "}
                        <a
                          href="https://www.linkedin.com/in/syeda-fozia-fawad-78653b408/"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Syeda Fozia Fawad
                        </a>
                        , or explore my repositories on GitHub at{" "}
                        <a
                          href="https://github.com/foziafawad"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          github.com/foziafawad
                        </a>
                        . I respond promptly to messages regarding internships, entry-level roles, and technical collaborations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================
           FOOTER (DARK)
           ======================================================================== */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand" data-reveal="fade-up">
              <a href="#top" onClick={(e) => handleNavClick(e, "#top")} className="brand-logo" aria-label="Syeda Fozia Fawad — Back to top">
                <span className="brand-logo__diamond" aria-hidden="true"></span>
                <span className="brand-logo__wordmark">Syeda fozia fawad</span>
              </a>
              <p className="footer__tagline">Software Engineering Undergraduate &middot; Full Stack Web Developer.</p>
              <a href="mailto:syfozi.fawad857@gmail.com" className="footer__email">syfozi.fawad857@gmail.com</a>
            </div>

            <div className="footer__col-explore">
              <p className="footer__col-title">Navigation</p>
              <ul className="footer__links">
                <li><a href="#stack" onClick={(e) => handleNavClick(e, "#stack")} className="footer__link">Stack</a></li>
                <li><a href="#projects" onClick={(e) => handleNavClick(e, "#projects")} className="footer__link">Projects</a></li>
                <li><a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="footer__link">About</a></li>
                <li><a href="#experience" onClick={(e) => handleNavClick(e, "#experience")} className="footer__link">Experience</a></li>
                <li><a href="#credentials" onClick={(e) => handleNavClick(e, "#credentials")} className="footer__link">Credentials</a></li>
              </ul>
            </div>

            <div className="footer__col-studio">
              <p className="footer__col-title">Opportunities</p>
              <ul className="footer__links">
                <li><a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="footer__link">Software Engineering</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="footer__link">Cybersecurity</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="footer__link">Internships</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="footer__link">Entry-Level Roles</a></li>
              </ul>
            </div>

            <div className="footer__col-follow">
              <p className="footer__col-title">Profiles</p>
              <ul className="footer__links">
                <li>
                  <a href="https://www.linkedin.com/in/syeda-fozia-fawad-78653b408/" target="_blank" rel="noreferrer noopener" className="footer__link">
                    LinkedIn (Syeda Fozia Fawad)
                  </a>
                </li>
                <li>
                  <a href="https://github.com/foziafawad" target="_blank" rel="noreferrer noopener" className="footer__link">
                    GitHub (Fozia Fawad)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer__wordmark-wrap" data-reveal="fade-up" aria-hidden="true">
            <span className="footer__wordmark">Fozia</span>
          </div>

          <div className="footer__legal">
            <p className="footer__copy">&copy; 2026 Syeda Fozia Fawad. All rights reserved.</p>
            <div className="footer__legal-links">
              <a href="mailto:syfozi.fawad857@gmail.com" className="footer__legal-link">Email</a>
              <a href="https://github.com/foziafawad" target="_blank" rel="noreferrer noopener" className="footer__legal-link">GitHub</a>
              <a href="https://www.linkedin.com/in/syeda-fozia-fawad-78653b408/" target="_blank" rel="noreferrer noopener" className="footer__legal-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================
           MODAL MENU OVERLAY
           ======================================================================== */}
      <div
        id="modal-menu"
        className={`modal-menu ${menuOpen ? "is-open" : ""} ${menuClosing ? "is-closing" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        <div className="modal-menu__backdrop"></div>

        <div className="modal-menu__content">
          <div className="modal-menu__top">
            <span className="modal-menu__tag">Menu</span>
            <button
              type="button"
              className="modal-menu__close"
              id="close-menu-btn"
              onClick={() => handleCloseMenu()}
            >
              Close &#x2715;
            </button>
          </div>

          <nav className="modal-menu__nav" aria-label="Full screen">
            <div className="modal-menu__item" style={{ "--menu-delay": "180ms" } as React.CSSProperties}>
              <a
                href="#stack"
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMenu("#stack");
                }}
                className="modal-menu__link"
              >
                <span className="modal-menu__idx">01</span>
                <span className="modal-menu__label">Stack</span>
              </a>
            </div>
            <div className="modal-menu__item" style={{ "--menu-delay": "250ms" } as React.CSSProperties}>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMenu("#projects");
                }}
                className="modal-menu__link"
              >
                <span className="modal-menu__idx">02</span>
                <span className="modal-menu__label">Projects</span>
              </a>
            </div>
            <div className="modal-menu__item" style={{ "--menu-delay": "320ms" } as React.CSSProperties}>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMenu("#about");
                }}
                className="modal-menu__link"
              >
                <span className="modal-menu__idx">03</span>
                <span className="modal-menu__label">About</span>
              </a>
            </div>
            <div className="modal-menu__item" style={{ "--menu-delay": "390ms" } as React.CSSProperties}>
              <a
                href="#experience"
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMenu("#experience");
                }}
                className="modal-menu__link"
              >
                <span className="modal-menu__idx">04</span>
                <span className="modal-menu__label">Experience</span>
              </a>
            </div>
            <div className="modal-menu__item" style={{ "--menu-delay": "460ms" } as React.CSSProperties}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleCloseMenu("#contact");
                }}
                className="modal-menu__link"
              >
                <span className="modal-menu__idx">05</span>
                <span className="modal-menu__label">Contact</span>
              </a>
            </div>
          </nav>

          <div className="modal-menu__bottom">
            <div>
              <a href="mailto:syfozi.fawad857@gmail.com" className="modal-menu__email">
                syfozi.fawad857@gmail.com
              </a>
              <p className="modal-menu__loc">Salim Habib University</p>
            </div>

            <div className="modal-menu__socials">
              <a
                href="https://www.linkedin.com/in/syeda-fozia-fawad-78653b408/"
                target="_blank"
                rel="noreferrer noopener"
                className="modal-menu__social"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/foziafawad"
                target="_blank"
                rel="noreferrer noopener"
                className="modal-menu__social"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
