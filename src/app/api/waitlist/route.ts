import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";
import { validateWaitlistPayload } from "@/lib/validation";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validateWaitlistPayload(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const { name, email, role, message } = result.data;

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
  const { error } = await supabase!.from("waitlist_signups").insert({ name, email, role, message });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ ok: true, stored: true, note: "Already on the list." }, { status: 200 });
    }
    return NextResponse.json({ error: "Could not save your submission. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true }, { status: 201 });
}
