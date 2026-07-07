"use client";

import { motion } from "framer-motion";

export default function GalleryHero() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div
        className="mx-auto flex max-w-7xl flex-col justify-center"
        style={{ minHeight: "220px", maxHeight: "260px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-3 text-[0.55rem] font-black uppercase tracking-[0.18em] text-[#8a928a]">
            Gallery
          </p>
          <h1 className="text-[clamp(2rem,4.5vw,3.6rem)] font-[720] leading-[0.92] tracking-tight">
            Moments that{" "}
            <span className="italic font-serif font-normal tracking-tight">
              inspire change
            </span>
          </h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-[#5a665e]">
            A collection of moments from classrooms, communities and volunteers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
