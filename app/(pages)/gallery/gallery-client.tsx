"use client";

import { useState, useMemo, useCallback } from "react";
import type { GalleryMedia } from "@/lib/gallery-data";
import GalleryHero from "./components/GalleryHero";
import GalleryFilters from "./components/GalleryFilters";
import EditorialGrid from "./components/EditorialGrid";
import GalleryViewer from "./components/GalleryViewer";
import BottomStrip from "./components/BottomStrip";

export default function GalleryClient({ allItems }: { allItems: GalleryMedia[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [loaded, setLoaded] = useState(12);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return allItems;
    return allItems.filter((item) => item.category === activeCategory);
  }, [allItems, activeCategory]);

  const visible = useMemo(
    () => filtered.slice(0, loaded),
    [filtered, loaded],
  );

  const hasMore = loaded < filtered.length;

  const handleLoadMore = useCallback(() => {
    setLoaded((prev) => Math.min(prev + 12, filtered.length));
  }, [filtered.length]);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setLoaded(12);
  }, []);

  const currentViewerItem =
    viewerIndex !== null && viewerIndex < filtered.length
      ? filtered[viewerIndex]
      : null;

  return (
    <>
      <div className="pt-8 lg:pt-10" />

      <GalleryHero />

      <GalleryFilters
        active={activeCategory}
        onChange={handleCategoryChange}
      />

      <div className="pt-10" />

      <EditorialGrid
        items={visible}
        loaded={loaded}
        onLoadMore={handleLoadMore}
        onOpen={(idx) => {
          const globalIdx = filtered.indexOf(visible[idx]);
          setViewerIndex(globalIdx !== -1 ? globalIdx : idx);
        }}
        hasMore={hasMore}
      />

      <BottomStrip />

      {currentViewerItem && (
        <GalleryViewer
          item={currentViewerItem}
          onClose={() => setViewerIndex(null)}
          onPrev={() =>
            setViewerIndex((prev) =>
              prev !== null && prev > 0 ? prev - 1 : prev,
            )
          }
          onNext={() =>
            setViewerIndex((prev) =>
              prev !== null && prev < filtered.length - 1 ? prev + 1 : prev,
            )
          }
          hasPrev={viewerIndex !== null && viewerIndex > 0}
          hasNext={viewerIndex !== null && viewerIndex < filtered.length - 1}
        />
      )}
    </>
  );
}
