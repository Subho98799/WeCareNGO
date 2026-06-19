"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Play, ArrowRight } from "lucide-react";
import { brand } from "@/content/brand";

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

export default function AboutPage() {
  return (
    <>
      <WhoWeAreSection />
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.4rem] border border-black/8 bg-white/70 p-6 quiet-shadow">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
                <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
                Mission
              </div>
              <h2 className="text-2xl font-extrabold text-[var(--ink)]">To educate, empower, and care.</h2>
              <p className="mt-3 leading-7 text-[#5a665e]">
                WeCare exists to create real, visible change in Bhopal through education, women empowerment, animal welfare, and community-led environment drives.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-black/8 bg-white/70 p-6 quiet-shadow">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
                <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
                Vision
              </div>
              <h2 className="text-2xl font-extrabold text-[var(--ink)]">A caring, dignified Bhopal for all.</h2>
              <p className="mt-3 leading-7 text-[#5a665e]">
                A Bhopal where every child learns, every woman is heard, every street animal is cared for, and every public space is clean and safe.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-black/8 bg-white/70 p-6 quiet-shadow">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
                <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
                Values
              </div>
              <h2 className="text-2xl font-extrabold text-[var(--ink)]">Showing up, every step.</h2>
              <p className="mt-3 leading-7 text-[#5a665e]">
                Kindness, consistency, dignity, and transparency guide everything WeCare does. We believe small, steady work builds trust that lasts.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
