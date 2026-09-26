"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  { slug: "workloom", name: "Workloom", stack: "Next.js · TypeScript · AI/LLMs", date: "April 2026 – Present" },
  { slug: "hiresense", name: "HireSense", stack: "Flask · OpenAI · Python", date: "2024 – 2025" },
  { slug: "network-visualizer", name: "Network Visualizer", stack: "Python · HTML · CSS", date: "Jan – Mar 2025" },
  { slug: "followup-ai", name: "Follow Up AI", stack: "React · Next.js · AI", date: "2025" },
];

const HELP_TEXT = [
  { cmd: "help", desc: "Show available commands" },
  { cmd: "about", desc: "About Aman Shukla" },
  { cmd: "show projects", desc: "List all projects" },
  { cmd: "open <project>", desc: "Open project details (e.g. open workloom)" },
  { cmd: "skills", desc: "Display tech stack" },
  { cmd: "contact", desc: "Get contact info" },
  { cmd: "clear", desc: "Clear terminal" },
];

function buildOutput(cmd: string): React.ReactNode {
  const c = cmd.trim().toLowerCase();

  if (c === "help") {
    return (
      <div className="space-y-1">
        <p className="text-green-500 mb-2">Available commands:</p>
        {HELP_TEXT.map((h) => (
          <p key={h.cmd} className="pl-2">
            <span className="text-green-400">{h.cmd}</span>
            <span className="text-neutral-600"> — {h.desc}</span>
          </p>
        ))}
      </div>
    );
  }

  if (c === "about") {
    return (
      <div className="space-y-1">
        <p className="text-green-500">{"// aman_shukla.json"}</p>
        <p className="text-neutral-500">{"{"}</p>
        <p className="pl-4"><span className="text-blue-400">"role"</span><span className="text-neutral-500">: </span><span className="text-amber-300">"Full-Stack Developer"</span><span className="text-neutral-500">,</span></p>
        <p className="pl-4"><span className="text-blue-400">"education"</span><span className="text-neutral-500">: </span><span className="text-amber-300">"B.Tech CS · Bharati Vidyapeeth, Pune · GPA 8.5"</span><span className="text-neutral-500">,</span></p>
        <p className="pl-4"><span className="text-blue-400">"experience"</span><span className="text-neutral-500">: </span><span className="text-amber-300">"Visual Design Intern @ ExploreiT Nextgen"</span><span className="text-neutral-500">,</span></p>
        <p className="pl-4"><span className="text-blue-400">"location"</span><span className="text-neutral-500">: </span><span className="text-amber-300">"Pune, Maharashtra 🇮🇳"</span></p>
        <p className="text-neutral-500">{"}"}</p>
      </div>
    );
  }

  if (c === "show projects") {
    return (
      <div className="space-y-1">
        <p className="text-green-500 mb-2">{"// Projects ("}{PROJECTS.length}{" found)"}</p>
        {PROJECTS.map((p, i) => (
          <p key={p.slug} className="pl-2">
            <span className="text-cyan-400">[{i + 1}]</span>{" "}
            <span className="text-white">{p.name}</span>
            <span className="text-neutral-600"> · {p.stack} · {p.date}</span>
          </p>
        ))}
        <p className="text-neutral-700 mt-1 pl-2">
          Type <span className="text-green-400">open {"<project>"}</span> to view details
        </p>
      </div>
    );
  }

  if (c === "skills") {
    const groups = [
      { label: "Programming & Databases", items: ["Python", "SQL", "RDBMS concepts", "Database Design", "Query Optimization", "TypeScript", "JavaScript"] },
      { label: "Algorithms & Problem Solving", items: ["Data Structures & Algorithms", "Graph Algorithms", "Memory Management Algorithms"] },
      { label: "AI & Productivity Tooling", items: ["LLMs", "RAG / Semantic Retrieval", "OpenAI API", "Copilot-style AI-assisted development", "SQL generation tools"] },
      { label: "Frontend & Web Technologies", items: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML", "CSS", "Responsive & Component-based Design"] },
      { label: "UI/UX & Visual Design", items: ["User Interface Design", "User Experience Principles", "Wireframing", "Interactive Prototyping"] },
    ];
    return (
      <div className="space-y-1">
        <p className="text-green-500 mb-2">{"// skills.json"}</p>
        {groups.map((g) => (
          <p key={g.label} className="pl-2">
            <span className="text-purple-400">{g.label}:</span>{" "}
            <span className="text-amber-300">{g.items.join(", ")}</span>
          </p>
        ))}
      </div>
    );
  }

  if (c === "contact") {
    return (
      <div className="space-y-1">
        <p className="text-green-500 mb-2">{"// contact.json"}</p>
        <p className="pl-2"><span className="text-blue-400">Email:</span> <span className="text-amber-300">amanshukla200521@gmail.com</span></p>
        <p className="pl-2"><span className="text-blue-400">Phone:</span> <span className="text-amber-300">+91 93292 01078</span></p>
        <p className="pl-2"><span className="text-blue-400">GitHub:</span> <span className="text-amber-300">github.com/Amanshukla124</span></p>
        <p className="pl-2"><span className="text-blue-400">LinkedIn:</span> <span className="text-amber-300">linkedin.com/in/aman-shukla-691436297</span></p>
      </div>
    );
  }

  if (c.startsWith("open ")) {
    const arg = c.slice(5).trim();
    const match = PROJECTS.find(
      (p) => p.slug === arg || p.name.toLowerCase().includes(arg)
    );
    if (match) {
      return (
        <div className="space-y-1">
          <p className="text-green-500">{"// Opening "}{match.name}</p>
          <p className="text-neutral-400 pl-2">
            Scroll to <span className="text-green-400">Projects</span> section to view details.
          </p>
        </div>
      );
    }
    return (
      <div className="space-y-1">
        <p className="text-red-400">Error: project "{arg}" not found.</p>
        <p className="text-neutral-600 pl-2">
          Type <span className="text-green-400">show projects</span> to see available projects.
        </p>
      </div>
    );
  }

  if (c === "") return null;

  return (
    <div className="space-y-1">
      <p className="text-red-400">Command not found: <span className="text-neutral-400">{cmd}</span></p>
      <p className="text-neutral-600 pl-2">Type <span className="text-green-400">help</span> to see all commands.</p>
    </div>
  );
}

interface HistoryEntry {
  id: number;
  input: string;
  output: React.ReactNode;
}

let idCounter = 1;

export default function CLISection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: 0, input: "help", output: buildOutput("help") },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Only scroll to bottom when user adds a new command (not on mount)
  useEffect(() => {
    if (history.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (trimmed.toLowerCase() === "clear") {
      setHistory([]);
      setCmdHistory((prev) => [trimmed, ...prev]);
      setCmdIdx(-1);
      setInput("");
      return;
    }
    const output = buildOutput(trimmed);
    if (output !== null) {
      setHistory((prev) => [
        ...prev,
        { id: idCounter++, input: trimmed, output },
      ]);
    }
    if (trimmed) {
      setCmdHistory((prev) => [trimmed, ...prev]);
    }
    setCmdIdx(-1);
    setInput("");
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdIdx - 1, -1);
      setCmdIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    }
  };

  return (
    <div
      className="rounded-2xl bg-[#0a0a0a] border border-neutral-800/80 overflow-hidden cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-neutral-800/80 select-none">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-4 text-xs text-neutral-600 font-mono tracking-widest">
          aman@portfolio ~ zsh
        </span>
      </div>

      {/* Output area */}
      <div className="h-80 overflow-y-auto p-5 font-mono text-xs leading-6 space-y-3">
        <AnimatePresence initial={false}>
          {history.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Command line */}
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-600 select-none shrink-0">aman@portfolio:~$</span>
                <span className="text-white">{entry.input}</span>
              </div>
              {/* Output */}
              <div className="pl-4 text-neutral-400">{entry.output}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-neutral-800/50">
        <span className="text-green-600 font-mono text-xs select-none shrink-0">
          aman@portfolio:~$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder:text-neutral-700 caret-green-400"
          placeholder="Type a command... (try 'help')"
          id="cli-input"
        />
        <motion.span
          className="w-[6px] h-4 bg-green-400 rounded-sm shrink-0"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </div>
  );
}
