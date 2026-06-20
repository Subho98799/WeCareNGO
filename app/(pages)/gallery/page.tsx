"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/content/site-content";

type GalleryItem = (typeof gallery)[number];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const allMedia = [...gallery].reverse();

function useInViewAutoplay(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

function VideoCard({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useInViewAutoplay(ref);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      className={className}
    />
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

function MediaCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-[1.2rem] bg-[#dfe6d6] quiet-shadow text-left"
    >
      {item.type === "video" ? (
        <VideoCard src={item.src} poster={item.poster} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      ) : (
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-sm font-black leading-tight">{item.title}</p>
        <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-[0.1em] backdrop-blur">
          {item.type === "video" ? <Play size={9} /> : null}
          {item.category}
        </div>
      </div>
      {item.type === "video" && (
        <div className="absolute left-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-[0.1em] text-white backdrop-blur">
          <Play size={9} className="mr-0.5 inline" />
          Video
        </div>
      )}
    </button>
  );
}

function GalleryContent() {
  const [selected, setSelected] = useState<number | null>(null);

  const open = useCallback((index: number) => setSelected(index), []);
  const close = useCallback(() => setSelected(null), []);

  const go = useCallback(
    (dir: number) => {
      if (selected === null) return;
      const next = selected + dir;
      if (next < 0 || next >= allMedia.length) return;
      setSelected(next);
    },
    [selected],
  );

  useEffect(() => {
    if (selected === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, close, go]);

  const current = selected !== null ? allMedia[selected] : null;

  // Featured items
  const featuredVideo = gallery.find((m) => m.type === "video" && m.category === "Education")!;
  const featuredPhoto1 = gallery.find((m) => m.src.includes("01-c-ffn9xv27m"))!;
  const featuredPhoto2 = gallery.find((m) => m.src.includes("36-dkpitkvie-c"))!;
  const featuredSrcs = new Set([featuredVideo.src, featuredPhoto1.src, featuredPhoto2.src]);

  // Category media, excluding featured items
  const byCategory = (cat: string) => gallery.filter((m) => m.category === cat && !featuredSrcs.has(m.src));

  // Instagram feed: volunteer activity + community event media (not used in categories)
  const instagramMedia = gallery.filter(
    (m) => (m.category === "Volunteer Activity" || m.category === "Community Event") && !featuredSrcs.has(m.src),
  );

  return (
    <>
      <div className="pt-16 lg:pt-20" />

      {/* ===== HERO ===== */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <SectionLabel>Gallery</SectionLabel>
            <h1 className="text-[clamp(2.2rem,5vw,4.4rem)] font-[720] leading-[0.95]">
              The people, moments, and stories behind WeCare.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5a665e]">
              A visual archive of classrooms, field visits, volunteer initiatives, awareness drives, celebrations, and community impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED MOMENTS ===== */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp}>
            <SectionLabel>Featured Moments</SectionLabel>
          </motion.div>
          <motion.div {...fadeUp} className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <div
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-[#dfe6d6] media-shadow cursor-pointer"
              onClick={() => {
                const idx = allMedia.indexOf(featuredVideo);
                if (idx >= 0) open(idx);
              }}
            >
              <VideoCard
                src={featuredVideo.src}
                poster={featuredVideo.poster}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/18 px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.12em] backdrop-blur">
                  <Play size={11} />
                  Featured Video
                </div>
                <p className="mt-2 text-lg font-black leading-tight">{featuredVideo.title}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              {[featuredPhoto1, featuredPhoto2].map((photo) => (
                <div
                  key={photo.src}
                  className="group relative aspect-[4/3] overflow-hidden rounded-[1.2rem] bg-[#dfe6d6] quiet-shadow cursor-pointer"
                  onClick={() => {
                    const idx = allMedia.indexOf(photo);
                    if (idx >= 0) open(idx);
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-3 left-3 right-3 translate-y-2 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-black leading-tight">{photo.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="grid grid-cols-3 gap-4 rounded-[1.6rem] bg-[var(--leaf)] px-6 py-8 text-white sm:px-10">
            <div className="text-center">
              <div className="text-3xl font-black sm:text-4xl">500+</div>
              <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-white/70 sm:text-xs">Photos Archived</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black sm:text-4xl">80+</div>
              <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-white/70 sm:text-xs">Videos Shared</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black sm:text-4xl">100+</div>
              <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-white/70 sm:text-xs">Community Events</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORY SECTIONS ===== */}
      {[
        { id: "education", title: "Education", desc: "Classrooms, lessons, and the joy of learning at Bachpanshala.", items: byCategory("Education") },
        { id: "women", title: "Women Empowerment", desc: "Safe spaces for conversation, health awareness, and dignity.", items: byCategory("Women Empowerment") },
        { id: "animals", title: "Animal Welfare", desc: "Everyday care for the animals who share our streets.", items: byCategory("Animal Welfare") },
        { id: "cleanliness", title: "Cleanliness Drives", desc: "Volunteers coming together to clean and restore public spaces.", items: byCategory("Cleanliness Drive") },
        { id: "community", title: "Community Events", desc: "Celebrations, achievements, and moments that bring people together.", items: byCategory("Community Event") },
      ].map((section) =>
        section.items.length > 0 ? (
          <section key={section.id} className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <motion.div {...fadeUp}>
                <SectionLabel>{section.title}</SectionLabel>
                <p className="mt-2 max-w-lg text-base leading-7 text-[#5a665e]">{section.desc}</p>
              </motion.div>
              <motion.div {...fadeUp} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {section.items.map((item) => (
                  <MediaCard
                    key={item.src}
                    item={item}
                    onClick={() => {
                      const idx = allMedia.indexOf(item);
                      if (idx >= 0) open(idx);
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </section>
        ) : null,
      )}

      {/* ===== FROM INSTAGRAM ===== */}
      {instagramMedia.length > 0 && (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div {...fadeUp}>
              <SectionLabel>From Instagram</SectionLabel>
              <p className="mt-2 max-w-lg text-base leading-7 text-[#5a665e]">
                Recent real content from WeCare's Instagram — reels and posts from the field.
              </p>
            </motion.div>
            <motion.div {...fadeUp} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {instagramMedia.map((item) => (
                <MediaCard
                  key={item.src}
                  item={item}
                  onClick={() => {
                    const idx = allMedia.indexOf(item);
                    if (idx >= 0) open(idx);
                  }}
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {selected !== null && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-4 backdrop-blur-md"
            onClick={close}
          >
            <div
              className="relative flex max-h-[90vh] max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 bg-black">
                {current.type === "video" ? (
                  <video
                    key={current.src}
                    className="max-h-[70vh] w-full object-contain"
                    src={current.src}
                    poster={current.poster}
                    controls
                    autoPlay
                  />
                ) : (
                  <div className="relative flex items-center justify-center p-4">
                    <Image
                      src={current.src}
                      alt={current.title}
                      width={1200}
                      height={900}
                      className="max-h-[70vh] w-auto rounded-lg object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between bg-white px-5 py-4">
                <div>
                  <p className="text-sm font-black text-[var(--ink)]">{current.title}</p>
                  <p className="mt-0.5 text-xs font-black uppercase tracking-[0.1em] text-[#8a928a]">{current.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f4f1e8] transition hover:bg-[#ece6d8]"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f4f1e8] transition hover:bg-[#ece6d8]"
                    aria-label="Next"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f4f1e8] transition hover:bg-[#ece6d8]"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function GalleryPage() {
  return <GalleryContent />;
}
