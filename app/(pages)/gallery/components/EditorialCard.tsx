"use client";

import Image from "next/image";
import type { CuratedEntry } from "@/content/curated-gallery";

export default function EditorialCard({
  item,
  onClick,
  aspectClass,
}: {
  item: CuratedEntry;
  onClick: () => void;
  aspectClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full cursor-pointer overflow-hidden rounded-[1.2rem] bg-[#dfe6d6] shadow-sm transition-shadow duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--leaf)] focus-visible:ring-offset-2"
    >
      <div className={`relative w-full ${aspectClass}`}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <p className="absolute bottom-2 left-2 right-2 translate-y-1 text-xs font-extrabold leading-tight text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:bottom-3 lg:left-3 lg:text-sm">
          {item.title}
        </p>
      </div>
    </button>
  );
}
