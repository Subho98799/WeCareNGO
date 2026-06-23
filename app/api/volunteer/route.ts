import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzxXuoCDKHDZI0RUBqm3mT_pbkLhNfk2DCPIly3qka32Gi1a2J7p5Dq0PoU5LGtO1vteQ/exec";

const REQUIRED_FIELDS = ["fullName", "phone", "email", "interestArea"] as const;

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();

  try {
    const payload = await request.json();
    console.log(`[volunteer] ${timestamp} Incoming volunteer payload:`, JSON.stringify(payload, null, 2));

    // Server-side validation
    const missing: string[] = [];
    for (const field of REQUIRED_FIELDS) {
      if (!payload[field] || (typeof payload[field] === "string" && !payload[field].trim())) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      console.log(`[volunteer] ${timestamp} REJECTED — missing fields:`, missing);
      return NextResponse.json(
        { success: false, message: `Required fields missing: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    console.log(`[volunteer] ${timestamp} Forwarding to Apps Script:`, JSON.stringify(payload, null, 2));

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log(`[volunteer] ${timestamp} Apps Script response status: ${response.status}`);
    console.log(`[volunteer] ${timestamp} Apps Script response body: ${text}`);

    // Apps Script always returns 200 even on logical failure.
    // Check the response body content for error indicators.
    const isHtmlError =
      text.includes("<html") &&
      (text.includes("error") || text.includes("Error") || text.includes("Error") || text.includes("Script function not found"));

    if (!response.ok || isHtmlError) {
      console.error(`[volunteer] ${timestamp} APPS SCRIPT FAILED — status: ${response.status}, body: ${text}`);
      return NextResponse.json(
        { success: false, message: "Unable to submit application." },
        { status: 502 },
      );
    }

    console.log(`[volunteer] ${timestamp} SUCCESS — row written to sheet`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[volunteer] ${timestamp} ERROR:`, error);
    return NextResponse.json(
      { success: false, message: "Unable to submit application." },
      { status: 500 },
    );
  }
}
