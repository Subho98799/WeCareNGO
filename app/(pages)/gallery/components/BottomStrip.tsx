"use client";

import { motion } from "framer-motion";
import { Camera, Heart, Users } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const items = [
  {
    icon: Camera,
    label: "Real moments",
    sub: "Captured in the field",
  },
  {
    icon: Heart,
    label: "Real impact",
    sub: "Stories that matter",
  },
  {
    icon: Users,
    label: "Real people",
    sub: "Lives we touch every day",
  },
];

export default function BottomStrip() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp}
          className="grid grid-cols-3 gap-4 rounded-[1.6rem] bg-white px-6 py-8 quiet-shadow sm:px-10"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="text-center">
                <Icon size={22} className="mx-auto text-[var(--leaf)]" />
                <p className="mt-2 text-sm font-extrabold text-[var(--ink)]">
                  {item.label}
                </p>
                <p className="mt-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[#8a928a] sm:text-xs">
                  {item.sub}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
