"use client";

import { useState, useMemo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import type { CuratedEntry } from "@/content/curated-gallery";
import { editorialImages as allPhotos, videos as allVideos } from "@/content/curated-gallery";
import GalleryHero from "./components/GalleryHero";
import EditorialGrid from "./components/EditorialGrid";
import StoriesInMotion from "./components/StoriesInMotion";
import GalleryViewer from "./components/GalleryViewer";

const ARCHIVE_PAGE = 24;

export default function GalleryClient({ archiveItems }: { archiveItems: CuratedEntry[] }) {
  const [loadCount, setLoadCount] = useState(0);
  const [viewerIdx, setViewerIdx] = useState<number | null>(null);
  const [videoViewer, setVideoViewer] = useState<CuratedEntry | null>(null);

  const allVisible = useMemo(() => {
    if (loadCount === 0) return allPhotos;
    return [...allPhotos, ...archiveItems.slice(0, loadCount)];
  }, [loadCount, archiveItems]);

  const hasMore = loadCount < archiveItems.length;

  const handleLoadMore = useCallback(() => {
    setLoadCount((prev) => Math.min(prev + ARCHIVE_PAGE, archiveItems.length));
  }, [archiveItems.length]);

  const currentViewerItem =
    viewerIdx !== null && viewerIdx < allVisible.length
      ? allVisible[viewerIdx]
      : null;

  return (
    <>
      <div className="pt-6 lg:pt-8" />

      <GalleryHero />

      <div className="pt-6 lg:pt-8" />

      <EditorialGrid
        items={allVisible}
        onOpen={(idx) => setViewerIdx(idx)}
      />

      <div className="pt-14 lg:pt-16" />

      <StoriesInMotion
        videos={allVideos}
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
