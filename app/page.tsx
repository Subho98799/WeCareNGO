"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  PawPrint,
  Play,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { brand } from "@/content/brand";
import {
  gallery,
  impactStats,
  programs,
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
      <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
      {children}
    </div>
  );
}

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/stories", label: "Stories" },
  { href: "/gallery", label: "Gallery" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support Us" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/60 bg-white/78 px-3 py-2 shadow-[0_18px_60px_rgba(23,35,27,0.12)] backdrop-blur-xl">
        <a className="focus-ring flex items-center gap-3 rounded-full pr-2" href="/">
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
          {navLinks.map((link) => (
            <a key={link.href} className="rounded-full px-3 py-2 hover:bg-black/5" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink href={brand.donationUrl} className="hidden sm:inline-flex">
            Donate
            <ArrowRight size={17} />
          </ButtonLink>
          <button
            type="button"
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full text-[#526052] hover:bg-black/5 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {menuOpen ? (
        <div className="mx-auto mt-2 max-w-7xl rounded-[1.4rem] border border-white/60 bg-white/92 p-3 shadow-[0_18px_60px_rgba(23,35,27,0.12)] backdrop-blur-xl md:hidden">
          <div className="grid gap-1 text-sm font-bold text-[#526052]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-2xl px-4 py-3 hover:bg-black/5"
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-2 border-t border-black/8 pt-2">
            <ButtonLink href={brand.donationUrl} className="w-full">
              Donate
              <ArrowRight size={17} />
            </ButtonLink>
          </div>
        </div>
      ) : null}
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
    <section id="top" className="grain relative overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pt-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:min-h-[calc(100svh-5.25rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div {...fadeUp} className="relative z-10 pb-2 pt-6 lg:pt-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--leaf-deep)] backdrop-blur">
            <MapPin size={15} />
            {brand.city}
          </div>
          <h1 className="max-w-3xl text-[clamp(2.55rem,6.9vw,6.1rem)] font-extrabold leading-[0.92] text-[var(--ink)]">
            Care that shows up.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#4c594f] sm:text-lg">
            WeCare NGO works with youth to improve the lives of children, women, animals, and public spaces in Bhopal.
          </p>
          <p className="mt-2 text-lg font-black text-[var(--leaf-deep)]">{brand.hindiLine}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={brand.donationUrl}>
              {brand.primaryButtonLabel}
              <HeartHandshake size={18} />
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary">
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

function ImpactStrip() {
  return (
    <section className="bg-[var(--leaf)] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white/30">
            <Image
              src="/site-media/photos/01-c-ffn9xv27m.jpg"
              alt="WeCare children learning"
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-6 text-center text-white md:grid-cols-4 md:flex-1">
            <div>
              <div className="text-4xl font-black">100+</div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-white/80">Active Volunteers</p>
            </div>
            <div>
              <div className="text-4xl font-black">20+</div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-white/80">Regular Drives</p>
            </div>
            <div>
              <div className="text-4xl font-black">1000+</div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-white/80">Lives Impacted</p>
            </div>
            <div>
              <div className="text-4xl font-black">∞</div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-white/80">Countless Smiles</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#dfe6d6] media-shadow">
            <Image
              src="/site-media/photos/35-dkpitkvie-c.jpg"
              alt="WeCare NGO menstrual hygiene drive in Bhopal"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionLabel>Who We Are</SectionLabel>
            <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.6rem)] font-extrabold leading-[0.98]">
              A small group of young people who decided to show up.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#4f5d54]">
              Founded in 2020 in Bhopal, WeCare started with one classroom and one belief. That kindness, when shown consistently, transforms everything around it. What began as a weekend learning space grew into a movement across education, women empowerment, animal welfare, and community care.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-[1rem] bg-[#f4f1e8] p-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--leaf)] text-xs font-black text-white">✓</span>
                <div>
                  <p className="text-sm font-extrabold">Community Driven</p>
                  <p className="mt-0.5 text-xs leading-5 text-[#5a665e]">Built by youth, powered by volunteers who show up every week.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[1rem] bg-[#f4f1e8] p-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--leaf)] text-xs font-black text-white">✓</span>
                <div>
                  <p className="text-sm font-extrabold">Transparent &amp; Accountable</p>
                  <p className="mt-0.5 text-xs leading-5 text-[#5a665e]">Every drive, class, and donation shared openly on Instagram.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-[1rem] bg-[#f4f1e8] p-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--leaf)] text-xs font-black text-white">✓</span>
                <div>
                  <p className="text-sm font-extrabold">People First</p>
                  <p className="mt-0.5 text-xs leading-5 text-[#5a665e]">Children, women, animals, communities — always the priority.</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <ButtonLink href="/about">
                Learn More About Us
                <ArrowRight size={17} />
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Programs() {
  const iconMap = [BookOpen, Heart, PawPrint, Sparkles];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="flex flex-col items-center text-center">
          <SectionLabel>Our Programs</SectionLabel>
          <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.95]">
            Programs that create lasting impact.
          </h2>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => {
            const Icon = iconMap[index];
            return (
              <motion.article
                key={program.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.06 }}
                className="group flex flex-col overflow-hidden rounded-[1.4rem] border border-black/8 bg-white quiet-shadow transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(30,48,39,0.14)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#dfe6d6]">
                  <Image
                    src={program.image}
                    alt={`${program.title} by WeCare NGO`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/88 px-2.5 py-0.5 text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--leaf-deep)]">
                    {program.accent}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="shrink-0 text-[var(--leaf)]" />
                    <h3 className="text-base font-extrabold">{program.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#4f5d54] line-clamp-2">{program.short}</p>
                  <p className="mt-auto pt-3 inline-flex w-fit items-center gap-1.5 text-[0.65rem] font-black uppercase tracking-[0.12em] text-[var(--leaf-deep)]">
                    Read More
                    <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedStory() {
  const testimonials = [
    {
      src: "/site-media/photos/01-c-ffn9xv27m.jpg",
      quote: "WeCare gives me books, guidance and hope to keep learning.",
      name: "Bachpanshala Student",
      role: "Education",
    },
    {
      src: "/site-media/photos/35-dkpitkvie-c.jpg",
      quote: "I learned to ask questions and care for my health without shame.",
      name: "JAGRITI Participant",
      role: "Women Empowerment",
    },
    {
      src: "/site-media/photos/76-c5dyzlspl58.jpg",
      quote: "Volunteering here made me realize small efforts create real change.",
      name: "Active Volunteer",
      role: "Field Work",
    },
    {
      src: "/site-media/photos/36-dkpitkvie-c.jpg",
      quote: "We speak about things that were never discussed before. That is progress.",
      name: "Community Member",
      role: "Women Empowerment",
    },
    {
      src: "/site-media/photos/07-dh1cf3boaim.jpg",
      quote: "The children run to class every Sunday. That joy is the real impact.",
      name: "WeCare Team Member",
      role: "Community Program",
    },
    {
      src: "/site-media/photos/41-ddfmqrwvoxd.jpg",
      quote: "A pair of shoes, a clean shirt, a smile \u2014 that is change you can see.",
      name: "Volunteer Coordinator",
      role: "Children Support",
    },
    {
      src: "/site-media/photos/99-c1hj29kprr2.jpg",
      quote: "Teaching here reminds me why I wanted to be a teacher.",
      name: "Bachpanshala Teacher",
      role: "Education",
    },
    {
      src: "/site-media/photos/131-c4vjxktvycy.jpg",
      quote: "Creative workshops help children express what words cannot.",
      name: "Workshop Lead",
      role: "Education",
    },
  ];

  const row1 = testimonials.slice(0, 4);
  const row2 = testimonials.slice(4, 8);

  return (
    <>
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left { animation: marqueeLeft 40s linear infinite; }
        .marquee-right { animation: marqueeRight 40s linear infinite; }
        .marquee-left:hover, .marquee-right:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-left, .marquee-right { animation: none; }
        }
      `}</style>

      <section className="overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <SectionLabel>Stories that inspire</SectionLabel>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.98]">Real stories. Real people.</h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-[#5a665e]">
                  Every program is powered by people learning, teaching, volunteering, and creating change together.
                </p>
              </div>
              <a
                href="/stories"
                className="focus-ring hidden shrink-0 items-center gap-1.5 rounded-full px-1 py-2 text-sm font-bold text-[var(--leaf-deep)] transition hover:translate-x-0.5 sm:inline-flex"
              >
                More Stories
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="-mx-4 mb-4 flex gap-4 sm:-mx-6 lg:-mx-8 marquee-left">
          {[...row1, ...row1].map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="flex w-[320px] shrink-0 items-start gap-3 rounded-[1.2rem] bg-white p-4 quiet-shadow sm:w-[360px]"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#dfe6d6]">
                <Image src={t.src} alt={t.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <blockquote className="text-sm leading-6 text-[var(--ink)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-1.5 text-xs font-extrabold text-[var(--ink)]">{t.name}</p>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.06em] text-[#7a847c]">{t.role}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="-mx-4 flex gap-4 sm:-mx-6 lg:-mx-8 marquee-right">
          {[...row2, ...row2].map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="flex w-[320px] shrink-0 items-start gap-3 rounded-[1.2rem] bg-white p-4 quiet-shadow sm:w-[360px]"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#dfe6d6]">
                <Image src={t.src} alt={t.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <blockquote className="text-sm leading-6 text-[var(--ink)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-1.5 text-xs font-extrabold text-[var(--ink)]">{t.name}</p>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.06em] text-[#7a847c]">{t.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}


type GalleryItem = (typeof gallery)[number];

// Curated homepage preview: equal-height thumbnails of genuine field media.
// Prioritises children learning, volunteers teaching, women empowerment,
// cleanliness drives, team activities, and animal welfare. 3 videos max.
const galleryPreview: GalleryItem[] = [
  gallery[0],  // Bachpanshala in motion (video)
  gallery[1],  // Teaching young minds
  gallery[7],  // Volunteer field work
  gallery[2],  // Raahat Khel Mela winners
  gallery[3],  // Dignity in conversation (video)
  gallery[8],  // Learning together
  gallery[9],  // Creative workshop
  gallery[4],  // Clean Bhopal drive
  gallery[5],  // Clothes and shoes support
  gallery[6],  // Everyday care (animal welfare)
  gallery[10], // Children learning together
  gallery[19], // Five years of showing up (video)
];

function GalleryMediaTile({
  item,
  className = "",
}: {
  item: GalleryItem;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[1rem] bg-[#dfe6d6] quiet-shadow ${className}`}
    >
      <Image
        src={item.type === "video" ? item.poster! : item.src}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      {item.type === "video" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/92 shadow transition duration-200 group-hover:scale-110">
            <Play size={15} className="ml-0.5 text-[var(--leaf)]" fill="currentColor" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function GalleryMini() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <SectionLabel>Proof from the ground</SectionLabel>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-[720] leading-[0.98]">
              Every moment matters.
            </h2>
            <a
              href="/gallery"
              className="focus-ring hidden shrink-0 items-center gap-1.5 rounded-full px-1 py-2 text-sm font-bold text-[var(--leaf-deep)] transition hover:translate-x-0.5 sm:inline-flex"
            >
              View Complete Gallery
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <motion.div
          {...fadeUp}
          className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6"
        >
          {galleryPreview.map((item) => (
            <GalleryMediaTile
              key={item.src}
              item={item}
              className="aspect-square sm:aspect-[4/5]"
            />
          ))}
        </motion.div>

        <motion.div {...fadeUp} className="mt-5 flex justify-center sm:hidden">
          <a
            href="/gallery"
            className="focus-ring inline-flex items-center gap-1.5 text-sm font-bold text-[var(--leaf-deep)]"
          >
            View Complete Gallery
            <ArrowRight size={16} />
          </a>
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
              We Care&apos;s digital platform is supported by VFinite, helping organizations strengthen their online presence and community impact.
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

function FinalCTA() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-[2rem] bg-[var(--leaf)] px-6 py-16 text-center text-white sm:px-16"
        >
          <div className="relative z-10">
            <h2 className="text-[clamp(2.2rem,5vw,4.4rem)] font-[720] leading-[0.95]">Every child, every drive, every life changed — starts with you.</h2>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-white/82">
              Your time, your voice, your contribution — thats how a classroom happens, how a street gets cleaned, how a life feels seen.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/volunteer" variant="primary" className="!bg-white !text-[var(--leaf)] hover:!bg-white/90">
                Volunteer With Us
                <Users size={18} />
              </ButtonLink>
              <ButtonLink href={brand.donationUrl} variant="secondary" className="!border-white/40 !text-white hover:!bg-white/12">
                Make a Donation
                <HeartHandshake size={18} />
              </ButtonLink>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/8 to-transparent" />
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
          <ButtonLink href={`mailto:${brand.contactEmail}`}>
            <Mail size={18} />
            Email
          </ButtonLink>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl justify-center border-t border-white/12 pt-5 text-center text-xs font-extrabold uppercase tracking-[0.16em] text-white/64">
        Digital platform powered by{' '}
        <a className="focus-ring ml-1 rounded-full transition hover:text-white" href="https://www.vfinite.com/" target="_blank" rel="noreferrer">
          VFinite
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
        <WhoWeAre />
        <Programs />
        <ImpactStrip />
        <FeaturedStory />
        <GalleryMini />
        <FinalCTA />
        <TechnologyPartner />
      </main>
      <Footer />
    </>
  );
}
