"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Sparkles, Instagram, ArrowRight } from "lucide-react";
import { brand } from "@/content/brand";
import { gallery } from "@/content/site-content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const className =
    variant === "primary"
      ? "bg-[var(--leaf)] text-white hover:bg-[var(--leaf-deep)]"
      : variant === "secondary"
        ? "bg-white/88 text-[var(--ink)] ring-1 ring-black/10 hover:bg-white"
        : "bg-transparent text-[var(--ink)] hover:bg-black/5";

  return (
    <a
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition ${className}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
      <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
      {children}
    </div>
  );
}

function GallerySection() {
  return (
    <section className="overflow-hidden py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Field notes</SectionLabel>
              <h2 className="text-[clamp(2.2rem,5vw,4.4rem)] font-[720] leading-[0.98]">Proof from the ground.</h2>
            </div>
            <ButtonLink href={brand.instagramUrl} variant="secondary">
              Follow on Instagram
              <Instagram size={18} />
            </ButtonLink>
          </motion.div>
        </div>
      </div>
      <div className="scrollbar-none mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-5 sm:px-6 lg:px-8">
        {gallery.map((item, index) => (
          <motion.div
            key={item.src}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: (index % 4) * 0.05 }}
            className="group relative aspect-[4/5] w-[72vw] shrink-0 snap-center overflow-hidden rounded-[1.5rem] bg-[#dfe6d6] quiet-shadow transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(30,48,39,0.18)] sm:w-[360px]"
          >
            {item.type === "video" ? (
              <video
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                src={item.src}
                poster={item.poster}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image src={item.src} alt={item.title} fill sizes="360px" className="object-cover transition duration-700 group-hover:scale-105" />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 to-transparent p-4 pt-20 text-white">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-white/78">
                {item.type === "video" ? <Play size={14} /> : <Sparkles size={14} />}
                {item.type === "video" ? "Video" : "Photo"}
              </div>
              <p className="mt-2 text-xl font-black leading-tight">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function GalleryPage() {
  return (
    <>
      <div className="pt-16 lg:pt-20" />
      <GallerySection />
    </>
  );
}
