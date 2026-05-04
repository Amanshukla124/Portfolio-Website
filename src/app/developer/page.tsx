// Server Component — fetches GitHub data at render time
import CursorShell from "@/components/shared/CursorShell";

import ProjectCard from "@/components/developer/ProjectCard";
import { STATIC_PROJECTS } from "@/lib/projects";
import CLISection from "@/components/developer/CLISection";
import GitHubRepos from "@/components/developer/GitHubRepos";

import { getGithubUser, getGithubRepos } from "@/lib/github";
import Link from "next/link";
import { TerminalHero } from "@/components/developer/TerminalHero";

export default async function DeveloperPage() {
  const [ghUser, ghRepos] = await Promise.all([getGithubUser(), getGithubRepos()]);

  const skills = [
    { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS"] },
    { group: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion"] },
    { group: "Backend & DB", items: ["Flask", "SQLite", "SQL", "REST APIs", "Node.js"] },
    { group: "Tools", items: ["Git", "Figma", "Linux", "Illustrator"] },
    { group: "Concepts", items: ["Data Structures", "Graph Algorithms", "Memory Management", "OOP"] },
  ];

  const experience = [
    {
      role: "Visual Design Intern",
      company: "ExploreiT Nextgen Solutions",
      period: "Jun 2025 – Aug 2025",
      points: [
        "Designed client-facing presentations, proposals, and booklets using Figma and Illustrator.",
        "Ensured accuracy and timely delivery across all client deliverables.",
        "Enhanced internal operations and branding through creative, detail-oriented design solutions.",
      ],
    },
  ];

  const certifications = [
    { name: "Gen AI Engineering Mastermind", issuer: "Outskill", url: "https://drive.google.com/file/d/1SHV8h1pcuS_fWMh6fAkjKtY8GcPM4xKi/view?usp=sharing" },
    { name: "Database Management System", issuer: "NPTEL", url: "https://drive.google.com/file/d/1gVHom-V70L5wNc6hXJS8J0dx17pYXdIs/view" },
    { name: "Python Full Course", issuer: "GeeksforGeeks", url: "https://drive.google.com/file/d/1cuAUEpd8a3WoZ3pxQXm7jkceBwIv8mMJ/view" },
    { name: "KodeMaster AI Hackathon", issuer: "KodeMaster Academy", url: "https://drive.google.com/file/d/1bEOyzIQ9AuZMZSEnQcRHFA3_dokV3waN/view?usp=sharing" },
  ];

  return (
    <>
      <CursorShell />
      <main className="scanlines relative min-h-screen bg-[#050505] text-[#e8e8e8] font-mono overflow-x-hidden">

        {/* ── NAV ── */}
        <nav className="sticky top-0 z-30 flex justify-between items-center px-6 md:px-10 py-4 bg-[#050505]/90 backdrop-blur-md border-b border-neutral-800/50">
          <span className="text-green-400 font-bold tracking-tighter text-base text-glow-green">
            aman@dev:~$
          </span>
          <div className="flex items-center gap-3 md:gap-6">
            <a href="#projects" className="text-xs text-neutral-500 hover:text-green-400 transition-colors hidden md:inline">[projects]</a>
            <a href="#cli" className="text-xs text-neutral-500 hover:text-green-400 transition-colors hidden md:inline">[terminal]</a>
            <a href="#github" className="text-xs text-neutral-500 hover:text-green-400 transition-colors hidden md:inline">[github]</a>
            <a href="https://github.com/Amanshukla124" target="_blank" rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-green-400 transition-colors">
              [gh↗]
            </a>
            <Link href="/"
              className="text-xs text-neutral-600 hover:text-neutral-300 border border-neutral-800 hover:border-neutral-600 px-3 py-1.5 rounded transition-all">
              cd ../
            </Link>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 md:px-8 py-20 space-y-28">

          {/* ── TERMINAL HERO ── */}
          <TerminalHero />



          {/* ── INTERACTIVE CLI ── */}
          <section id="cli">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs text-green-600 tracking-widest uppercase">
                # Interactive Terminal
              </h2>
              <span className="text-[10px] text-neutral-700 font-mono">
                Try: help · about · show projects · skills
              </span>
            </div>
            <CLISection />
          </section>

          {/* ── PROJECTS ── */}
          <section id="projects">
            <h2 className="text-xs text-green-600 tracking-widest mb-8 uppercase">
              # Selected Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {STATIC_PROJECTS.map((p, i) => (
                <ProjectCard key={p.name} project={p} index={i} />
              ))}
            </div>
          </section>

          {/* ── GITHUB REPOS ── */}
          {ghRepos.length > 0 && (
            <section id="github">
              <GitHubRepos repos={ghRepos} />
            </section>
          )}

          {/* ── SKILLS ── */}
          <section>
            <h2 className="text-xs text-green-600 tracking-widest mb-8 uppercase">
              # Tech Stack
            </h2>
            <div className="space-y-5">
              {skills.map((group) => (
                <div key={group.group} className="flex flex-col sm:flex-row gap-3">
                  <span className="text-[10px] text-neutral-600 tracking-widest uppercase w-32 shrink-0 mt-1 font-mono">
                    {group.group}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono text-neutral-400 border border-neutral-800 hover:border-green-500/30 hover:text-green-400 hover:bg-green-500/5 px-3 py-1 rounded-full transition-all cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── EXPERIENCE ── */}
          <section>
            <h2 className="text-xs text-green-600 tracking-widest mb-8 uppercase">
              # Experience
            </h2>
            {experience.map((e, i) => (
              <div key={i} className="border border-neutral-800/80 rounded-2xl p-6 bg-[#0d0d0d] space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                  <div>
                    <h3 className="text-base font-bold text-white">{e.role}</h3>
                    <p className="text-sm text-green-500/80">{e.company}</p>
                  </div>
                  <span className="text-xs text-neutral-600 font-mono border border-neutral-800 px-3 py-1 rounded-full w-fit">
                    {e.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {e.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-neutral-500">
                      <span className="text-green-600 mt-0.5 shrink-0">▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* ── EDUCATION ── */}
          <section>
            <h2 className="text-xs text-green-600 tracking-widest mb-8 uppercase">
              # Education
            </h2>
            <div className="border border-neutral-800/80 rounded-2xl p-6 bg-[#0d0d0d] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">B.Tech — Computer Engineering</h3>
                <p className="text-sm text-neutral-500 mt-0.5">Bharati Vidyapeeth Deemed University, Pune</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                <span className="text-2xl font-black text-green-400">8.5 <span className="text-xs text-neutral-600 font-mono">/ 10 GPA</span></span>
                <span className="text-xs text-neutral-600 font-mono border border-neutral-800 px-3 py-1 rounded-full">2023 – 2027</span>
              </div>
            </div>
          </section>

          {/* ── CERTIFICATIONS ── */}
          <section>
            <h2 className="text-xs text-green-600 tracking-widest mb-6 uppercase">
              # Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0d0d0d] border border-neutral-800/80 hover:border-green-500/30 rounded-xl px-5 py-4 flex items-center gap-3 transition-colors group"
                >
                  <span className="text-green-500 shrink-0 group-hover:text-green-400 transition-colors">✦</span>
                  <div>
                    <p className="text-sm text-white font-semibold group-hover:text-green-300 transition-colors">{c.name}</p>
                    <p className="text-xs text-neutral-600 mt-0.5">{c.issuer} · <span className="text-green-700 group-hover:text-green-500 transition-colors">View ↗</span></p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section className="text-center pb-12">
            <p className="text-neutral-700 text-xs mb-4 font-mono tracking-widest">// system.status = "open_to_work"</p>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
              Let&apos;s Build <span className="text-green-400 text-glow-green">Something.</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:amanshukla200521@gmail.com"
                className="text-sm border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 text-green-400 px-6 py-3 rounded-xl transition-all glow-green">
                send_message()
              </a>
              <a href="https://linkedin.com/in/aman-shukla-691436297" target="_blank" rel="noopener noreferrer"
                className="text-sm border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white px-6 py-3 rounded-xl transition-all">
                LinkedIn →
              </a>
              <a href="https://github.com/Amanshukla124" target="_blank" rel="noopener noreferrer"
                className="text-sm border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white px-6 py-3 rounded-xl transition-all">
                GitHub →
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
