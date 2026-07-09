"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { CuratedEntry } from "@/content/curated-gallery";
import { editorialImages as allPhotos, videos as allVideos } from "@/content/curated-gallery";
import GalleryHero from "./components/GalleryHero";
import GalleryFilters from "./components/GalleryFilters";
import EditorialGrid from "./components/EditorialGrid";
import StoriesInMotion from "./components/StoriesInMotion";
import GalleryViewer from "./components/GalleryViewer";

const ARCHIVE_PAGE = 24;

export default function GalleryClient({ archiveItems }: { archiveItems: CuratedEntry[] }) {
  const [loadCount, setLoadCount] = useState(0);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);
  const [videoViewer, setVideoViewer] = useState<CuratedEntry | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const allVisible = useMemo(() => {
    const items = loadCount === 0 ? allPhotos : [...allPhotos, ...archiveItems.slice(0, loadCount)];
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [loadCount, archiveItems, activeCategory]);

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") return allVideos;
    return allVideos.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  const hasMore = useMemo(() => {
    const archiveInCategory: CuratedEntry[] =
      activeCategory === "All"
        ? archiveItems
        : archiveItems.filter((item) => item.category === activeCategory);
    const loadedArchiveOfCategory = archiveItems
      .slice(0, loadCount)
      .filter((item) => activeCategory === "All" || item.category === activeCategory)
      .length;
    return loadedArchiveOfCategory < archiveInCategory.length;
  }, [archiveItems, activeCategory, loadCount]);

  const isViewerOpen = viewerIdx !== null || videoViewer !== null;
  const closeAllViewers = useCallback(() => {
    setViewerIdx(null);
    setVideoViewer(null);
  }, []);

  useEffect(() => {
    if (!isViewerOpen) return;
    history.pushState(null, "");
    window.addEventListener("popstate", closeAllViewers);
    return () => window.removeEventListener("popstate", closeAllViewers);
  }, [isViewerOpen, closeAllViewers]);

  const handleLoadMore = useCallback(() => {
    setLoadCount((prev) => Math.min(prev + ARCHIVE_PAGE, archiveItems.length));
  }, [archiveItems.length]);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setViewerIdx(null);
  }, []);

  const currentViewerItem =
    viewerIdx !== null && viewerIdx < allVisible.length
      ? allVisible[viewerIdx]
      : null;

  return (
    <>
      <div className="pt-16 lg:pt-20" />

      <GalleryHero />

      <div className="pt-6 lg:pt-8" />

      <GalleryFilters active={activeCategory} onChange={handleCategoryChange} />

      <div className="pt-6 lg:pt-8" />

      <EditorialGrid
        items={allVisible}
        onOpen={(idx) => setViewerIdx(idx)}
      />

      <div className="pt-14 lg:pt-16" />

      <StoriesInMotion
        videos={filteredVideos}
        onPlay={(video) => setVideoViewer(video)}
      />

      {hasMore && (
        <div className="flex justify-center px-4 pb-20 pt-10">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.06em] text-[var(--ink)] transition-all duration-300 hover:border-[var(--leaf)] hover:text-[var(--leaf)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--leaf)] focus-visible:ring-offset-2"
          >
            Load More
            <ChevronDown size={14} />
          </button>
        </div>
      )}

      {currentViewerItem && viewerIdx !== null && (
        <GalleryViewer
          item={currentViewerItem}
          onClose={() => setViewerIdx(null)}
          onPrev={() =>
            setViewerIdx((prev) =>
              prev !== null && prev > 0 ? prev - 1 : prev,
            )
          }
          onNext={() =>
            setViewerIdx((prev) =>
              prev !== null && prev < allVisible.length - 1 ? prev + 1 : prev,
            )
          }
          hasPrev={viewerIdx !== null && viewerIdx > 0}
          hasNext={viewerIdx !== null && viewerIdx < allVisible.length - 1}
        />
      )}

      {videoViewer && (
        <GalleryViewer
          item={videoViewer}
          onClose={() => setVideoViewer(null)}
          onPrev={() => {}}
          onNext={() => {}}
          hasPrev={false}
          hasNext={false}
        />
      )}
    </>
  );
}
