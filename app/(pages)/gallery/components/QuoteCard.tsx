"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  { text: "Alone we can do so little; together we can do so much.", author: "Helen Keller" },
  { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "No one has ever become poor by giving.", author: "Anne Frank" },
  { text: "Small acts, when multiplied by millions of people, can transform the world.", author: "Unknown" },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

export default function QuoteCard({ index }: { index: number }) {
  const q = quotes[index % quotes.length];
  return (
    <motion.div
      {...fadeUp}
      className="col-span-12 flex flex-col items-center justify-center rounded-[1.4rem] bg-[#f4f1e8] px-8 py-12 text-center"
    >
      <Quote size={28} className="text-[var(--leaf)]/40" />
      <blockquote className="mt-4 max-w-lg text-lg font-extrabold leading-snug text-[var(--ink)]">
        &ldquo;{q.text}&rdquo;
      </blockquote>
      {q.author && (
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[#8a928a]">
          &mdash; {q.author}
        </p>
      )}
    </motion.div>
  );
}
