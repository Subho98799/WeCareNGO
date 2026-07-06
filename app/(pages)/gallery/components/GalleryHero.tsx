"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

export default function GalleryHero() {
  return (
    <section className="px-4 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          style={{ maxHeight: "300px" }}
        >
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
              <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
              Gallery
            </p>
            <h1 className="text-[clamp(2.4rem,5.5vw,4.8rem)] font-[720] leading-[0.92]">
              Moments that{" "}
              <span className="italic font-serif font-normal tracking-tight">
                inspire change
              </span>
            </h1>
          </div>
          <p className="max-w-sm text-base leading-7 text-[#5a665e] lg:text-right lg:pb-2">
            A glimpse into the lives we touch, the communities we serve, and the
            stories we create together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
