"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Play, X, Users, HeartHandshake, Quote } from "lucide-react";
import { brand } from "@/content/brand";
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
];

const chapterData = [
  {
    title: "Bachpanshala",
    kicker: "Education",
    image: "/site-media/photos/01-c-ffn9xv27m.jpg",
    preview: "A weekend classroom that became a second home for children who would otherwise miss school. Every Sunday, learning, meals, and mentorship come together.",
    full: "The first students arrived barefoot. Not because they had no shoes, but because they had never been told a classroom required them. That Sunday morning, a volunteer tied a pair of donated laces and said, \"You are here to learn. That is all that matters.\" From that moment, Bachpanshala stopped being just a tutoring session. It became a place where dignity was the first lesson. Children who started with no supplies now arrive with notebooks, pencils, and questions. Volunteers teach academics in the morning, then stay for art, music, and conversations about what the children want to become. The 19 medals won at the Raahat Khel Mela in 2025 were not a surprise to anyone who had watched these children show up, Sunday after Sunday, refusing to be invisible.",
    quote: "The children run to class every Sunday. That joy is the real impact.",
    quoteName: "WeCare Team Member",
    impact: "100+ children enrolled",
    image2: "/site-media/photos/24-ctcdvvbmzg1.jpg",
  },
  {
    title: "Women Empowerment",
    kicker: "Women empowerment",
    image: "/site-media/photos/35-dkpitkvie-c.jpg",
    preview: "Safe spaces where women speak openly, learn without shame, and support each other through menstrual hygiene drives and health workshops.",
    full: "The room was quiet at first. Women sat with their heads down, hands folded, unsure what was safe to say. The topic was menstruation, and for most of them, it was the first time anyone had invited them to speak about it out loud. A volunteer from Raahat started the conversation by sharing her own story — the cramps she hid, the shame she carried, the questions she never asked. One by one, hands went up. By the end of the session, women were talking openly about pain, hygiene, childbirth, and the things they had been told to keep private. That workshop changed more than knowledge. It changed what these women believed they were allowed to say. Today, some of those same women lead the conversations themselves, standing in front of a room full of faces that remind them of where they started.",
    quote: "We speak about things that were never discussed before. That is progress.",
    quoteName: "Community Member",
    impact: "1,000+ pads distributed",
    image2: "/site-media/photos/36-dkpitkvie-c.jpg",
  },
  {
    title: "Animal Welfare",
    kicker: "Animal welfare",
    image: "/site-media/photos/44-c3kgncwpakn.jpg",
    preview: "Regular feeding, rescue coordination, and medical aid for street animals across Bhopal. Consistent compassion, week after week.",
    full: "The dog had been limping for three days before anyone noticed. Not because people were unkind, but because on a street where survival is daily, a limping animal blends into the background. A WeCare volunteer spotted her near a construction site, one paw swollen, too weak to stand. Within an hour, they had arranged transport to a vet, covered the treatment from their own pocket, and set up a feeding spot nearby. That is how most of the animal welfare work happens here. Not through funded campaigns or organized rescue missions. A volunteer sees something, makes a call, shows up. Over time, those small acts became a routine: weekly feeding rounds across multiple neighborhoods, a network of emergency contacts, and a growing group of people who refuse to look away. The dog recovered. She still visits the feeding spot every evening.",
    quote: "Small, regular acts of kindness, week after week.",
    quoteName: "WeCare Volunteer",
    impact: "Weekly feeding across neighborhoods",
    image2: "/site-media/photos/44-c3kgncwpakn.jpg",
  },
  {
    title: "Cleanliness Drives",
    kicker: "Environment",
    image: "/site-media/photos/12-dwcsdbhe1vr.jpg",
    preview: "Community-led plastic clean-ups, waste segregation awareness, and public space restoration across Bhopal.",
    full: "Manuabhan Tekri is a small hill on the outskirts of Bhopal, the kind of place people visit for a view and leave carrying plastic bags. By the time WeCare volunteers arrived for the JAGRITI drive, the slope was buried under years of discarded bottles, wrappers, and broken household waste. No one had asked for permission to clean it. They just showed up with gloves and sacks. By midday, they had filled over a dozen bags. The final count was 175 kilograms of plastic removed from that single location in one morning. Passersby stopped to watch. Some joined. A few local residents started sweeping the path near their own homes. That is the real outcome of a cleanliness drive. Not the weight of the waste collected, but the moment a person who never thought about plastic looks at the ground and decides to pick something up.",
    quote: "175 kg of plastic removed in a single morning at Manuabhan Tekri.",
    quoteName: "JAGRITI Volunteer",
    impact: "175 kg waste collected",
    image2: "/site-media/photos/163-dwcsdbhe1vr.jpg",
  },
];

