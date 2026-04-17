"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const BOOT_SEQUENCE = [
  { text: "Booting portfolio v2.0.0...", delay: 0, color: "text-neutral-600" },
  { text: "Loading modules: [react] [next.js] [python] [flask]", delay: 400, color: "text-neutral-600" },
  { text: "Fetching GitHub profile... ✓", delay: 900, color: "text-green-700" },
  { text: "Mounting developer mode... ✓", delay: 1300, color: "text-green-700" },
  { text: "Welcome, Aman Shukla.", delay: 1800, color: "text-green-400" },
];

export function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showContent, setShowContent] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    BOOT_SEQUENCE.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        if (i === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => setShowContent(true), 500);
        }
      }, line.delay);
      timerRefs.current.push(t);
    });

    const blinkTimer = setInterval(() => setCursorBlink((b) => !b), 600);

    return () => {
      timerRefs.current.forEach(clearTimeout);
      clearInterval(blinkTimer);
    };
  }, []);

  return (
    <section>

      {/* Boot terminal box */}
      <div className="bg-[#0a0a0a] border border-neutral-800/80 rounded-2xl overflow-hidden mb-10">
        {/* Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-neutral-800/80">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-4 text-[10px] text-neutral-700 font-mono tracking-widest">boot.sh</span>
        </div>

        {/* Boot output */}
        <div className="p-5 space-y-1.5 font-mono text-xs min-h-[120px]">
          {BOOT_SEQUENCE.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.35 }}
              className={`flex items-center gap-2 ${line.color}`}
            >
              <span className="text-neutral-800 select-none">$</span>
              {line.text}
            </motion.div>
          ))}
          {/* Blinking cursor */}
          {visibleLines.length < BOOT_SEQUENCE.length && (
            <span
              className="inline-block w-2 h-3.5 bg-green-500 ml-5 align-middle"
              style={{ opacity: cursorBlink ? 1 : 0 }}
            />
          )}
        </div>
      </div>

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="space-y-6"
      >
        <div>
          <div className="text-green-500/50 text-xs tracking-widest uppercase mb-3 font-mono">
            // Full-Stack Developer · UI/UX
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            Aman
            <br />
            <span className="text-green-400 text-glow-green">Shukla</span>
          </h1>
        </div>

        <p className="text-neutral-500 max-w-xl text-sm leading-7">
          Full-Stack Developer with expertise in backend engineering, database management, and UI/UX
          design. Building scalable web applications and responsive, user-centric interfaces with a
          focus on performance, clean architecture, and efficient problem-solving.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:amanshukla200521@gmail.com"
            className="text-xs border border-green-500/40 hover:border-green-500 hover:bg-green-500/10 text-green-400 px-5 py-2.5 rounded-xl transition-all"
          >
            send_message()
          </a>
          <a
            href="#cli"
            className="text-xs border border-neutral-800 hover:border-neutral-600 text-neutral-500 hover:text-neutral-300 px-5 py-2.5 rounded-xl transition-all"
          >
            open terminal ↓
          </a>
          <span className="text-neutral-700 text-xs hidden md:inline">
            Pune, MH · +91 93292 01078
          </span>
        </div>
      </motion.div>
    </section>
  );
}
