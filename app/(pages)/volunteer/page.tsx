"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Users, Instagram, ArrowRight } from "lucide-react";
import { brand } from "@/content/brand";
import { volunteerPaths } from "@/content/site-content";

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

function VolunteerSection() {
  return (
    <section id="volunteer" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionLabel>Volunteer</SectionLabel>
            <h2 className="text-[clamp(2.4rem,5.8vw,5.4rem)] font-extrabold leading-[0.95]">
              Come for a few hours. Leave part of the story.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#5a665e]">
            WeCare is built for people who want to do something real with the time, skill, and heart they already have. Volunteers teach at Bachpanshala, document field work, help during cleanliness and hygiene drives, support animal welfare, and turn small weekly commitments into visible care across Bhopal.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div {...fadeUp} className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#dfe6d6] media-shadow">
            <video
              className="h-full w-full object-cover"
              src="/site-media/videos/153-ctcdvvbmzg1.mp4"
              poster="/site-media/photos/24-ctcdvvbmzg1.jpg"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8 sm:right-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/18 px-3 py-1 text-xs font-black uppercase tracking-[0.13em] backdrop-blur">
                <Play size={14} />
                Volunteer energy
              </div>
              <h3 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">Five years of people choosing to show up.</h3>
              <p className="mt-4 max-w-md leading-7 text-white/78">
                From classrooms to community drives, WeCare runs because volunteers keep returning.
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="grid gap-3 rounded-[2rem] bg-[#f4f1e8] p-4 sm:p-6">
            {volunteerPaths.map((path, index) => (
              <article
                key={path.title}
                className="group grid gap-4 rounded-[1.4rem] bg-white/74 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_40px_rgba(30,48,39,0.1)] sm:grid-cols-[auto_1fr_auto] sm:items-start sm:p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--leaf)] text-sm font-black text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold">{path.title}</h3>
                  <p className="mt-2 leading-7 text-[#5a665e]">{path.detail}</p>
                </div>
                <div className="inline-flex w-fit rounded-full bg-[#f1c84b]/24 px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-[var(--leaf-deep)]">
                  {path.time}
                </div>
              </article>
            ))}
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={brand.volunteerUrl} variant="primary">
                Start as a volunteer
                <Users size={18} />
              </ButtonLink>
              <ButtonLink href={brand.instagramUrl} variant="secondary">
                See volunteer proof
                <Instagram size={18} />
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function VolunteerPage() {
  return (
    <>
      <div className="pt-16 lg:pt-20" />
      <VolunteerSection />
    </>
  );
}
