"use client";
import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork, Globe } from "lucide-react";
import type { GithubRepo } from "@/lib/github";
import type { Project } from "@/lib/projects";

function TagBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border"
      style={{
        borderColor: color + "44",
        backgroundColor: color + "12",
        color: color,
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project, index, repo }: { project: Project; index: number; repo?: GithubRepo | null }) {
  const accent = project.accentColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group relative bg-[#0d0d0d] border border-neutral-800/80 rounded-2xl p-6 flex flex-col gap-5 overflow-hidden transition-colors"
      style={{ ["--accent" as string]: accent }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 40px ${accent}0d, 0 0 40px ${accent}08` }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="text-lg font-bold text-white tracking-tight group-hover:transition-colors duration-300"
            style={{ ["--tw-text-opacity" as string]: "1" }}
          >
            <motion.span
              className="transition-colors duration-300"
              style={{ color: "inherit" }}
              whileHover={{ color: accent }}
            >
              {project.name}
            </motion.span>
          </h3>
          <p className="text-xs text-neutral-600 mt-0.5 font-mono">{project.date}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {repo && (
            <>
              <span className="flex items-center gap-1 text-[10px] text-neutral-600">
                <Star className="w-3 h-3" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-neutral-600">
                <GitFork className="w-3 h-3" />
                {repo.forks_count}
              </span>
            </>
          )}
          {project.githubRepo && (
            <a
              href={project.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-white transition-colors"
              aria-label={`View ${project.name} on GitHub`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-white transition-colors"
              aria-label={`Live site for ${project.name}`}
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-500 text-sm leading-6">{project.description}</p>

      {/* Highlights */}
      <ul className="space-y-1.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs text-neutral-500">
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent }} />
            {h}
          </li>
        ))}
      </ul>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2 pt-1">
        {project.stack.map((s) => (
          <TagBadge key={s} label={s} color={accent} />
        ))}
      </div>

      {/* Bottom accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
        style={{ backgroundColor: accent }}
      />
    </motion.div>
  );
}

export type { Project };
export default ProjectCard;
