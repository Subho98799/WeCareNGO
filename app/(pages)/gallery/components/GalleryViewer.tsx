"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";
import type { CuratedEntry } from "@/content/curated-gallery";

export default function GalleryViewer({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  item: CuratedEntry;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      onClose();
    },
    [onClose],
  );

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
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
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6 lg:p-10"
        onClick={handleBackdrop}
      >
        <div
          className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-[#181818]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex items-center justify-center bg-black p-6 sm:p-8 lg:p-10">
            {item.type === "video" ? (
              <video
                ref={videoRef}
                src={item.src}
                poster={item.poster}
                controls
                autoPlay
                className="max-h-[65vh] w-full rounded"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.title}
                width={1200}
                height={900}
                className="max-h-[65vh] w-auto rounded object-contain"
              />
            )}
          </div>

          <div className="flex items-center justify-between bg-black/50 px-5 py-2.5">
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-[var(--leaf)]/80 px-2 py-0.5 text-[0.45rem] font-black uppercase tracking-[0.12em] text-white">
                {item.category}
              </span>
              <p className="mt-0.5 text-xs font-extrabold leading-tight text-white/80">
                {item.title}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {hasPrev && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Previous"
                >
                  <ChevronLeft size={14} />
                </button>
              )}
              {hasNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Next"
                >
                  <ChevronRight size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
