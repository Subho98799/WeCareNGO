"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowRight,
  Check,
  ChevronRight,
  HeartHandshake,
  Instagram,
  Mail,
  MapPin,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { brand } from "@/content/brand";
import {
  donationOptions,
  faqs,
  gallery,
  impactStats,
  programs,
  stories,
  volunteerPaths,
} from "@/content/site-content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

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

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-white/78 px-3 py-2 shadow-[0_18px_60px_rgba(23,35,27,0.12)] backdrop-blur-xl">
        <a className="focus-ring flex items-center gap-3 rounded-full pr-2" href="#top">
          <span className="relative h-14 w-14 overflow-hidden">
            <Image
              src="/site-media/photos/Logo.PNG"
              alt="WeCare NGO logo"
              fill
              className="object-contain"
            />
          </span>
          <span className="hidden text-sm font-black sm:block">{brand.name}</span>
        </a>
        <div className="hidden items-center gap-1 text-sm font-bold text-[#526052] md:flex">
          <a className="rounded-full px-3 py-2 hover:bg-black/5" href="#work">
            Work
          </a>
          <a className="rounded-full px-3 py-2 hover:bg-black/5" href="#stories">
            Stories
          </a>
          <a className="rounded-full px-3 py-2 hover:bg-black/5" href="#volunteer">
            Volunteer
          </a>
        </div>
        <ButtonLink href={brand.donationUrl}>
          Donate
          <ArrowRight size={17} />
        </ButtonLink>
      </nav>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 42]);
  const heroMetrics = [
    { value: "2,165", label: "Instagram followers" },
    { value: "100+", label: "active volunteers" },
    { value: "1,000+", label: "people impacted" },
  ];

  return (
    <section id="top" className="grain relative overflow-hidden px-4 pb-10 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mx-auto grid max-w-7xl gap-6 lg:min-h-[calc(100svh-5.25rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div {...fadeUp} className="relative z-10 pb-2 pt-6 lg:pt-0">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--leaf-deep)] backdrop-blur">
            <MapPin size={15} />
            {brand.city}
          </div>
          <h1 className="max-w-3xl text-[clamp(2.55rem,6.9vw,6.1rem)] font-extrabold leading-[0.92] text-[var(--ink)]">
            Care that shows up.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#4c594f] sm:text-lg">
            WeCare NGO works with youth to improve the lives of children, women, animals, and public spaces in Bhopal.
          </p>
          <p className="mt-3 text-lg font-black text-[var(--leaf-deep)]">{brand.hindiLine}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={brand.donationUrl}>
              {brand.primaryButtonLabel}
              <HeartHandshake size={18} />
            </ButtonLink>
            <ButtonLink href="#stories" variant="secondary">
              See the work
              <ChevronRight size={18} />
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div style={{ y: imageY }} className="relative z-10">
          <div className="relative mx-auto min-h-[620px] max-w-[720px]">
            <div className="absolute left-0 top-8 h-[78%] w-[74%] overflow-hidden rounded-[2.2rem] bg-[#dfe6d6] media-shadow">
              <video
                className="h-full w-full object-cover"
                src="/site-media/videos/33-ctcdvvbmzg1.mp4"
                poster="/site-media/photos/24-ctcdvvbmzg1.jpg"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/16 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7 sm:right-7">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/18 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] backdrop-blur">
                  <Play size={13} />
                  Real video
                </div>
                <p className="max-w-sm text-2xl font-black leading-tight sm:text-4xl">Learning, care, and volunteers in motion.</p>
              </div>
            </div>

            <div className="absolute right-0 top-0 h-[35%] w-[42%] overflow-hidden rounded-[1.6rem] border-4 border-[var(--paper)] bg-[#dfe6d6] quiet-shadow">
              <Image
                src="/site-media/photos/07-dh1cf3boaim.jpg"
                alt="Children from Bachpanshala at a sports event"
                fill
                priority
                sizes="(max-width: 1024px) 42vw, 22vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-14 right-2 h-[38%] w-[46%] overflow-hidden rounded-[1.7rem] border-4 border-[var(--paper)] bg-[#dfe6d6] quiet-shadow">
              <Image
                src="/site-media/photos/35-dkpitkvie-c.jpg"
                alt="WeCare NGO menstrual hygiene drive in Bhopal"
                fill
                sizes="(max-width: 1024px) 46vw, 24vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-4 right-4 rounded-3xl border border-white/70 bg-white/90 p-3 quiet-shadow backdrop-blur md:left-8 md:right-auto md:w-[430px]">
              <div className="grid grid-cols-3 gap-2">
                {heroMetrics.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#fff8e4] p-3">
                    <div className="text-xl font-black text-[var(--leaf-deep)]">{item.value}</div>
                    <div className="mt-1 text-[0.66rem] font-extrabold uppercase tracking-[0.1em] text-[#667066]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProgramMarquee() {
  const items = [
    "Education",
    "Women empowerment",
    "Animal welfare",
    "Clean environment",
    "Bachpanshala",
    "JAGRITI",
    "Hygiene drives",
    "Community first",
  ];
  const repeated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-black/10 bg-white/68 py-5 backdrop-blur">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.3em] text-[#657673]">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-12">
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--leaf)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function WhoWeAreSection() {
  const causes = ["Education", "Women Empowerment", "Environment", "Animal Welfare"];

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div {...fadeUp} className="relative min-h-[500px]">
          <div className="absolute left-0 top-6 h-[70%] w-[70%] overflow-hidden rounded-[1.9rem] bg-[#dfe6d6] media-shadow">
            <Image
              src="/site-media/photos/24-ctcdvvbmzg1.jpg"
              alt="WeCare NGO Bachpanshala children learning in Bhopal"
              fill
              sizes="(max-width: 1024px) 72vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-0 top-0 h-[34%] w-[42%] overflow-hidden rounded-[1.4rem] border-4 border-[var(--paper)] bg-[#dfe6d6] quiet-shadow">
            <Image
              src="/site-media/photos/35-dkpitkvie-c.jpg"
              alt="WeCare NGO women empowerment and hygiene drive"
              fill
              sizes="(max-width: 1024px) 42vw, 22vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-4 right-2 h-[40%] w-[48%] overflow-hidden rounded-[1.5rem] border-4 border-[var(--paper)] bg-[#dfe6d6] quiet-shadow">
            <video
              className="h-full w-full object-cover"
              src="/site-media/videos/40-dkpitkvie-c.mp4"
              poster="/site-media/photos/196-dkpitkvie-c.jpg"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-20 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/18 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] backdrop-blur">
                <Play size={13} />
                Field work
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-5 max-w-[230px] rounded-3xl border border-white/70 bg-white/90 p-4 quiet-shadow backdrop-blur">
            <p className="text-3xl font-black text-[var(--leaf-deep)]">2020</p>
            <p className="mt-2 text-xs font-bold leading-5 text-[#5a665e]">
              Started in Bhopal with one classroom, one belief, and people willing to show up.
            </p>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="relative">
          <SectionLabel>Who we are</SectionLabel>
          <h2 className="text-[clamp(2.1rem,4.4vw,4.25rem)] font-extrabold leading-[0.98]">
            A family built on compassion and care.
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-[#4f5d54]">
            <p>
              Founded in 2020 by a passionate group of young people in Bhopal, We Care started with one classroom, one belief, and boundless hope.
            </p>
            <p>
              What began as Bachpanshala, a free weekend education program, has grown into a movement across education, women empowerment, environment, and animal welfare.
            </p>
            <p className="rounded-[1.2rem] border-l-4 border-[var(--leaf)] bg-white/78 p-4 text-lg font-extrabold leading-7 text-[var(--ink)] quiet-shadow">
              Kindness costs nothing, but its impact lasts forever.
            </p>
            <p>
              We are still a small group of young people who decided to show up. Real change is built in classrooms on quiet afternoons, in conversations women were told to avoid, in care for street animals, and in cleaner streets one Sunday at a time.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {causes.map((cause) => (
              <span
                key={cause}
                className="rounded-full border border-black/8 bg-white/82 px-4 py-2 text-sm font-black text-[var(--leaf-deep)] quiet-shadow"
              >
                {cause}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.3rem] bg-[#fff8e4] p-4">
              <p className="text-2xl font-black text-[var(--leaf-deep)]">2,000+</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[#5a665e]">supporters following and sharing the journey.</p>
            </div>
            <div className="rounded-[1.3rem] bg-[#eef4f8] p-4">
              <p className="text-2xl font-black text-[var(--blue)]">5 years</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[#5a665e]">of steady service across Bhopal communities.</p>
            </div>
          </div>

          <div className="mt-6">
            <ButtonLink href={brand.instagramUrl} variant="secondary">
              Follow our journey on Instagram
              <Instagram size={18} />
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactStrip() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="grid gap-3 md:grid-cols-4">
          {impactStats.map((item) => (
            <div key={item.label} className="rounded-[1.4rem] border border-black/8 bg-white/70 p-5 quiet-shadow">
              <div className="text-4xl font-black text-[var(--leaf)]">{item.value}</div>
              <div className="mt-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--ink)]">{item.label}</div>
              <p className="mt-3 text-sm leading-6 text-[#667066]">{item.note}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
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

function StorySection() {
  return (
    <section id="stories" className="bg-[var(--ink)] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionLabel>Real stories</SectionLabel>
            <h2 className="text-[clamp(2.4rem,6vw,5.4rem)] font-[720] leading-[0.95]">
              Small, steady work people can believe in.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-white/72">
            The strongest nonprofit work is easy to trust because people can see it. These stories are drawn from WeCare's own Instagram captions and saved media, then shaped into proof of what volunteers are doing in classrooms, hygiene drives, clothing support, and community care.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              className="group overflow-hidden rounded-[1.7rem] bg-white text-[var(--ink)] quiet-shadow transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(0,0,0,0.24)]"
            >
              <div className="relative aspect-[4/3.2] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.08]"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--rose)]">{story.kicker}</p>
                <h3 className="mt-3 text-3xl font-[700] leading-tight">{story.title}</h3>
                <p className="mt-4 leading-7 text-[#5c665e]">{story.copy}</p>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.12em] text-[#8a928a]">{story.meta}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DonationSection() {
  return (
    <section id="donate" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div {...fadeUp}>
          <SectionLabel>Donate</SectionLabel>
          <h2 className="text-[clamp(2.4rem,6vw,5.2rem)] font-[720] leading-[0.95]">
            Make the next class, drive, or care visit possible.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5a665e]">
            Your donation supports practical work in Bhopal: education for children, dignity for women, cleaner public spaces, and care for animals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={brand.donationUrl}>
              Donate through WeCare
              <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href={brand.instagramUrl} variant="secondary">
              <Instagram size={18} />
              Instagram proof
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="rounded-[2rem] border border-black/8 bg-white p-4 quiet-shadow sm:p-6">
          <div className="flex items-center gap-3 border-b border-black/8 pb-5">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f1c84b]/24 text-[var(--leaf-deep)]">
              <ShieldCheck size={23} />
            </span>
            <div>
              <h3 className="text-2xl font-[700]">Suggested giving</h3>
              <p className="text-sm text-[#667066]">Placeholder amounts. Please confirm before going live.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {donationOptions.map((option) => (
              <a
                key={option.amount}
                href={brand.donationUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex items-center justify-between rounded-2xl border border-black/8 bg-[#fffaf0] p-4 transition duration-300 hover:-translate-y-1 hover:border-[var(--leaf)]/30 hover:bg-[#fff4d4] hover:shadow-[0_18px_40px_rgba(30,48,39,0.1)]"
              >
                <div>
                  <div className="text-2xl font-black text-[var(--leaf)]">{option.amount}</div>
                  <div className="mt-1 text-sm font-bold text-[#59645c]">{option.label}</div>
                </div>
                <ArrowRight size={20} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
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

function TrustSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-start gap-5 lg:grid-cols-[1fr_0.9fr]">
        <motion.div {...fadeUp} className="rounded-[2rem] bg-[var(--leaf)] p-6 text-white sm:p-10 lg:sticky lg:top-28">
          <SectionLabel>Why it feels different</SectionLabel>
          <h2 className="text-[clamp(2.2rem,5vw,4.6rem)] font-[720] leading-[0.98]">Youth led care with real public proof.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
            WeCare's Instagram shows the actual people, classrooms, drives, and volunteers behind the work. This new site brings that proof forward and keeps the donation path simple.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/12 p-4">
              <div className="text-3xl font-black">{brand.socialProof.instagramFollowers}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/70">Instagram followers</div>
            </div>
            <div className="rounded-2xl bg-white/12 p-4">
              <div className="text-3xl font-black">{brand.socialProof.instagramPosts}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/70">Posts shared</div>
            </div>
            <div className="rounded-2xl bg-white/12 p-4">
              <div className="text-3xl font-black">{brand.socialProof.yearsActive}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/70">Years active</div>
            </div>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="rounded-[2rem] border border-black/8 bg-white p-6 quiet-shadow sm:p-8">
          <h3 className="text-3xl font-[700]">Common questions</h3>
          <div className="mt-6 grid gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question} className="rounded-2xl border border-black/8 bg-[#fbfaf4]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="focus-ring flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl p-4 text-left font-black"
                    aria-expanded={isOpen}
                  >
                  {faq.question}
                    <Sparkles
                      className={`shrink-0 text-[var(--sun)] transition ${isOpen ? "rotate-45" : ""}`}
                      size={18}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 leading-7 text-[#5c665e]">{faq.answer}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TechnologyPartner() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp}
          className="grid gap-5 rounded-[1.7rem] border border-black/8 bg-white/72 p-5 quiet-shadow sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6"
        >
          <a
            className="focus-ring flex h-14 w-36 items-center justify-center rounded-2xl bg-white px-4 ring-1 ring-black/8 transition hover:-translate-y-0.5 hover:ring-[var(--leaf)]/35"
            href="https://www.vfinite.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit VFinite"
          >
            <img src="https://www.vfinite.com/final1.png" alt="VFinite logo" className="max-h-9 w-auto object-contain" />
          </a>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--leaf-deep)]">Technology Partner</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#59645c] sm:text-base">
              We Care's digital platform is supported by VFinite, helping organizations strengthen their online presence and community impact.
            </p>
          </div>
          <a
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-full text-sm font-black text-[var(--leaf-deep)] transition hover:translate-x-1"
            href="https://www.vfinite.com/"
            target="_blank"
            rel="noreferrer"
          >
            Visit VFinite
            <ArrowRight size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="text-4xl font-black">{brand.name}</div>
          <p className="mt-3 max-w-md text-white/68">
            Education, women empowerment, animal welfare, and community care in {brand.city}.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={brand.donationUrl}>
            Donate
            <HeartHandshake size={18} />
          </ButtonLink>
          <ButtonLink href={`mailto:${brand.contactEmail}`} variant="secondary">
            <Mail size={18} />
            Email
          </ButtonLink>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl justify-center border-t border-white/12 pt-5 text-center text-xs font-extrabold uppercase tracking-[0.16em] text-white/64">
        <a className="focus-ring rounded-full transition hover:text-white" href="https://www.vfinite.com/" target="_blank" rel="noreferrer">
          Designed and maintained by VFinite
        </a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <ProgramMarquee />
        <WhoWeAreSection />
        <ImpactStrip />
        <WorkSection />
        <StorySection />
        <DonationSection />
        <VolunteerSection />
        <GallerySection />
        <TrustSection />
        <TechnologyPartner />
      </main>
      <Footer />
    </>
  );
}
