"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Heart, Users, Sparkles, ShieldCheck, BookOpen, PawPrint, MapPin, Play, Camera } from "lucide-react";
import { programs, impactStats, gallery } from "@/content/site-content";
import { brand } from "@/content/brand";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const timeline = [
  { year: "2020", title: "One classroom, one belief", desc: "WeCare started in Bhopal with Bachpanshala \u2014 a free weekend classroom for children who had no access to learning support. No funding. No space. Just people who believed showing up was enough." },
  { year: "2021", title: "First women\u2019s health workshop", desc: "A conversation about menstruation turned into a regular workshop series. Women who had never spoken about their health in public found a safe space to ask, learn, and lead." },
  { year: "2022", title: "Animal welfare became a program", desc: "What started as feeding strays on volunteer routes became a structured effort \u2014 regular feeding rounds, emergency vet support, and a growing network of animal caregivers." },
  { year: "2023", title: "JAGRITI cleanliness drives launched", desc: "Volunteers gathered to clean public spaces. One drive at Manuabhan Tekri collected 175 kg of plastic in a single morning. The initiative gave a name to WeCare\u2019s environmental work." },
  { year: "2024", title: "19 medals at Raahat Khel Mela", desc: "Children from Bachpanshala won 19 medals at a district-level sports event. For a program that started with no budget, those medals proved what consistent care can unlock." },
  { year: "2025", title: "Still showing up", desc: "Five years in, WeCare runs across education, women empowerment, animal welfare, and community drives. Still volunteer-powered. Still in Bhopal. Still showing up every week." },
];

const coreValues = [
  { icon: Heart, title: "We Show Up", desc: "Consistency matters more than scale. We keep returning \u2014 to classrooms, to streets, to conversations \u2014 long after the initial energy fades." },
  { icon: Users, title: "People First", desc: "Every decision starts with the person in front of us. A child who needs to learn. A woman who needs to speak. An animal that needs care." },
  { icon: Sparkles, title: "Community Driven", desc: "We do not build programs in isolation. Volunteers, local residents, and participants shape what we do and how we do it." },
  { icon: ShieldCheck, title: "Transparency", desc: "Our work is documented openly on Instagram. Every drive, every classroom session, every rupee donated \u2014 shared publicly, no filters." },
];

const trustCards = [
  { label: "100% volunteer-run", desc: "No large overheads. No corporate structure. Every hour contributed goes directly into field work." },
  { label: "Real media, real proof", desc: "Every photo and video on this site is from actual field work. Shared on Instagram since 2020." },
  { label: "5 years of consistency", desc: "Programs that started in 2020 are still running today. Not a campaign. A commitment." },
  { label: "Small team, big heart", desc: "We remain a small group of young people. No bureaucracy. Just people who care and act." },
];

const momentMedia = gallery.filter((_, i) => i % 3 === 0).slice(0, 6);

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
      <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
      {children}
    </div>
  );
}

function AutoPlayVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.play().catch(() => {}); } else { el.pause(); }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline className="h-full w-full object-cover" />;
}

