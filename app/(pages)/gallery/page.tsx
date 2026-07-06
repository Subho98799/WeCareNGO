import { getCuratedGallery, deduplicate } from "@/lib/gallery-data";
import GalleryClient from "./gallery-client";

export default function GalleryPage() {
  const items = deduplicate(getCuratedGallery());
  return <GalleryClient allItems={items} />;
}
