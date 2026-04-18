"use client";
import dynamic from "next/dynamic";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
const CustomCursor = dynamic(() => import("@/components/shared/CustomCursor"), { ssr: false });
const DesignerGem = dynamic(() => import("@/components/designer/DesignerGem"), { ssr: false });
const PortfolioGrid = dynamic(() => import("@/components/designer/PortfolioGrid"), { ssr: false });

/* ── Entry overlay to bridge the SplitScreen transition ── */
function PageEntryOverlay() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    // Tiny delay so the overlay is painted before fading — prevents white-frame flicker
    const id = requestAnimationFrame(() => setVisible(false));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="entry-overlay"
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #4f46e5 100%)",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      )}
    </AnimatePresence>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.09,
      duration: 0.65,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const TOOLS = [
  { name: "Illustrator",   icon: "★", color: "#f97316", level: 90 },
  { name: "Figma",         icon: "◈", color: "#a855f7", level: 75 },
  { name: "Photoshop",     icon: "◉", color: "#3b82f6", level: 80 },
  { name: "After Effects", icon: "◆", color: "#ec4899", level: 70 },
  { name: "Premiere Pro",  icon: "▶", color: "#8b5cf6", level: 60 },
];

const SLOT_WORDS = ["Creative.", "Visual.", "Fluid.", "Bold.", "Kinetic."];
const SLOT_COLORS = ["#a855f7", "#ec4899", "#3b82f6", "#f97316", "#8b5cf6"];

