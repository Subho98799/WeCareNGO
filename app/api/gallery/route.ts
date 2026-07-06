import { NextResponse } from "next/server";
import { getCuratedGallery, deduplicate } from "@/lib/gallery-data";

export const dynamic = "force-static";

export async function GET() {
  const items = deduplicate(getCuratedGallery());
  return NextResponse.json({ items, total: items.length });
}