const videoItems = [
  {
    src: "/site-media/videos/33-ctcdvvbmzg1.mp4",
    poster: "/site-media/photos/24-ctcdvvbmzg1.jpg",
    title: "Bachpanshala in motion",
    caption: "Children learning, playing, and growing at WeCare's weekend classroom.",
    category: "Education",
  },
  {
    src: "/site-media/videos/40-dkpitkvie-c.mp4",
    poster: "/site-media/photos/35-dkpitkvie-c.jpg",
    title: "Dignity in conversation",
    caption: "A women empowerment workshop where silence turned into dialogue.",
    category: "Women Empowerment",
  },
  {
    src: "/site-media/videos/153-ctcdvvbmzg1.mp4",
    poster: "/site-media/photos/24-ctcdvvbmzg1.jpg",
    title: "Five years of showing up",
    caption: "Volunteers, classrooms, and community — five years of consistent care.",
    category: "Volunteer Activity",
  },
];

function StoriesHero() {
  return (
    <section className="bg-[var(--ink)] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <SectionLabel>Real stories</SectionLabel>
            <h1 className="text-[clamp(2.8rem,6.5vw,5.8rem)] font-[720] leading-[0.92]">
              Stories from the ground.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">
              Every classroom session, awareness drive, rescue effort, and volunteer hour creates a story worth sharing.
            </p>
          </div>
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[#3a5a45] media-shadow">
              <Image src="/site-media/photos/01-c-ffn9xv27m.jpg" alt="A WeCare volunteer teaching children at Bachpanshala" fill sizes="40vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-12">
                <p className="text-sm font-medium leading-snug text-white/90 italic">&ldquo;We came to teach. We stayed to learn.&rdquo;</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/10 px-2 py-2 text-center">
                <div className="text-sm font-black text-[var(--sun)]">100+</div>
                <div className="text-[0.55rem] font-bold uppercase tracking-[0.06em] text-white/60">Volunteers Featured</div>
              </div>
              <div className="rounded-lg bg-white/10 px-2 py-2 text-center">
                <div className="text-sm font-black text-[var(--sun)]">20+</div>
                <div className="text-[0.55rem] font-bold uppercase tracking-[0.06em] text-white/60">Community Drives</div>
              </div>
              <div className="rounded-lg bg-white/10 px-2 py-2 text-center">
                <div className="text-sm font-black text-[var(--sun)]">1,000+</div>
                <div className="text-[0.55rem] font-bold uppercase tracking-[0.06em] text-white/60">Lives Impacted</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedStory() {
  const [expanded, setExpanded] = useState(false);
  const story = stories[0];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-[#dfe6d6] media-shadow">
            <Image src={story.image} alt={story.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--rose)]">{story.kicker}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.5vw,3rem)] font-[720] leading-[0.98]">{story.title}</h2>
            <p className="mt-4 leading-7 text-[#5c665e]">{story.copy}</p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-[#fff8e4] p-3 text-center">
                <div className="text-xl font-black text-[var(--leaf-deep)]">50+</div>
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.06em] text-[#667066]">Students</div>
              </div>
              <div className="rounded-xl bg-[#fff8e4] p-3 text-center">
                <div className="text-xl font-black text-[var(--leaf-deep)]">100+</div>
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.06em] text-[#667066]">Sessions</div>
              </div>
              <div className="rounded-xl bg-[#fff8e4] p-3 text-center">
                <div className="text-xl font-black text-[var(--leaf-deep)]">Community</div>
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.06em] text-[#667066]">Supported</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]"
            >
              {expanded ? "Show Less" : "Read Full Story"}
              <ArrowRight size={18} className={`transition ${expanded ? "rotate-90" : ""}`} />
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-8 grid gap-8 rounded-[1.6rem] border border-black/8 bg-[#fbfaf4] p-6 sm:p-8 lg:grid-cols-2">
                <div className="space-y-4 text-base leading-7 text-[#4f5d54]">
                  <p>The first time a Bachpanshala child raised her hand to answer a question, the volunteer teacher nearly cried. Not because the answer was extraordinary — it was a simple spelling exercise — but because that same child had spent the first three weeks staring at the floor, unwilling to speak.</p>
                  <p>That moment changed everything for the volunteers running WeCare's weekend classroom. They realized the children showing up every Sunday were not just lacking textbooks. They were lacking someone who believed they could learn. So the classroom became more than a lesson. It became a place where a child could be seen.</p>
                  <p>Weeks turned into months. The children who once whispered began to read aloud. Volunteers who came for a single session kept returning. By 2025, when those same children walked onto a field at the Raahat Khel Mela and won 19 medals, no one was surprised. The medals were never really about sports. They were about what happens when a child finally believes they matter.</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[#dfe6d6]">
                  <Image src="/site-media/photos/07-dh1cf3boaim.jpg" alt="Raahat Khel Mela winners" fill sizes="50vw" className="object-cover" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function StoryChapter({ chapter, index }: { chapter: (typeof chapterData)[number]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isReversed = index % 2 === 1;

  return (
    <motion.div {...fadeUp}>
      <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isReversed ? "" : ""}`}>
        <div className={`${isReversed ? "lg:order-2" : ""}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-[#dfe6d6] media-shadow">
            <Image src={chapter.image} alt={chapter.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          {chapter.image2 !== chapter.image && (
            <div className={`relative mt-[-1.5rem] ${isReversed ? "ml-auto mr-3" : "ml-3"} w-3/5 overflow-hidden rounded-[1rem] border-4 border-white bg-[#dfe6d6] quiet-shadow`}>
              <div className="relative aspect-[4/3]">
                <Image src={chapter.image2} alt={`${chapter.title} additional`} fill sizes="30vw" className="object-cover" />
              </div>
            </div>
          )}
        </div>

        <div className={`${isReversed ? "lg:order-1" : ""}`}>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
            <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
            {chapter.kicker}
          </div>
          <h3 className="text-[clamp(1.6rem,3vw,2.8rem)] font-[720] leading-[0.98]">{chapter.title}</h3>
          <p className="mt-4 leading-7 text-[#5c665e]">{chapter.preview}</p>

          <div className="mt-5 rounded-[1.2rem] border-l-4 border-[var(--leaf)] bg-[#f4f1e8] p-4">
            <Quote size={16} className="mb-1 text-[var(--leaf)]" />
            <p className="text-sm font-bold leading-6 italic text-[#4f5d54]">&ldquo;{chapter.quote}&rdquo;</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.1em] text-[var(--leaf-deep)]">{chapter.quoteName}</p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full bg-[#f1c84b]/22 px-3 py-1 text-xs font-black text-[var(--leaf-deep)]">{chapter.impact}</span>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 text-sm font-black text-white uppercase tracking-[0.02em] transition-colors hover:bg-[var(--leaf-deep)]"
          >
            {expanded ? "Show Less" : "Read More"}
            <ArrowRight size={18} className={`transition ${expanded ? "rotate-90" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 rounded-[1.4rem] border border-black/8 bg-[#fbfaf4] p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-4 text-base leading-7 text-[#4f5d54]">
                  <p>{chapter.full}</p>
                  <div className="mt-4">
                    <ButtonLink href={brand.donationUrl}>
                      Support {chapter.title}
                      <ArrowRight size={18} />
                    </ButtonLink>
                  </div>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-[#dfe6d6]">
                  <Image src={chapter.image2} alt={chapter.title} fill sizes="40vw" className="object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StoryChapters() {
  return (
    <section className="overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-14 max-w-3xl">
          <SectionLabel>Documentary</SectionLabel>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-[720] leading-[0.95]">Story chapters</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5a665e]">
            Four programs. Four stories. One community choosing to show up, week after week.
          </p>
        </motion.div>

        <div className="space-y-20">
          {chapterData.map((chapter, index) => (
            <StoryChapter key={chapter.title} chapter={chapter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VoicesSection() {
  return (
    <section className="bg-[#f4f1e8] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 max-w-3xl">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-[720] leading-[0.98]">Voices of WeCare</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-[1.4rem] bg-white p-5 quiet-shadow sm:p-6"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#dfe6d6]">
                <Image src={t.src} alt={t.name} fill className="object-cover" />
              </div>
              <div>
                <blockquote className="text-base leading-7 text-[var(--ink)]">&ldquo;{t.quote}&rdquo;</blockquote>
                <p className="mt-2 text-sm font-extrabold text-[var(--ink)]">{t.name}</p>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.06em] text-[#7a847c]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoStoriesSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 max-w-3xl">
          <SectionLabel>Video stories</SectionLabel>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-[720] leading-[0.95]">Moments that moved us.</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {videoItems.map((video, i) => (
            <motion.div
              key={video.src}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
            >
              <button
                type="button"
                onClick={() => setActiveVideo(video.src)}
                className="group relative w-full cursor-pointer overflow-hidden rounded-[1.4rem] bg-[#dfe6d6] media-shadow text-left"
              >
                <div className="relative aspect-[16/9]">
                  <video src={video.src} poster={video.poster} muted loop playsInline className="h-full w-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/92 shadow-lg transition duration-200 group-hover:scale-110">
                      <Play size={22} className="ml-1 text-[var(--leaf)]" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </button>
              <div className="mt-4">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--rose)]">{video.category}</p>
                <p className="mt-1 text-lg font-extrabold">{video.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#5a665e]">{video.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-2 sm:p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div className="relative flex w-full max-w-5xl items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <video
                  key={activeVideo}
                  src={activeVideo}
                  poster={videoItems.find((v) => v.src === activeVideo)?.poster}
                  controls
                  autoPlay
                  className="max-h-[85vh] w-full rounded-2xl"
                />
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute -top-10 right-0 flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white"
              >
                <X size={14} />
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="bg-[var(--ink)] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 max-w-3xl">
          <SectionLabel>Impact</SectionLabel>
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-[720] leading-[0.95]">
            What these stories created.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div {...fadeUp} className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6">
            <div className="text-4xl font-black text-[var(--sun)]">100+</div>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-white/60">Active Volunteers</p>
            <p className="mt-3 text-sm leading-6 text-white/70">Volunteers who teach, clean, feed, and show up every week across Bhopal.</p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.06 }} className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6">
            <div className="text-4xl font-black text-[var(--sun)]">20+</div>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-white/60">Regular Drives</p>
            <p className="mt-3 text-sm leading-6 text-white/70">Cleanliness drives, hygiene workshops, and community events every year.</p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6">
            <div className="text-4xl font-black text-[var(--sun)]">1,000+</div>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-white/60">Lives Impacted</p>
            <p className="mt-3 text-sm leading-6 text-white/70">Children, women, families, and street animals touched by consistent care.</p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.18 }} className="rounded-[1.4rem] border border-white/12 bg-white/8 p-6">
            <div className="text-4xl font-black text-[var(--sun)]">∞</div>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-white/60">Community Moments</p>
            <p className="mt-3 text-sm leading-6 text-white/70">Shared meals, conversations, medals, and small victories that add up.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-[2rem] px-6 py-20 text-center text-white sm:px-16"
        >
          <div className="absolute inset-0 bg-[var(--ink)]">
            <Image src="/site-media/photos/07-dh1cf3boaim.jpg" alt="WeCare field work" fill className="object-cover opacity-40" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--ink)]/40 to-[var(--ink)]/70" />

          <div className="relative z-10">
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-[720] leading-[0.95]">
              The next story starts with someone showing up.
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={brand.volunteerUrl}>
                Become a Volunteer
                <Users size={18} />
              </ButtonLink>
              <ButtonLink href={brand.donationUrl} variant="primary">
                Support a Program
                <HeartHandshake size={18} />
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function StoriesPage() {
  return (
    <>
      <div className="pt-16 lg:pt-20" />
      <StoriesHero />
      <FeaturedStory />
      <StoryChapters />
      <VoicesSection />
      <VideoStoriesSection />
      <ImpactSection />
      <FinalCTA />
    </>
  );
}
