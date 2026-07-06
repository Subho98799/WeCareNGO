"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Heart, MessageCircle, Calendar } from "lucide-react";
import { useEffect } from "react";
import type { GalleryMedia } from "@/lib/gallery-data";

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function GalleryViewer({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  item: GalleryMedia;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 backdrop-blur-md sm:p-4"
        onClick={onClose}
      >
        <div
          className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[#111] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex-1 bg-black">
            {item.type === "video" ? (
              <video
                key={item.src}
                className="max-h-[68vh] w-full object-contain"
                src={item.src}
                poster={item.poster}
                controls
                autoPlay
              />
            ) : (
              <div className="relative flex items-center justify-center p-4">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={1200}
                  height={900}
                  className="max-h-[68vh] w-auto rounded-lg object-contain"
                />
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-[#1a1a1a] px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[0.5rem] font-black uppercase tracking-[0.12em] text-white/80 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E1306C] animate-pulse" />
                    {item.category}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-extrabold text-white">
                  {item.title}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <Heart size={13} />
                    {formatCount(Math.floor(200 + Math.random() * 800))} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={13} />
                    {formatCount(Math.floor(20 + Math.random() * 80))} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {item.type === "video" ? item.duration : "Photo"}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {hasPrev && (
                  <button
                    type="button"
                    onClick={onPrev}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}
                {hasNext && (
                  <button
                    type="button"
                    onClick={onNext}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
                    aria-label="Next"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
