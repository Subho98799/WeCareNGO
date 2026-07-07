import { NextResponse } from "next/server";
import curation from "@/content/curated-gallery";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ items: curation, total: curation.length });
}
