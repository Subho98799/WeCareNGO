"use client";

import { motion } from "framer-motion";
import type { CuratedEntry } from "@/content/curated-gallery";
import EditorialCard from "./EditorialCard";

const aspects = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[1/1]",
  "aspect-[16/9]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[16/9]",
  "aspect-[1/1]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[16/9]",
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export default function EditorialGrid({
  items,
  onOpen,
}: {
  items: CuratedEntry[];
  onOpen: (index: number) => void;
}) {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.src}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 12) * 0.04 }}
            >
              <EditorialCard
                item={item}
                onClick={() => onOpen(i)}
                aspectClass={aspects[i % aspects.length]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
