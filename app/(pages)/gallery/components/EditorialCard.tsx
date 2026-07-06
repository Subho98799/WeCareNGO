"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useRef, useEffect } from "react";
import type { GalleryMedia } from "@/lib/gallery-data";

export default function EditorialCard({
  item,
  span,
  aspect,
  onClick,
}: {
  item: GalleryMedia;
  span: number;
  aspect: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ gridColumn: `span ${span}` }}
      className={`group relative cursor-pointer overflow-hidden rounded-[1.2rem] bg-[#dfe6d6] quiet-shadow transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(30,48,39,0.14)] ${
        aspect === "portrait"
          ? "aspect-[3/4]"
          : aspect === "tall"
            ? "aspect-[9/16]"
            : aspect === "wide"
              ? "aspect-[16/9]"
              : aspect === "square"
                ? "aspect-square"
                : "aspect-[4/3]"
      }`}
    >
      {item.type === "video" ? (
        <VideoMedia item={item} />
      ) : (
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes={
            span >= 8
              ? "(max-width: 1024px) 100vw, 66vw"
              : span >= 6
                ? "(max-width: 1024px) 100vw, 50vw"
                : span >= 4
                  ? "(max-width: 1024px) 50vw, 33vw"
                  : "(max-width: 768px) 50vw, 25vw"
          }
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

      {/* Bottom-left info */}
      <div className="absolute bottom-3 left-3 right-3 translate-y-2 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center gap-1.5">
          {item.type === "video" ? (
            <Play size={12} className="shrink-0" />
          ) : (
            <CameraIcon />
          )}
          <span className="text-[0.55rem] font-black uppercase tracking-[0.1em] text-white/80">
            {item.category}
          </span>
        </div>
        <p className="mt-0.5 text-sm font-extrabold leading-tight text-white">
          {item.title}
        </p>
      </div>

      {/* Video duration badge */}
      {item.type === "video" && item.duration && (
        <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-1.5 py-0.5 text-[0.5rem] font-black text-white backdrop-blur">
          {item.duration}
        </div>
      )}
    </button>
  );
}

function CameraIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function VideoMedia({ item }: { item: GalleryMedia }) {
  const ref = useRef<HTMLVideoElement>(null);

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
  }, []);

  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster}
      muted
      loop
      playsInline
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
  );
}
