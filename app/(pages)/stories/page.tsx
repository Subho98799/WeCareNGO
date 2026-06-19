"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { stories } from "@/content/site-content";

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

export default function StoriesPage() {
  return (
    <>
      <div className="pt-16 lg:pt-20" />
      <StorySection />
    </>
  );
}
