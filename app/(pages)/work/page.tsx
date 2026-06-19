"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { programs } from "@/content/site-content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
      <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
      {children}
    </div>
  );
}

function WorkSection() {
  return (
    <section id="work" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="max-w-3xl">
          <SectionLabel>The work</SectionLabel>
          <h2 className="text-[clamp(2.4rem,6vw,5.4rem)] font-[720] leading-[0.95]">
            Four ways WeCare turns concern into action.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.06 }}
              tabIndex={0}
              className="group flex min-h-full flex-col overflow-hidden rounded-[1.6rem] border border-black/8 bg-white quiet-shadow transition duration-500 hover:-translate-y-2 hover:border-[var(--leaf)]/30 hover:shadow-[0_28px_70px_rgba(30,48,39,0.16)]"
            >
              <div className="relative aspect-[4/4.8] overflow-hidden bg-[#dfe6d6]">
                <Image
                  src={program.image}
                  alt={`${program.title} by WeCare NGO`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/66 via-black/0 to-transparent opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[var(--leaf-deep)]">
                  {program.accent}
                </div>
                <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <p className="rounded-2xl bg-white/92 p-4 text-sm font-bold leading-6 text-[#4f5d54] backdrop-blur">
                    {program.detail}
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-extrabold leading-tight">{program.title}</h3>
                  <span className="rounded-full bg-[#f1c84b]/22 px-3 py-1 text-xs font-black text-[var(--leaf-deep)]">
                    {program.number}
                  </span>
                </div>
                <p className="mt-3 text-sm font-extrabold leading-6 text-[var(--ink)]">{program.short}</p>
                <p className="mt-4 inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--leaf-deep)]">
                  Read more
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <>
      <div className="pt-16 lg:pt-20" />
      <WorkSection />
    </>
  );
}
