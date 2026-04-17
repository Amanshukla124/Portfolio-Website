// Pure data — no client/server directive, safe to import from either
export interface Project {
  name: string;
  description: string;
  stack: string[];
  date: string;
  accentColor: string;
  highlights: string[];
  githubRepo?: string;
  liveUrl?: string;
}

export const STATIC_PROJECTS: Project[] = [
  {
    name: "HireSense",
    description:
      "AI-powered recruitment platform that tailors resumes, generates cover letters, and automates job application tracking using OpenAI. Built with Flask and deployed on Vercel.",
    stack: ["Python (Flask)", "OpenAI API", "SQLite", "JavaScript", "Vercel"],
    date: "2024 – 2025",
    accentColor: "#00e5ff",
    highlights: [
      "AI resume tailoring against job descriptions",
      "Automated cover letter generation",
      "Google OAuth authentication",
      "PDF export of tailored documents",
    ],
    githubRepo: "https://github.com/Amanshukla124",
    liveUrl: "https://hiresense-five.vercel.app/",
  },
  {
    name: "Cambio",
    description:
      "AI-Powered Voucher Exchange Platform — a full-stack web app with Flask, SQLite, & JavaScript. Features a rule-based dynamic pricing engine for credit valuation based on voucher value and expiry.",
    stack: ["Python (Flask)", "SQLite", "Tailwind CSS", "JavaScript"],
    date: "Dec 2025 – Feb 2026",
    accentColor: "#39ff14",
    highlights: [
      "Session-based authentication flow",
      "Rule-based dynamic pricing engine",
      "Real-time credit previews & animated transaction flows",
      "Dashboard analytics",
    ],
    githubRepo: "https://github.com/Amanshukla124",
  },
  {
    name: "Network Visualizer",
    description:
      "Real-time network scanning tool using ping sweep and ARP resolution. Designed an interactive web UI similar to ShareIt/Xender interfaces to categorize and display connected devices.",
    stack: ["Python", "HTML", "CSS", "JavaScript"],
    date: "Jan – Mar 2025",
    accentColor: "#f97316",
    highlights: [
      "Ping sweep & ARP resolution",
      "Python multithreading for performance",
      "Pathfinding & graph traversal logic",
      "Interactive device-map UI",
    ],
    githubRepo: "https://github.com/Amanshukla124",
  },
  {
    name: "Follow Up AI",
    description:
      "Smart follow-up assistant that drafts personalized follow-up emails and reminders for job applications, meetings, and networking conversations using AI-generated context awareness.",
    stack: ["React", "Next.js", "OpenAI API", "TypeScript"],
    date: "2025",
    accentColor: "#bf5fff",
    highlights: [
      "AI-drafted contextual follow-up emails",
      "Job application tracker integration",
      "Scheduling & reminder system",
      "Clean, responsive Next.js UI",
    ],
    githubRepo: "https://github.com/Amanshukla124",
    liveUrl: "https://follow-up-ai-chi.vercel.app",
  },
];
