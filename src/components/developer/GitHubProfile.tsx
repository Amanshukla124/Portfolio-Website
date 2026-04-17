"use client";
import { motion } from "framer-motion";
import type { GithubUser } from "@/lib/github";
import { Users, BookOpen, Briefcase } from "lucide-react";

interface Props {
  user: GithubUser | null;
}

const STATIC_STATS = [
  { label: "Projects Built", value: "3+", icon: BookOpen },
  { label: "Internships", value: "1", icon: Briefcase },
  { label: "GPA", value: "8.5", icon: null },
];

export default function GitHubProfile({ user }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {user && (
        <>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-4 flex flex-col gap-1"
          >
            <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              Public Repos
            </span>
            <span className="text-2xl font-black text-white">{user.public_repos}</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-4 flex flex-col gap-1"
          >
            <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest flex items-center gap-1">
              <Users className="w-3 h-3" />
              Followers
            </span>
            <span className="text-2xl font-black text-white">{user.followers}</span>
          </motion.div>
        </>
      )}

      {STATIC_STATS.map((s, i) => (
        <motion.div
          key={s.label}
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-[#0d0d0d] border border-neutral-800 rounded-xl p-4 flex flex-col gap-1"
        >
          <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest">
            {s.label}
          </span>
          <span className="text-2xl font-black text-green-400">{s.value}</span>
        </motion.div>
      ))}
    </div>
  );
}
