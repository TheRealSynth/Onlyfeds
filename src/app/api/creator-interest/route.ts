import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";

const STAGES = ["Fed Baby", "State Baby", "Coming Home", "Touched Down", "Free World", "Manager / Family Applying for Creator"] as const;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, stage, alias, managedBy, background, contentType, socialLinks } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (typeof name !== "string" || name.trim().length < 1) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof stage !== "string" || !STAGES.includes(stage as (typeof STAGES)[number])) {
    return NextResponse.json({ error: "A valid creator stage is required." }, { status: 400 });
  }

  const record = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    stage,
    alias: typeof alias === "string" ? alias.trim().slice(0, 200) : null,
    managed_by: typeof managedBy === "string" ? managedBy.trim().slice(0, 200) : null,
    background: typeof background === "string" ? background.trim().slice(0, 2000) : null,
    content_type: typeof contentType === "string" ? contentType.trim().slice(0, 500) : null,
    social_links: typeof socialLinks === "string" ? socialLinks.trim().slice(0, 1000) : null,
  };

  if (!isSupabaseConfigured) {
    return NextResponse.json(
      {
        ok: true,
        stored: false,
        note: "Creator interest storage is not yet configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing). Submission was validated but not persisted.",
      },
      { status: 202 },
    );
  }

  const supabase = getSupabaseServerClient();
  const { error } = await supabase!.from("creator_interest").insert(record);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, stored: true, note: "Already received." }, { status: 200 });
    }
    return NextResponse.json({ error: "Could not save your submission. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true }, { status: 201 });
}
