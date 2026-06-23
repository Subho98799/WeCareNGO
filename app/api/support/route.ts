import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxteEs-Rm-Ofl54eftJxRXDoaWe7mdvTnZ8b0yPfn7kOwx0Ek826d5AHxx5vchh4UYS/exec";

const REQUIRED_FIELDS = ["name", "phone", "amount"] as const;

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();

  try {
    const payload = await request.json();
    console.log(`[support] ${timestamp} Incoming support payload:`, JSON.stringify(payload, null, 2));

    // Server-side validation
    const missing: string[] = [];
    for (const field of REQUIRED_FIELDS) {
      if (!payload[field] || (typeof payload[field] === "string" && !payload[field].trim())) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      console.log(`[support] ${timestamp} REJECTED — missing fields:`, missing);
      return NextResponse.json(
        { success: false, message: `Required fields missing: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    // Reorder payload to match sheet column order: Name, Phone, Email, Message, Amount
    const reordered = {
      name: payload.name,
      phone: payload.phone,
      email: payload.email || "",
      message: payload.message || "",
      amount: payload.amount,
    };

    console.log(`[support] ${timestamp} Forwarding to Apps Script:`, JSON.stringify(reordered, null, 2));

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reordered),
    });

    const text = await response.text();
    console.log(`[support] ${timestamp} Apps Script response status: ${response.status}`);
    console.log(`[support] ${timestamp} Apps Script response body: ${text}`);

    const isHtmlError =
      text.includes("<html") &&
      (text.includes("error") || text.includes("Error") || text.includes("Script function not found"));

    if (!response.ok || isHtmlError) {
      console.error(`[support] ${timestamp} APPS SCRIPT FAILED — status: ${response.status}, body: ${text}`);
      return NextResponse.json(
        { success: false, message: "Unable to submit donation details." },
        { status: 502 },
      );
    }

    console.log(`[support] ${timestamp} SUCCESS — row written to sheet`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[support] ${timestamp} ERROR:`, error);
    return NextResponse.json(
      { success: false, message: "Unable to submit donation details." },
      { status: 500 },
    );
  }
}
