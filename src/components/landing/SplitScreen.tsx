"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Persona = "developer" | "designer" | null;

/* ── Dot-grid noise for the dev side ── */
function DevGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#39ff14" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

/* ── Flowing blobs for the designer side ── */
function DesignerBlobs({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)",
          top: "-20%",
          left: "-10%",
        }}
        animate={{ x: active ? 30 : 0, y: active ? -20 : 0, scale: active ? 1.15 : 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
          bottom: "-20%",
          right: "-10%",
        }}
        animate={{ x: active ? -20 : 0, y: active ? 20 : 0, scale: active ? 1.2 : 1 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          top: "30%",
          right: "5%",
        }}
        animate={{ x: active ? -30 : 0, y: active ? -15 : 0, scale: active ? 1.1 : 1 }}
        transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

/* ── Transition overlay ── */
function TransitionOverlay({ persona }: { persona: Persona }) {
  return (
    <motion.div
      key={persona}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        background:
          persona === "developer"
            ? "radial-gradient(circle at center, #050505, #050505)"
            : "radial-gradient(circle at center, #7c3aed, #db2777, #4f46e5)",
      }}
      initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 1 }}
      animate={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}

/* ── Developer Typing text ── */
function TypingText({ lines }: { lines: string[] }) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const currentLine = lines[lineIdx];
    if (charIdx < currentLine.length) {
      timerRef.current = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIdx] = (next[lineIdx] ?? "") + currentLine[charIdx];
          return next;
        });
        setCharIdx((c) => c + 1);
      }, 40 + Math.random() * 30);
    } else {
      timerRef.current = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 120);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [lineIdx, charIdx, lines]);

  return (
    <div className="font-mono text-sm text-green-400 space-y-1">
      {lines.map((line, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-green-600 select-none">{">"}</span>
          <span>{displayed[i] ?? ""}</span>
          {i === lineIdx && lineIdx < lines.length && (
            <motion.span
              className="inline-block w-2 h-4 bg-green-400"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.65, repeat: Infinity, repeatType: "reverse" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main Split Screen ── */
export default function SplitScreen() {
  const router = useRouter();
  const [hovered, setHovered] = useState<Persona>(null);
  const [clicked, setClicked] = useState<Persona>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [devTyped, setDevTyped] = useState(false);

  const handleClick = (persona: Persona) => {
    setClicked(persona);
    setShowOverlay(true);
    setTimeout(() => router.push(`/${persona}`), 900);
  };

  const devLines = ["initializing Aman.dev...", "loading projects", "ready ✓"];

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* ── DEVELOPER SIDE ── */}
      <motion.div
        id="dev-panel"
        className="relative flex-1 bg-[#050505] flex flex-col justify-center items-center overflow-hidden select-none"
        animate={{
          flexGrow: hovered === "developer" ? 1.35 : hovered === "designer" ? 0.65 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={() => { setHovered("developer"); setDevTyped(true); }}
        onMouseLeave={() => setHovered(null)}
        onClick={() => handleClick("developer")}
        data-hover="true"
      >
        <DevGrid />

        {/* Animated border glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none border border-green-500/0"
          animate={{ borderColor: hovered === "developer" ? "rgba(57,255,20,0.15)" : "rgba(57,255,20,0)" }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center max-w-sm">
          {/* Flicker badge */}
          <motion.div
            className="text-xs font-mono text-green-500/60 border border-green-500/20 px-3 py-1 rounded-full"
            animate={{ opacity: [0.6, 1, 0.7, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            SDE · Full-Stack · Systems
          </motion.div>

          <div>
            <motion.h2
              className="text-5xl md:text-6xl font-mono font-black text-white tracking-tighter leading-none mb-3"
              animate={{
                textShadow: hovered === "developer"
                  ? "0 0 30px rgba(57,255,20,0.4)"
                  : "0 0 0px rgba(57,255,20,0)",
              }}
              transition={{ duration: 0.4 }}
            >
              {"<Dev />"}
            </motion.h2>
            <p className="text-neutral-500 font-mono text-sm leading-relaxed">
              Backend systems · APIs · Problem solving
            </p>
          </div>

          {/* Terminal chip */}
          <AnimatePresence>
            {devTyped && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-xl p-4 text-left"
              >
                <TypingText lines={devLines} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Arrow */}
          <motion.div
            className="text-green-500/40 font-mono text-xs mt-2"
            animate={{ opacity: hovered === "developer" ? 1 : 0, x: hovered === "developer" ? 0 : -6 }}
            transition={{ duration: 0.3 }}
          >
            Click to enter →
          </motion.div>
        </div>
      </motion.div>

      {/* ── DIVIDER ── */}
      <div className="relative z-20 w-px flex-shrink-0">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-neutral-600 to-transparent" />
        {/* Center name badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap flex flex-col items-center gap-2">
          <div
            className="bg-[#0d0d0d] border border-neutral-700 rounded-2xl px-7 py-4"
            style={{ boxShadow: "0 0 32px rgba(168,85,247,0.12), 0 0 60px rgba(57,255,20,0.06)" }}
          >
            <span
              className="text-2xl font-black tracking-tight"
              style={{
                backgroundImage: "linear-gradient(135deg, #a855f7 0%, #ffffff 50%, #39ff14 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Aman Shukla
            </span>
          </div>

        </div>
      </div>

      {/* ── DESIGNER SIDE ── */}
      <motion.div
        id="des-panel"
        className="relative flex-1 bg-[#fafafa] flex flex-col justify-center items-center overflow-hidden select-none"
        animate={{
          flexGrow: hovered === "designer" ? 1.35 : hovered === "developer" ? 0.65 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseEnter={() => setHovered("designer")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => handleClick("designer")}
        data-hover="true"
      >
        <DesignerBlobs active={hovered === "designer"} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center max-w-sm">
          {/* Badge */}
          <motion.div
            className="text-xs font-sans text-purple-500 border border-purple-200 bg-purple-50 px-3 py-1 rounded-full"
            animate={{ scale: hovered === "designer" ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            UI/UX · Visual · Creative
          </motion.div>

          <div>
            <h2
              className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-3 transition-all duration-500"
              style={
                hovered === "designer"
                  ? {
                      backgroundImage: "linear-gradient(135deg, #a855f7, #ec4899)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }
                  : { color: "#111" }
              }
            >
              Design ✦
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Illustrations · Branding · Visual systems
            </p>
          </div>

          {/* Color chips */}
          <AnimatePresence>
            {hovered === "designer" && (
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35 }}
              >
                {["#a855f7", "#ec4899", "#6366f1", "#f97316"].map((c) => (
                  <motion.div
                    key={c}
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: c }}
                    whileHover={{ scale: 1.2 }}
                    layoutId={c}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Arrow */}
          <motion.div
            className="text-purple-400 text-xs mt-2"
            animate={{ opacity: hovered === "designer" ? 1 : 0, x: hovered === "designer" ? 0 : 6 }}
            transition={{ duration: 0.3 }}
          >
            ← Click to enter
          </motion.div>
        </div>
      </motion.div>

      {/* ── Transition Overlay ── */}
      <AnimatePresence>
        {showOverlay && <TransitionOverlay persona={clicked} />}
      </AnimatePresence>

      {/* ── Scroll hint ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-mono">Choose</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-neutral-500 to-transparent"
          animate={{ scaleY: [1, 1.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