function AboutContent() {
  return (
    <>
      <div className="pt-16 lg:pt-20" />

      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden bg-[var(--ink)] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 opacity-30">
          <Image src="/site-media/photos/01-c-ffn9xv27m.jpg" alt="" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/85 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="max-w-2xl">
            <SectionLabel>Our Story</SectionLabel>
            <h1 className="text-[clamp(2.8rem,6.5vw,5.8rem)] font-[720] leading-[0.92]">
              5 Years of Showing Up.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">
              What started as a single weekend classroom in Bhopal has grown into a movement across education, women empowerment, animal welfare, and community care. Powered entirely by volunteers who decided to act.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/volunteer" className="inline-flex items-center gap-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]">
                Become a Volunteer
                <ArrowRight size={18} />
              </a>
              <a href={brand.donationUrl} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] backdrop-blur transition-colors hover:bg-white/25">
                Support Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. JOURNEY TIMELINE ===== */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="text-center">
            <SectionLabel>Our Journey</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">2020 \u2192 Today</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5a665e]">
              Five years of showing up, learning, and growing alongside the communities we serve.
            </p>
          </motion.div>

          <div className="relative mt-12">
            <div className="absolute left-5 top-0 h-full w-px bg-[#dfe6d6] lg:left-1/2 lg:-translate-x-px" />
            {timeline.map((entry, i) => (
              <motion.div
                key={entry.year}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className={`relative mb-8 pl-14 lg:mb-12 lg:w-1/2 ${
                  i % 2 === 0 ? "lg:ml-0 lg:pr-10 lg:pl-0 lg:text-right" : "lg:ml-auto lg:pl-10"
                }`}
              >
                <div className={`absolute left-3 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--leaf)] bg-white lg:left-auto ${
                  i % 2 === 0 ? "lg:right-[-10.5px]" : "lg:left-[-10.5px]"
                }`}>
                  <div className="h-2 w-2 rounded-full bg-[var(--leaf)]" />
                </div>
                <span className="inline-flex rounded-full bg-[#f1c84b]/18 px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.12em] text-[var(--leaf-deep)]">{entry.year}</span>
                <h3 className="mt-2 text-xl font-extrabold leading-snug">{entry.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5a665e]">{entry.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. WHAT WE DO ===== */}
      <section className="bg-[#f4f1e8] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">Four programs. One mission.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5a665e]">
              Every program started small. Every program grew because people kept showing up.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {programs.map((program, i) => {
              const icons = [BookOpen, Heart, PawPrint, MapPin];
              const Icon = icons[i];
              return (
                <motion.article
                  key={program.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                  className="group flex flex-col overflow-hidden rounded-[1.4rem] border border-black/8 bg-white quiet-shadow transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(30,48,39,0.14)] sm:flex-row"
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#dfe6d6] sm:w-[200px] sm:aspect-auto">
                    <Image src={program.image} alt={program.title} fill sizes="(max-width: 640px) 100vw, 200px" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="shrink-0 text-[var(--leaf)]" />
                      <h3 className="text-base font-extrabold">{program.title}</h3>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-6 text-[#4f5d54]">{program.detail}</p>
                    <div className="mt-3 inline-flex w-fit rounded-full bg-[#f1c84b]/24 px-2.5 py-0.5 text-[0.6rem] font-black uppercase tracking-[0.12em] text-[var(--leaf-deep)]">
                      {program.accent}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 4. IMPACT NUMBERS ===== */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionLabel>Impact Numbers</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">The work in numbers.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5a665e]">
              These numbers represent real people, real drives, and real moments of change.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div {...fadeUp} className="rounded-[1.4rem] bg-[var(--leaf)] p-6 text-white quiet-shadow">
              <div className="text-4xl font-black">100+</div>
              <p className="mt-1 text-sm font-extrabold text-white/80">Volunteers</p>
              <p className="mt-2 text-xs leading-6 text-white/60">Students, working professionals, and changemakers who give their time every week.</p>
            </motion.div>
            <motion.div {...fadeUp} className="rounded-[1.4rem] bg-[#fff8e4] p-6 quiet-shadow">
              <div className="text-4xl font-black text-[var(--leaf-deep)]">20+</div>
              <p className="mt-1 text-sm font-extrabold text-[var(--ink)]">Regular Drives</p>
              <p className="mt-2 text-xs leading-6 text-[#5a665e]">Cleanliness drives, hygiene workshops, and community initiatives held consistently.</p>
            </motion.div>
            <motion.div {...fadeUp} className="rounded-[1.4rem] bg-[#eef4f8] p-6 quiet-shadow">
              <div className="text-4xl font-black text-[var(--blue)]">1,000+</div>
              <p className="mt-1 text-sm font-extrabold text-[var(--ink)]">Lives Impacted</p>
              <p className="mt-2 text-xs leading-6 text-[#5a665e]">Children, women, families, and community members reached through programs.</p>
            </motion.div>
            <motion.div {...fadeUp} className="rounded-[1.4rem] bg-[#f4f1e8] p-6 quiet-shadow">
              <div className="text-4xl font-black text-[var(--ink)]">5+</div>
              <p className="mt-1 text-sm font-extrabold text-[var(--ink)]">Years of Service</p>
              <p className="mt-2 text-xs leading-6 text-[#5a665e]">Consistent presence in Bhopal since 2020. Still growing. Still showing up.</p>
            </motion.div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {impactStats.slice(1).map((stat) => (
              <motion.div key={stat.label} {...fadeUp} className="flex items-center gap-3 rounded-[1rem] border border-black/8 bg-white p-3 quiet-shadow">
                <div className="shrink-0 text-2xl font-black text-[var(--leaf-deep)]">{stat.value}</div>
                <div>
                  <p className="text-xs font-extrabold">{stat.label}</p>
                  <p className="text-[0.6rem] leading-5 text-[#5a665e]">{stat.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. CORE VALUES ===== */}
      <section className="bg-[var(--ink)] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionLabel>Core Values</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">What guides us.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/60">
              Everything we do is shaped by these four principles.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <Icon size={24} className="text-[var(--sun)]" />
                  <h3 className="mt-4 text-lg font-extrabold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 6. REAL MOMENTS ===== */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionLabel>Real Moments</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">Proof, not promises.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5a665e]">
              Every photo and video here is from real field work \u2014 shared publicly on Instagram since 2020.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {momentMedia.map((item) => (
              <div key={item.src} className="group relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[#dfe6d6] quiet-shadow">
                {item.type === "video" ? (
                  <AutoPlayVideo src={item.src} poster={item.poster} />
                ) : (
                  <Image src={item.src} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 right-3 translate-y-2 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm font-black leading-tight">{item.title}</p>
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-[0.1em] backdrop-blur">
                    {item.type === "video" ? <Play size={9} /> : <Camera size={9} />}
                    {item.category}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-8 text-center">
            <a href={brand.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]">
              See more on Instagram
              <Camera size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== 7. WHY PEOPLE TRUST WECARE ===== */}
      <section className="bg-[#f4f1e8] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionLabel>Why People Trust WeCare</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">Trust is earned in small moments.</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5a665e]">
              Not through campaigns. Through consistency, transparency, and showing up when it matters.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {trustCards.map((card, i) => (
              <motion.div
                key={card.label}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.06 }}
                className="rounded-[1.4rem] border border-black/8 bg-white p-5 quiet-shadow sm:p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1c84b]/24">
                  <ShieldCheck size={18} className="text-[var(--leaf-deep)]" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold">{card.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5a665e]">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. FINAL CTA ===== */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="relative overflow-hidden rounded-[2rem] bg-[var(--ink)] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <div className="absolute inset-0 opacity-20">
              <Image src="/site-media/photos/24-ctcdvvbmzg1.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="relative z-10">
              <Heart size={32} className="mx-auto text-[var(--sun)]" />
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">
                Five years later, we&rsquo;re still showing up.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-white/65">
                You can be part of what happens next. Whether you volunteer your time or support the work, every action adds to the story.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="/volunteer" className="inline-flex items-center gap-2 rounded-full bg-[var(--leaf)] px-6 py-3 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]">
                  Become a Volunteer
                  <ArrowRight size={18} />
                </a>
                <a href={brand.donationUrl} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-black text-white uppercase tracking-[0.02em] backdrop-blur transition-colors hover:bg-white/25">
                  Support Our Work
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function AboutPage() {
  return <AboutContent />;
}