export default function DesignerPage() {
  const [slotIndex, setSlotIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlotIndex((state) => (state + 1) % SLOT_WORDS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <PageEntryOverlay />
      <CustomCursor />
      <main className="min-h-screen bg-[#fafafa] text-neutral-900 overflow-x-hidden">

        {/* ── Ambient blobs ── */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute w-[700px] h-[700px] rounded-full top-[-20%] left-[-15%] bg-gradient-to-br from-purple-300/30 via-pink-300/20 to-transparent blur-[120px]" />
          <div className="absolute w-[500px] h-[500px] rounded-full bottom-[-15%] right-[-10%] bg-gradient-to-tl from-indigo-300/25 via-cyan-300/15 to-transparent blur-[100px]" />
        </div>

        {/* ── NAV ── */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-30 flex justify-between items-center px-8 py-5 bg-white/60 backdrop-blur-lg border-b border-neutral-200/50"
        >
          <span className="text-xl font-black tracking-tighter text-gradient-des">aman.design</span>
          <div className="flex items-center gap-6">
            <a href="#tools" className="text-xs text-neutral-400 hover:text-purple-500 transition-colors hidden md:inline">tools</a>
            <a
              href="https://linkedin.com/in/aman-shukla-691436297"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-purple-500 transition-colors"
            >
              LinkedIn
            </a>
            <Link
              href="/"
              className="text-xs text-neutral-500 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-400 px-3 py-1.5 rounded-full transition-all"
            >
              ← Switch Persona
            </Link>
          </div>
        </motion.nav>

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-20 space-y-32">

          {/* ── HERO ── */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[520px]">
            {/* Left — text */}
            <div>
              <motion.div
                custom={0} variants={fadeUp} initial="hidden" animate="show"
                className="inline-flex items-center gap-2 text-xs text-purple-500 bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-full mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                UI/UX · Branding · Art Direction
              </motion.div>

              <div className="overflow-hidden mb-8">
                <motion.h1
                  custom={1} variants={fadeUp} initial="hidden" animate="show"
                  className="text-5xl md:text-[clamp(3.5rem,7vw,6.5rem)] font-black tracking-tighter leading-[1.05]"
                >
                  I design <br className="hidden sm:block" />
                  <span className="relative inline-flex h-[1.1em] overflow-hidden w-full sm:w-[340px] md:w-[480px] align-bottom">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={SLOT_WORDS[slotIndex]}
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -80, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute left-0 bottom-0"
                        style={{ color: SLOT_COLORS[slotIndex] }}
                      >
                        {SLOT_WORDS[slotIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <br className="block sm:hidden" />
                  experiences.
                </motion.h1>
              </div>

              <motion.p
                custom={2} variants={fadeUp} initial="hidden" animate="show"
                className="text-neutral-500 max-w-lg text-lg font-light leading-relaxed mb-10"
              >
                Crafting digital spaces where engineering meets aesthetics. From cohesive brand systems
                to bold interactive layouts, I build interfaces that feel as good as they look.
              </motion.p>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3">
                <a
                  href="mailto:amanshukla200521@gmail.com"
                  className="text-sm bg-neutral-900 hover:bg-neutral-700 text-white px-6 py-3 rounded-full transition-all shadow-sm"
                >
                  Get in touch
                </a>
              </motion.div>
            </div>

            {/* Right — 3D gem */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="show"
              className="relative w-full h-[420px] lg:h-[520px] hidden sm:block"
            >
              <DesignerGem color={SLOT_COLORS[slotIndex]} />
            </motion.div>
          </section>

          {/* ── PORTFOLIO WORK ── */}
          <section id="work">
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-10"
            >
              <p className="text-xs text-neutral-400 tracking-widest uppercase mb-1">Selected Work</p>
              <h2 className="text-4xl font-black tracking-tight">Portfolio</h2>
            </motion.div>
            <PortfolioGrid />
            <motion.div 
              className="mt-16 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <a
                href="https://drive.google.com/file/d/1G11TioRwFnQdCxfQ3xxFTo_5pEI1jj1k/view?usp=sharing"
                target="_blank" rel="noopener noreferrer"
                className="text-sm shadow-sm bg-white border border-neutral-200 hover:border-purple-300 text-neutral-600 hover:text-purple-600 px-8 py-3.5 rounded-full transition-all"
              >
                See More Work ↗
              </a>
            </motion.div>
          </section>

          {/* ── TOOLS ── */}
          <section id="tools">
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-xs text-neutral-400 tracking-widest uppercase mb-1">Arsenal</p>
              <h2 className="text-4xl font-black tracking-tight">Tools & Software</h2>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
              {TOOLS.map((t, i) => {
                const radius = 36;
                const circ = 2 * Math.PI * radius;
                const dash = (t.level / 100) * circ;
                return (
                  <motion.div
                    key={t.name}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    whileHover={{ y: -6, scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white border border-neutral-100 rounded-3xl p-5 shadow-sm flex flex-col items-center gap-3 cursor-default"
                  >
                    {/* Arc ring */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90 absolute inset-0">
                        {/* Track */}
                        <circle
                          cx="48" cy="48" r={radius}
                          fill="none"
                          stroke="#f3f4f6"
                          strokeWidth="7"
                          strokeLinecap="round"
                        />
                        {/* Fill */}
                        <motion.circle
                          cx="48" cy="48" r={radius}
                          fill="none"
                          stroke={t.color}
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeDasharray={circ}
                          initial={{ strokeDashoffset: circ }}
                          whileInView={{ strokeDashoffset: circ - dash }}
                          transition={{ duration: 1.2, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                          viewport={{ once: true }}
                        />
                      </svg>
                      {/* Icon + percent */}
                      <div className="flex flex-col items-center z-10">
                        <span className="text-xl" style={{ color: t.color }}>{t.icon}</span>
                        <span className="text-xs font-black tracking-tight" style={{ color: t.color }}>{t.level}%</span>
                      </div>
                    </div>
                    <span className="font-semibold text-xs text-neutral-600 text-center">{t.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ── EXPERIENCE ── */}
          <section>
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="mb-12"
            >
              <p className="text-xs text-neutral-400 tracking-widest uppercase mb-1">Career</p>
              <h2 className="text-4xl font-black tracking-tight">Experience</h2>
            </motion.div>

            <div className="space-y-5">
              {[
                {
                  role: "Visual Design Intern",
                  company: "ExploreiT Nextgen Solutions",
                  location: "Pune",
                  period: "Jun 2025 – Aug 2025",
                  accent: "#a855f7",
                  points: [
                    "Designed client-facing presentations, proposals, and booklets using Figma and Illustrator.",
                    "Ensured accuracy and timely delivery across all client deliverables.",
                    "Enhanced internal operations and branding through creative, detail-oriented design solutions.",
                  ],
                },
                {
                  role: "Graphic Design & Video Editing Intern",
                  company: "Unarrow Digital Solutions",
                  location: "Mumbai",
                  period: "Aug 2024 – Sep 2024",
                  accent: "#ec4899",
                  points: [
                    "Assisted in creating visual content for marketing campaigns.",
                    "Collaborated with the design team to develop branding materials.",
                    "Ensured timely delivery of projects while maintaining quality standards.",
                  ],
                },
                {
                  role: "Graphic Design Intern",
                  company: "Recon Marketing",
                  location: "Mumbai",
                  period: "Feb 2024 – Apr 2024",
                  accent: "#f97316",
                  points: [
                    "Created graphic assets and visual content for marketing campaigns.",
                    "Supported the creative team in developing branded materials.",
                    "Delivered design work within deadlines to a high visual standard.",
                  ],
                },
                {
                  role: "Freelance Graphic Designer & Video Editor",
                  company: "Self-employed",
                  location: "",
                  period: "Ongoing",
                  accent: "#6366f1",
                  points: [
                    "Created engaging graphic designs and video content for various clients.",
                    "Managed multiple projects simultaneously while meeting tight deadlines.",
                    "Communicated regularly with clients to ensure their vision was achieved.",
                  ],
                },
              ].map((exp, i) => (
                <motion.div
                  key={exp.company + exp.role}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-1 self-stretch rounded-full shrink-0 mt-1"
                        style={{ backgroundColor: exp.accent }}
                      />
                      <div>
                        <h3 className="text-base font-bold text-neutral-900">{exp.role}</h3>
                        <p className="text-sm font-medium mt-0.5" style={{ color: exp.accent }}>
                          {exp.company}
                          {exp.location && <span className="text-neutral-400 font-normal"> · {exp.location}</span>}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-neutral-400 font-light border border-neutral-100 px-3 py-1 rounded-full w-fit shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5 pl-4">
                    {exp.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-neutral-500 font-light">
                        <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: exp.accent }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── ABOUT ── */}
          <motion.section
            custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <p className="text-xs text-neutral-400 tracking-widest uppercase mb-4">About</p>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
                Design is thinking<br />made <span className="text-gradient-des">visual.</span>
              </h3>
              <p className="text-neutral-500 leading-relaxed font-light mb-4">
                I bridge the gap between engineering and aesthetics by building interfaces that
                feel as good as they look. From branding systems to social campaigns, I craft
                with intention and precision.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Projects", value: "10+" },
                { label: "Internships", value: "3" },
                { label: "Tools", value: "5+" },
                { label: "Location", value: "Pune, IN" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm"
                >
                  <div className="text-2xl font-black tracking-tighter text-gradient-des">{s.value}</div>
                  <div className="text-xs text-neutral-400 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── CONTACT ── */}
          <section className="text-center pb-12 pt-8">
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <p className="text-xs text-neutral-400 tracking-widest uppercase mb-4">Let&apos;s Work Together</p>
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-3 leading-tight">
                Have a project<br />in <span className="text-gradient-des">mind?</span>
              </h3>
              <p className="text-neutral-500 mb-10 font-light max-w-md mx-auto">
                Open to freelance design work, creative collaborations, and exciting opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:amanshukla200521@gmail.com"
                  className="text-sm bg-neutral-900 hover:bg-neutral-700 text-white px-8 py-3.5 rounded-full transition-all"
                >
                  Get in touch →
                </a>
                <a
                  href="https://linkedin.com/in/aman-shukla-691436297"
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm border border-neutral-200 hover:border-purple-300 text-neutral-600 hover:text-purple-600 px-8 py-3.5 rounded-full transition-all"
                >
                  LinkedIn ↗
                </a>
              </div>
            </motion.div>
          </section>

        </div>
      </main>
    </>
  );
}
