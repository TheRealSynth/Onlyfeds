import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

const ROLES = ["Creator", "Supporter / Fan", "Creator Manager", "Family Member", "Potential Partner", "Media", "Other"] as const;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, role, message } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 1) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof role !== "string" || !ROLES.includes(role as (typeof ROLES)[number])) {
    return NextResponse.json({ error: "A valid role is required." }, { status: 400 });
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json(
      {
        ok: true,
        stored: false,
        note: "Waitlist storage is not yet configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing). Submission was validated but not persisted.",
      },
      { status: 202 },
    );
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase!.from("waitlist_signups").insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role,
    message: typeof message === "string" ? message.trim().slice(0, 2000) : null,
  });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, stored: true, note: "Already on the list." }, { status: 200 });
    }
    return NextResponse.json({ error: "Could not save your submission. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true }, { status: 201 });
}
