"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tag: string;
  accent: string;
  cover: string;
  images: string[];
  qrCode?: string;
  logos?: string[];
  year?: string;
  objectFit?: "cover" | "contain";
}

/* ─────────────────────────────────────────────
   Project data
───────────────────────────────────────────── */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "project-1",
    title: "Lazy Tom",
    description: "Created as part of an internship assignment for Lazy Tom, this project explores the brand's core identity through curated color palettes and cohesive visual language. The deliverables maintain a playful yet professional aesthetic across diverse dynamic compositions.",
    tag: "Branding",
    accent: "#a855f7",
    cover: "/portfolio/lazytom/Untitled-1-05.png",
    images: [
      "/portfolio/lazytom/Untitled-1-01.png",
      "/portfolio/lazytom/Untitled-1-02.png",
      "/portfolio/lazytom/Untitled-1-03.png",
      "/portfolio/lazytom/Untitled-1-08.png",
      "/portfolio/lazytom/Untitled-1-04.png",
      "/portfolio/lazytom/Untitled-1-06.png",
      "/portfolio/lazytom/Untitled-1-07.png",
      "/portfolio/lazytom/Untitled-1-09.png",
    ],
  },
  {
    id: "project-2",
    title: "Designers Bazaar",
    description: "A series of high-engagement social media posts designed for 'Designers Bazaar', highlighting digital presence strategies, web design tips, and promotional creatives. The goal was to maintain a dynamic and consistent visual language across multiple carousels.",
    tag: "Social Media",
    accent: "#ec4899",
    cover: "/portfolio/websiteweek/Untitled design (5).png",
    images: [
      "/portfolio/websiteweek/Untitled design (3).png",
      "/portfolio/websiteweek/brand awareness-02.png",
      "/portfolio/websiteweek/client-02.png",
      "/portfolio/websiteweek/client-03.png",
      "/portfolio/websiteweek/Web awareness post-01.png",
      "/portfolio/websiteweek/Untitled design (4).png"
    ],
  },
  {
    id: "project-3",
    title: "Pune Metro Vision",
    description: "Prototype visuals crafted using AI image generation tools, created to envision the interiors and public spaces of the upcoming Pune Metro station. Each image explores architectural mood, materiality, and commuter experience before a single wall is built.",
    tag: "AI Visualization",
    accent: "#f97316",
    cover: "/portfolio/project4/metro wall image-01.png",
    images: [
      "/portfolio/project4/db 2-01.png",
      "/portfolio/project4/digital board-01.png",
      "/portfolio/project4/electric-01.png",
      "/portfolio/project4/prc-01.png",
      "/portfolio/project4/Untitled-1-01.png",
      "/portfolio/project4/metro wall 2-01.png",
    ],
    objectFit: "cover",
    year: "2025",
  },
  {
    id: "project-4",
    title: "College Magazine",
    description: "Designed as part of the editorial board for the college's annual magazine. Featuring clean typography, dynamic layouts, and engaging editorial content.",
    tag: "Editorial",
    accent: "#f59e0b",
    cover: "/portfolio/magazine/cover.png",
    images: [
      "/portfolio/magazine/1.png",
      "/portfolio/magazine/2.png",
      "/portfolio/magazine/3.png"
    ],
    qrCode: "/portfolio/magazine/4.png",
    year: "2024",
  },
  {
    id: "project-5",
    title: "Focus Brand Identity",
    description: "Logo and business card design for the brand Focus. Executed creative visual concepts while maintaining strict project deadlines.",
    tag: "Branding",
    accent: "#8b5cf6",
    cover: "/portfolio/focus/card-01.png",
    logos: [
      "/portfolio/focus/black-01.png",
      "/portfolio/focus/white-01.png",
      "/portfolio/focus/white 2-01.png",
    ],
    images: [
      "/portfolio/focus/intoror-01.png",
      "/portfolio/focus/intoror white-01.png",
      "/portfolio/focus/focus 1.png",
      "/portfolio/focus/focus 2.png",
    ],
    objectFit: "cover",
    year: "2023",
  },
  {
    id: "project-6",
    title: "Non Commissioned",
    description: "An unfiltered collection of non-commissioned, self-driven poster designs and visual experiments. These pieces serve as a creative sandbox showcasing my passion for visual arts, typography, and raw aesthetics beyond client briefs.",
    tag: "Self Work",
    accent: "#06b6d4",
    cover: "/portfolio/selfwork/BAPE.jpg",
    images: [
      "/portfolio/selfwork/CMIYGL.jpg",
      "/portfolio/selfwork/IGOR-01.png",
      "/portfolio/selfwork/FLOWER BOY-01.png",
      "/portfolio/selfwork/SAMBA.png",
      "/portfolio/selfwork/LUNCH BREAK.jpg",
      "/portfolio/selfwork/TYSON-01.png",
      "/portfolio/selfwork/RUNNING OUT OF TIME.png",
      "/portfolio/selfwork/GKMC.png",
    ],
    year: "2024",
  },
];

