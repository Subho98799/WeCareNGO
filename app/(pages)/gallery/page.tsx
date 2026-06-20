"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { gallery } from "@/content/site-content";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

const categories = [
  "All",
  "Photos",
  "Videos",
  "Education",
  "Women Empowerment",
  "Animal Welfare",
  "Cleanliness Drive",
  "Community Event",
  "Volunteer Activity",
];

const sorted = [...gallery].reverse();

function GalleryContent() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered =
    filter === "All"
      ? sorted
      : filter === "Photos"
        ? sorted.filter((m) => m.type === "photo")
        : filter === "Videos"
          ? sorted.filter((m) => m.type === "video")
          : sorted.filter((m) => m.category === filter);

  const open = useCallback(
    (index: number) => {
      const realIndex = sorted.indexOf(filtered[index]);
      setSelected(realIndex);
    },
    [filtered],
  );

  const close = useCallback(() => setSelected(null), []);

  const go = useCallback(
    (dir: number) => {
      if (selected === null) return;
      const currentFilteredIndex = filtered.indexOf(sorted[selected]);
      const next = currentFilteredIndex + dir;
      if (next < 0 || next >= filtered.length) return;
      open(next);
    },
    [selected, filtered, open],
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

  const current = selected !== null ? sorted[selected] : null;

  return (
    <>
      <div className="pt-16 lg:pt-20" />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f1c84b]/18 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--leaf-deep)]">
              <span className="h-2 w-2 rounded-full bg-[var(--sun)]" />
              Gallery
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,4.4rem)] font-[720] leading-[0.95]">
              The people, moments, and stories behind WeCare.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#5a665e]">
              A visual archive of classrooms, field visits, volunteer initiatives, awareness drives, celebrations, and community impact.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.1em] transition ${
                  filter === cat
                    ? "bg-[var(--leaf)] text-white"
                    : "bg-[#f4f1e8] text-[#5a665e] hover:bg-[#ece6d8]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className="columns-2 gap-2 sm:columns-3 lg:columns-4">
            {filtered.map((item, index) => (
              <motion.button
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => open(index)}
                className={`group relative mb-2 w-full cursor-pointer overflow-hidden rounded-[1.2rem] bg-[#dfe6d6] quiet-shadow break-inside-avoid text-left ${
                  index % 5 === 0
                    ? "aspect-[4/5.5]"
                    : index % 3 === 0
                      ? "aspect-[4/4.8]"
                      : index % 7 === 0
                        ? "aspect-[4/5.2]"
                        : "aspect-[4/4.2]"
                }`}
              >
                {item.type === "video" ? (
                  <video
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    src={item.src}
                    poster={item.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
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
              </motion.button>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-sm text-[#8a928a]">No media found for this filter.</p>
          )}
        </div>
      </section>

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
