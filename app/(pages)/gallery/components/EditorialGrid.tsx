"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { GalleryMedia } from "@/lib/gallery-data";
import { buildLayout } from "@/lib/gallery-data";
import EditorialCard from "./EditorialCard";
import QuoteCard from "./QuoteCard";
import LoadMoreButton from "./LoadMoreButton";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

export default function EditorialGrid({
  items,
  loaded,
  onLoadMore,
  onOpen,
  hasMore,
}: {
  items: GalleryMedia[];
  loaded: number;
  onLoadMore: () => void;
  onOpen: (index: number) => void;
  hasMore: boolean;
}) {
  const { rows, totalSlots } = useMemo(() => buildLayout(items.length), [items.length]);

  let mediaIdx = 0;

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {loaded === 0 ? (
          <SkeletonGrid rows={4} />
        ) : (
          <>
            {rows.map((row, ri) => (
              <motion.div
                key={ri}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: ri * 0.06 }}
                className="mb-4 grid grid-cols-12 gap-4"
              >
                {row.slots.map((slot, si) => {
                  if (slot.type === "quote") {
                    return <QuoteCard key={`q-${ri}-${si}`} index={ri} />;
                  }
                  const item = items[mediaIdx];
                  if (!item) return null;
                  const idx = mediaIdx;
                  mediaIdx++;
                  return (
                    <EditorialCard
                      key={item.id}
                      item={item}
                      span={slot.span}
                      aspect={slot.aspect}
                      onClick={() => onOpen(idx)}
                    />
                  );
                })}
              </motion.div>
            ))}
            {hasMore && (
              <LoadMoreButton onClick={onLoadMore} loading={false} />
            )}
          </>
        )}
      </div>
    </section>
  );
}

function SkeletonGrid({ rows: count }: { rows: number }) {
  const skeletonRows = useMemo(() => {
    const { rows } = buildLayout(count * 4);
    return rows.slice(0, count);
  }, [count]);

  return (
    <>
      {skeletonRows.map((row, ri) => (
        <div key={ri} className="mb-4 grid grid-cols-12 gap-4">
          {row.slots.map((slot, si) => (
            <div
              key={si}
              style={{ gridColumn: `span ${slot.span}` }}
              className={`animate-pulse rounded-[1.2rem] bg-[#dfe6d6] ${
                slot.aspect === "portrait"
                  ? "aspect-[3/4]"
                  : slot.aspect === "tall"
                    ? "aspect-[9/16]"
                    : slot.aspect === "wide"
                      ? "aspect-[16/9]"
                      : slot.aspect === "square"
                        ? "aspect-square"
                        : "aspect-[4/3]"
              }`}
            />
          ))}
        </div>
      ))}
    </>
  );
}
