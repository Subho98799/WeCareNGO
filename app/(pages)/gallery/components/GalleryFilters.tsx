"use client";

import { motion } from "framer-motion";

const categories = [
  "All",
  "Children",
  "Education",
  "Women Empowerment",
  "Community",
  "Events",
  "Animals",
];

export default function GalleryFilters({
  active,
  onChange,
}: {
  active: string;
  onChange: (cat: string) => void;
}) {
  return (
    <section className="px-4 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onChange(cat)}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] transition-all duration-300 ${
                active === cat
                  ? "bg-[var(--leaf)] text-white shadow-sm"
                  : "border border-black/10 bg-white text-[#4f5d54] hover:border-black/20 hover:bg-[#f8f9f6]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
