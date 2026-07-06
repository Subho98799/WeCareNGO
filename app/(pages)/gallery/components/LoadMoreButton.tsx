"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function LoadMoreButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      className="flex justify-center pt-8 pb-12"
    >
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.04em] text-[var(--ink)] transition-all duration-300 hover:border-[var(--leaf)] hover:text-[var(--leaf)] hover:shadow-sm disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--leaf)] border-t-transparent" />
            Loading
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Load More
            <ChevronDown size={16} />
          </span>
        )}
      </button>
    </motion.div>
  );
}
