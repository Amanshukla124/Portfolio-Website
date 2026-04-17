"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { GithubRepo } from "@/lib/github";

const LANG_COLORS: Record<string, string> = {
  Python: "#3776ab",
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  HTML: "#e34f26",
  CSS: "#1572b6",
  "Jupyter Notebook": "#da5b0b",
};

export default function GitHubRepos({ repos }: { repos: GithubRepo[] }) {
  if (!repos.length) return null;

  return (
    <section>
      <h2 className="text-xs text-green-600 tracking-widest mb-6 uppercase font-mono">
        # GitHub Repositories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo, i) => {
          const langColor = repo.language ? (LANG_COLORS[repo.language] ?? "#888") : "#444";
          return (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              whileHover={{ y: -4, borderColor: "rgba(57,255,20,0.25)" }}
              className="group bg-[#0d0d0d] border border-neutral-800/80 rounded-xl p-4 flex flex-col gap-3 hover:bg-[#0f0f0f] transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-green-300 transition-colors">
                  {repo.name}
                </h3>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-700 group-hover:text-neutral-400 shrink-0 mt-0.5 transition-colors" />
              </div>

              <p className="text-xs text-neutral-600 leading-5 line-clamp-2 flex-1">
                {repo.description ?? "No description provided."}
              </p>

              <div className="flex items-center gap-4 text-[10px] text-neutral-600 font-mono">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: langColor }}
                    />
                    {repo.language}
                  </span>
                )}
                <span>★ {repo.stargazers_count}</span>
                <span className="ml-auto text-neutral-800">
                  {new Date(repo.updated_at).toLocaleDateString("en-IN", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
