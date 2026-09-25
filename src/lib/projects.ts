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
    name: "Workloom",
    description:
      "AI-powered enterprise workflow automation platform that converts organizational knowledge and SOPs into executable workflows with conditions, approvals, and automated actions.",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Ollama",
      "RAG",
      "AI/LLMs",
    ],
    date: "April 2026 – Present",
    accentColor: "#39ff14",
    highlights: [
      "Built an AI-powered platform that converts organizational knowledge and SOPs into executable workflows with conditions, approvals, and automated actions",
      "Developed a reusable workflow engine supporting branching, human approvals, pause/resume execution, and auditable state",
      "Implemented real-time execution visibility and employee-centric workflows, enabling organizations to track automation progress and human decision points",
    ],
    githubRepo: "https://github.com/Amanshukla124",
  },
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
