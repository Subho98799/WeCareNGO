import fs from "fs";
import path from "path";
import curation, { type CuratedEntry, type GalleryCategory } from "@/content/curated-gallery";
import GalleryClient from "./gallery-client";

const CATEGORY_PATTERNS: [RegExp, GalleryCategory][] = [
  [/\b(child|learn|school|class|teach|educat|student|study|chess|art|craf|workshop|bachpan|classroom|mentor|creativ|draw|paint|curious|smile|dream|hope|young|imagin|reading|writing|bachpanshala|christmas)\b/i, "Children Education"],
  [/\b(women|woman|girl|menstrual|hygiene|pad|dignity|empower|self.?defense|skill.?share|health|conversation|sanitary|raahat|womens.?day)\b/i, "Women Empowerment"],
  [/\b(animal|dog|stray|cow|cattle|feed|rescue|pet|bird|welfare|compassion|kindness|soul|creature|dogs|puppies|feeding)\b/i, "Animal Welfare"],
];

function inferCategory(slug: string): GalleryCategory {
  for (const [re, cat] of CATEGORY_PATTERNS) {
    if (re.test(slug)) return cat;
  }
  return "Other Initiatives";
}

function slugToTitle(slug: string): string {
  return slug
    .split(/[-_]+/g)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 60);
}

export default function GalleryPage() {
  const dir = path.join(process.cwd(), "public", "site-media", "website_media", "gallery", "large");
  let archiveItems: CuratedEntry[] = [];

  try {
    const allFiles = fs.readdirSync(dir).filter((f) => f.endsWith(".webp") || f.endsWith(".jpg"));
    const curatedNames = new Set(
      curation
        .filter((e) => e.type === "photo")
        .map((e) => e.src.replace("/site-media/website_media/gallery/large/", "")),
    );

    archiveItems = allFiles
      .filter((f) => !curatedNames.has(f))
      .map((f) => {
        const slug = f.split("--")[0] || f;
        return {
          type: "photo" as const,
          src: `/site-media/website_media/gallery/large/${f}`,
          title: slugToTitle(slug),
          category: inferCategory(slug),
          aspect: "landscape" as const,
        };
      });
  } catch {
    // fallback: no media directory (dev without downloaded media)
  }

  return <GalleryClient archiveItems={archiveItems} />;
}