/* ─────────────────────────────────────────────
   Responsive Bento Layout Map
───────────────────────────────────────────── */
export const BENTO_LAYOUTS = [
  "col-span-2 row-span-1 md:row-span-2 aspect-[1/1]",                                              // 1. Lazy Tom (Square) — col 1-2, row 1
  "col-span-2 row-span-1 md:row-span-2 md:col-start-1 md:row-start-3 -mt-16 md:-mt-32 aspect-[4/5] md:aspect-[4/5]", // 2. Website Week — col 1-2, row 3 (pulled up)
  "col-span-2 md:col-start-3 md:row-start-1 aspect-[16/9]",                                        // 3. Metro Wall — col 3-4, top (16:9)
  "col-span-2 row-span-2 md:row-span-2 md:col-start-3 md:row-start-2 aspect-[3/4] md:aspect-[3/4]", // 4. College Magazine — col 3-4, below Metro Wall
  "col-span-2 md:col-start-1 md:row-start-5 -mt-16 md:-mt-40 aspect-[16/9]",                        // 5. Focus (Project 5) — col 1-2, bottom left (pulled up)
  "col-span-2 md:row-span-2 md:col-start-3 md:row-start-4 aspect-[1/1]",                           // 6. Project 6 — col 3-4, pulled up
];

