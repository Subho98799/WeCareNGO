"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import type { CuratedEntry } from "@/content/curated-gallery";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export default function StoriesInMotion({
  videos,
  onPlay,
}: {
  videos: CuratedEntry[];
  onPlay: (item: CuratedEntry) => void;
}) {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp}>
          <h2 className="text-[clamp(1.2rem,2.5vw,1.8rem)] font-[720] leading-[0.92] tracking-tight">
            Stories in Motion
          </h2>
        </motion.div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-6 lg:gap-5">
          {videos.map((video, i) => (
            <motion.div
              key={video.src}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
            >
              <button
                type="button"
                onClick={() => onPlay(video)}
                className="group relative w-full cursor-pointer overflow-hidden rounded-[1.2rem] bg-[#dfe6d6] shadow-sm transition-shadow duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--leaf)] focus-visible:ring-offset-2"
              >
                <div className="relative aspect-video w-full">
                  <Image
                    src={video.poster || video.src}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />

                  <div className="absolute inset-0 bg-black/5 transition duration-300 group-hover:bg-black/20" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-sm transition duration-300 group-hover:scale-105 group-hover:bg-white group-hover:shadow-md lg:h-14 lg:w-14">
                      <Play size={20} className="ml-0.5 lg:size-[22px]" />
                    </div>
                  </div>

                  <p className="absolute bottom-2 left-2 right-2 translate-y-1 text-xs font-extrabold leading-tight text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 drop-shadow-sm lg:bottom-3 lg:left-3 lg:text-sm">
                    {video.title}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
