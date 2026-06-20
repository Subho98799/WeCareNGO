"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake, Play, Users, Instagram } from "lucide-react";
import { useState } from "react";
import { brand } from "@/content/brand";
import { programs, impactStats, gallery } from "@/content/site-content";

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

function ButtonLink({
  href,
  children,
  variant = "primary",
  className: extraClass = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}) {
  const btnClass =
    variant === "primary"
      ? "bg-[var(--leaf)] text-white hover:bg-[var(--leaf-deep)]"
      : variant === "secondary"
        ? "bg-white/88 text-[var(--ink)] ring-1 ring-black/10 hover:bg-white"
        : "bg-transparent text-[var(--ink)] hover:bg-black/5";

  return (
    <a
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition ${btnClass} ${extraClass}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
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
              className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-black/8 bg-white quiet-shadow transition duration-500 hover:-translate-y-2 hover:border-[var(--leaf)]/30 hover:shadow-[0_28px_70px_rgba(30,48,39,0.16)]"
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
                  <span className="shrink-0 rounded-full bg-[#f1c84b]/22 px-3 py-1 text-xs font-black text-[var(--leaf-deep)]">
                    {program.number}
                  </span>
                </div>
                <p className="mt-3 text-sm font-extrabold leading-6 text-[var(--ink)]">{program.short}</p>
                <button
                  type="button"
                  onClick={() => {
                    const id = deepDiveData[index]?.id;
                    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  aria-label={`Read more about ${program.title}`}
                  className="mt-auto inline-flex w-fit cursor-pointer items-center gap-2 pt-4 text-xs font-black uppercase tracking-[0.12em] text-[var(--leaf-deep)] transition hover:gap-3"
                >
                  Read more
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

type DeepDiveItem = {
  id: string;
  title: string;
  accent: string;
  number: string;
  paragraphs: string[];
  activities: string[];
  impacts: string[];
  image: string;
  image2: string;
  cta: { label: string; href: string; variant?: "primary" | "secondary" };
};

const deepDiveData: DeepDiveItem[] = [
  {
    id: "bachpanshala",
    title: "Bachpanshala",
    accent: "Education",
    number: "01",
    paragraphs: [
      "Bachpanshala is WeCare's flagship weekend learning program, created for children who would otherwise miss the structure, attention, and encouragement that school provides. Every Sunday, a classroom fills with children ready to learn, play, ask questions, and grow.",
      "Beyond textbooks, Bachpanshala offers arts, sports, mentorship, and real conversations about confidence and self-worth. Children receive meals, clothes, and shoes because a child who feels supported learns better.",
      "The results speak for themselves. In 2025, Bachpanshala children won 19 medals at the Raahat Khel Mela, proving that when you invest in a child's dignity, their potential has no ceiling.",
    ],
    activities: ["Weekend academic classes", "Arts, crafts & creative workshops", "Sports & games for confidence", "Meal & clothing support", "One-on-one mentorship"],
    impacts: ["100+ children currently enrolled", "19 medals won at Raahat Khel Mela 2025", "Regular attendance across every session"],
    image: "/site-media/photos/01-c-ffn9xv27m.jpg",
    image2: "/site-media/photos/24-ctcdvvbmzg1.jpg",
    cta: { label: "Sponsor Learning Supplies", href: "/support" },
  },
  {
    id: "women-empowerment",
    title: "Women Empowerment",
    accent: "Women empowerment",
    number: "02",
    paragraphs: [
      "WeCare's women empowerment work creates safe spaces where women in Bhopal can speak openly, learn without shame, and support each other. Through menstrual hygiene drives, health awareness workshops, and community conversations, we address topics that have been silenced for too long.",
      "In partnership with organizations like Raahat, we distribute sanitary pads, share knowledge about reproductive health, and build a network of women who feel informed, dignified, and heard.",
      "Every workshop is a step toward breaking stigma. Women who once hesitated to ask questions now lead conversations in their own communities.",
    ],
    activities: ["Menstrual hygiene workshops", "Health awareness & Q&A sessions", "Pad distribution drives", "Safe space community circles", "Skill-building sessions"],
    impacts: ["1,000+ pads distributed with partners", "Open dialogues on taboo health topics", "Growing network of informed women"],
    image: "/site-media/photos/35-dkpitkvie-c.jpg",
    image2: "/site-media/photos/36-dkpitkvie-c.jpg",
    cta: { label: "Support Women", href: "/support" },
  },
  {
    id: "animal-welfare",
    title: "Animal Welfare",
    accent: "Animal welfare",
    number: "03",
    paragraphs: [
      "WeCare's animal welfare work is grounded in the belief that every life on the street deserves care. Our volunteers regularly feed street animals, coordinate rescue efforts, and provide medical aid to injured animals across Bhopal.",
      "From arranging emergency vet visits to ensuring stray animals have food and water during extreme weather, our approach is consistent and compassionate.",
      "This program is built by animal lovers for animal lovers. No judgment, no red tape. Just people showing up for the animals who share our streets.",
    ],
    activities: ["Regular street feeding rounds", "Rescue coordination & transport", "Medical aid for injured strays", "Community awareness on animal care"],
    impacts: ["Weekly feeding across multiple neighborhoods", "Emergency rescue support available", "Growing volunteer network for animal care"],
    image: "/site-media/photos/44-c3kgncwpakn.jpg",
    image2: "/site-media/photos/44-c3kgncwpakn.jpg",
    cta: { label: "Care for Animals", href: "/support" },
  },
  {
    id: "jagriti",
    title: "JAGRITI Clean Drives",
    accent: "Environment",
    number: "04",
    paragraphs: [
      "JAGRITI is WeCare's community-led cleanliness initiative that turns concern for public spaces into visible action. Volunteers gather to clean plastic waste from parks, hills, and streets while talking to local communities about better waste habits.",
      "One recent drive at Manuabhan Tekri collected 175 kilograms of plastic in a single morning. That is the weight of thousands of bottles, bags, and wrappers that will no longer sit in nature.",
      "JAGRITI is not just about cleaning. It is about waking up to the idea that public spaces belong to everyone, and everyone can help take care of them.",
    ],
    activities: ["Plastic clean-up drives", "Waste segregation awareness", "Community door-to-door conversations", "Public space restoration"],
    impacts: ["175 kg plastic collected in one drive", "Multiple restoration drives completed", "Growing community participation"],
    image: "/site-media/photos/12-dwcsdbhe1vr.jpg",
    image2: "/site-media/photos/163-dwcsdbhe1vr.jpg",
    cta: { label: "Join a Drive", href: "/volunteer", variant: "secondary" },
  },
];

function DeepDiveBlock({ item, index }: { item: DeepDiveItem; index: number }) {
  const isReversed = index % 2 === 1;

  return (
    <section
      id={item.id}
      className="scroll-mt-24"
    >
      <motion.div
        {...fadeUp}
        className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isReversed ? "" : ""}`}
      >
      <div className={`${isReversed ? "lg:order-2" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-[#dfe6d6] media-shadow">
          <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className={`relative mt-[-2rem] ${isReversed ? "ml-auto mr-4" : "ml-4"} w-3/5 overflow-hidden rounded-[1.2rem] border-4 border-white bg-[#dfe6d6] quiet-shadow`}>
          <div className="relative aspect-[4/3]">
            <Image src={item.image2} alt={`${item.title} additional`} fill sizes="30vw" className="object-cover" />
          </div>
        </div>
      </div>

      <div className={`${isReversed ? "lg:order-1" : ""}`}>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
          <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
          {item.accent}
        </div>
        <h3 className="text-[clamp(1.8rem,3.5vw,3rem)] font-[720] leading-[0.98]">{item.title}</h3>

        <div className="mt-4 space-y-4 text-base leading-7 text-[#4f5d54]">
          {item.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.2rem] bg-[#fff8e4] p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--leaf-deep)]">Key Activities</p>
            <ul className="mt-3 space-y-2">
              {item.activities.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-5 text-[#5a665e]">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--leaf)]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.2rem] bg-[#eef4f8] p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--blue)]">Impact Highlights</p>
            <ul className="mt-3 space-y-2">
              {item.impacts.map((im, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-5 text-[#5a665e]">
                  <span className="mt-0.5 shrink-0 font-black text-[var(--blue)]">+</span>
                  {im}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <ButtonLink href={item.cta.href} variant={item.cta.variant || "primary"}>
            {item.cta.label}
            <ArrowRight size={18} />
          </ButtonLink>
        </div>
      </div>
      </motion.div>
    </section>
  );
}

function DeepDiveSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-14 max-w-3xl">
          <SectionLabel>Program Deep Dive</SectionLabel>
          <h2 className="text-[clamp(2.2rem,5vw,4.4rem)] font-[720] leading-[0.95]">
            A closer look at every initiative.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5a665e]">
            Each program is built on consistent volunteer effort, real community relationships, and a belief that small actions create lasting change.
          </p>
        </motion.div>

        <div className="space-y-24">
          {deepDiveData.map((item, index) => (
            <DeepDiveBlock key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStrip() {
  return (
    <section className="bg-[var(--leaf)] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp}>
          <SectionLabel>By the numbers</SectionLabel>
          <h2 className="max-w-2xl text-[clamp(1.8rem,4vw,3.2rem)] font-[720] leading-[0.98] text-white">
            Real results from real work.
          </h2>
        </motion.div>
        <motion.div {...fadeUp} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} className="rounded-[1.4rem] bg-white/12 p-5 text-white">
              <div className="text-3xl font-black">{stat.value}</div>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/70">{stat.label}</p>
              <p className="mt-3 text-sm leading-6 text-white/78">{stat.note}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const preview = gallery.filter((_, i) => i % 3 === 0).slice(0, 8);
  const duplicated = [...preview, ...preview];

  return (
    <section className="overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <style>{`
        @keyframes galleryScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .work-gallery-track {
          animation: galleryScroll 50s linear infinite;
          width: max-content;
        }
        .work-gallery-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .work-gallery-track { animation: none; }
        }
      `}</style>

      <div className="mx-auto mb-8 max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionLabel>Proof from the ground</SectionLabel>
            <h2 className="max-w-lg text-[clamp(1.8rem,4vw,3.2rem)] font-[720] leading-[0.98]">
              Media from every program.
            </h2>
          </div>
          <a
            href="/gallery"
            className="focus-ring hidden shrink-0 items-center gap-1.5 rounded-full px-1 py-2 text-sm font-bold text-[var(--leaf-deep)] transition hover:translate-x-0.5 sm:inline-flex"
          >
            View Full Gallery
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="flex gap-3 work-gallery-track px-4 sm:px-6 lg:px-8">
          {duplicated.map((item, i) => (
            <a
              key={`${item.src}-${i}`}
              href="/gallery"
              className="group relative block h-48 w-48 shrink-0 overflow-hidden rounded-[1rem] bg-[#dfe6d6] quiet-shadow sm:h-56 sm:w-56"
            >
              {item.type === "video" ? (
                <video src={item.src} poster={item.poster} muted loop playsInline className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : (
                <Image src={item.src} alt={item.title} fill sizes="200px" className="object-cover transition duration-500 group-hover:scale-105" />
              )}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/92 shadow transition duration-200 group-hover:scale-110">
                    <Play size={15} className="ml-0.5 text-[var(--leaf)]" fill="currentColor" />
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center sm:hidden">
        <a href="/gallery" className="focus-ring inline-flex items-center gap-1.5 text-sm font-bold text-[var(--leaf-deep)]">
          View Full Gallery
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

function VolunteerCTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-[2rem] bg-[var(--leaf)] px-6 py-16 text-center text-white sm:px-16"
        >
          <div className="relative z-10">
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-[720] leading-[0.95]">
              Want to be part of this work?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-white/82">
              Every program on this page runs because people like you choose to show up. Volunteer your time, your skills, or your presence.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={brand.volunteerUrl}>
                Start as a Volunteer
                <Users size={18} />
              </ButtonLink>
              <ButtonLink href={brand.instagramUrl} variant="primary">
                See Volunteer Proof
                <Instagram size={18} />
              </ButtonLink>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/8 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <>
      <div className="pt-16 lg:pt-20" />
      <WorkSection />
      <DeepDiveSection />
      <ImpactStrip />
      <GalleryPreview />
      <VolunteerCTA />
    </>
  );
}