/* ─────────────────────────────────────────────
   Behance-style case study panel
───────────────────────────────────────────── */
function BehancePanel({
  project,
  onClose,
}: {
  project: PortfolioProject;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasImages = project.images.length > 0;

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Metadata rows for the sidebar
  const meta = [
    { label: "Category", value: project.tag },
    { label: "Year",     value: project.year || "2025" },
    ...(hasImages ? [{ label: "Photos", value: String(project.images.length) }] : []),
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Dim backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        style={{ backdropFilter: "blur(5px)" }}
      />

      {/* Centered modal — scale in */}
      <motion.div
        className="relative z-10 w-full max-w-4xl flex flex-col overflow-hidden rounded-2xl"
        style={{
          background: "#0e0e0e",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          maxHeight: "90vh",
        }}
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 380, damping: 36, mass: 0.7 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          className="shrink-0 flex items-center justify-between px-7 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide"
              style={{ background: `${project.accent}25`, color: project.accent }}
            >
              {project.tag}
            </span>
            <h2 className="text-white font-black text-lg tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            ✕
          </button>
        </div>

        {/* ── Two-column body ── */}
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>

          {/* LEFT — sticky metadata sidebar */}
          <div
            className="w-48 shrink-0 flex flex-col gap-8 px-7 py-8"
            style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* Accent bar */}
            <div className="w-7 h-[2px] rounded-full" style={{ background: project.accent }} />

            {/* Meta tiles */}
            <div className="flex flex-col gap-6">
              {meta.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1">
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    {label}
                  </p>
                  <p className="text-white text-sm font-bold tracking-tight">{value}</p>
                </div>
              ))}
            </div>

            {/* Scroll hint at bottom */}
            <div className="mt-auto flex flex-col gap-2">
              <div className="w-4 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
              <p
                className="text-[9px] uppercase tracking-[0.12em] font-medium"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Scroll to explore
              </p>
            </div>
          </div>

          {/* RIGHT — scrollable image feed */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden"
          >
            {hasImages ? (
              <div className="flex flex-col">
                {/* Cover image — clean, plain */}
                <img
                  src={project.cover || project.images[0]}
                  alt={project.title}
                  className="w-full h-auto block"
                />

                {/* Editorial Description Block */}
                {project.description && (
                  <div className="px-10 py-20 flex flex-col items-center text-center bg-neutral-950">
                    <p className="text-white/80 text-lg leading-loose max-w-2xl font-light">
                      {project.description}
                    </p>
                    
                    {project.qrCode && (
                      <div className="mt-8 flex flex-col items-center">
                        <p className="text-[10px] text-white/50 mb-3 uppercase tracking-widest font-semibold">Scan to view</p>
                        <div className="p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                          <img src={project.qrCode} alt="Scan QR Code" className="w-32 h-32 rounded-xl object-contain" />
                        </div>
                      </div>
                    )}

                    {project.logos && project.logos.length > 0 && (
                      <div className="mt-12 flex justify-center gap-3 sm:gap-6 w-full max-w-2xl px-4">
                        {project.logos.map((logo, idx) => (
                          <div key={idx} className="flex-1 max-w-[160px] p-2 sm:p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center aspect-square">
                            <img src={logo} alt={`Logo variation ${idx + 1}`} className="w-full h-full rounded-xl object-contain" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div 
                      className="w-16 h-[2px] mt-10 rounded-full" 
                      style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }} 
                    />
                  </div>
                )}

                {/* Rest of images — lazy loaded */}
                {project.images.map((src, i) => (
                  <LazyImage
                    key={src}
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    index={i}
                  />
                ))}

                {/* End of project */}
                <div className="py-10 flex flex-col items-center gap-3">
                  <div className="w-6 h-px" style={{ background: project.accent + "50" }} />
                  <p
                    className="text-[10px] tracking-widest uppercase"
                    style={{ color: "rgba(255,255,255,0.12)" }}
                  >
                    End of project
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4" style={{ color: "rgba(255,255,255,0.15)" }}>
                <div className="text-4xl">✦</div>
                <p className="text-xs tracking-widest uppercase">Images coming soon</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Lazy image — fades in when it enters viewport
───────────────────────────────────────────── */
function LazyImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(index < 2); // pre-show first 2

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} className="w-full bg-neutral-900">
      {visible ? (
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-auto block"
          decoding="async"
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        />
      ) : (
        /* Skeleton placeholder keeps layout stable */
        <div className="w-full" style={{ aspectRatio: "4/3", background: "#1a1a1a" }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Single project card
───────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  layoutClass,
  onOpen,
}: {
  project: PortfolioProject;
  index: number;
  layoutClass: string;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.08,
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer ${layoutClass}`}
      style={{
        background: `linear-gradient(135deg, ${project.accent}18 0%, ${project.accent}08 100%)`,
        border: "1.5px solid rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? `0 24px 60px ${project.accent}28, 0 4px 16px rgba(0,0,0,0.08)`
          : "0 2px 16px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Cover image */}
      {project.cover ? (
        <motion.img
          src={project.cover}
          alt={project.title}
          className={`absolute inset-0 w-full h-full ${project.objectFit === "contain" ? "object-contain" : "object-cover"}`}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ) : (
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 70% at 60% 40%, ${project.accent}30 0%, ${project.accent}10 60%, transparent 100%)`,
          }}
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.55 }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-20 blur-2xl"
            style={{ background: project.accent }}
          />
          <div
            className="absolute top-8 right-8 text-5xl opacity-15 font-black tracking-tighter"
            style={{ color: project.accent }}
          >
            ✦
          </div>
        </motion.div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)",
          opacity: hovered ? 1 : 0.75,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Tag */}
      <div className="absolute top-4 left-4">
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md"
          style={{ background: `${project.accent}cc`, color: "#fff", letterSpacing: "0.03em" }}
        >
          {project.tag}
        </span>
      </div>

      {/* Hover badge */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
          >
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25">
              View ↗
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.h3
          className="text-xl font-black text-white tracking-tight leading-tight mb-1.5"
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-sm text-white/70 font-light leading-snug line-clamp-2"
          animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export default function PortfolioGrid({
  projects = PORTFOLIO_PROJECTS,
}: {
  projects?: PortfolioProject[];
}) {
  const [open, setOpen] = useState<PortfolioProject | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 w-full">
        {projects.map((p, i) => (
          <ProjectCard 
            key={p.id} 
            project={p} 
            index={i} 
            layoutClass={BENTO_LAYOUTS[i % BENTO_LAYOUTS.length]}
            onOpen={() => setOpen(p)} 
          />
        ))}
      </div>

      <AnimatePresence>
        {open && <BehancePanel project={open} onClose={close} />}
      </AnimatePresence>
    </>
  );
}
