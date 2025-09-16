import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { id, email } = payload as { id: string; email?: string };
    if (!id) return NextResponse.json({ ok: false }, { status: 400 });

    const supabase = getSupabaseClient();
    const teamName = email ? email.split("@")[0] : "team";

    // upsert leader's team profile
    const { error } = await supabase.from("team_profiles").upsert(
      { id, team_name: teamName, institution: null, leader_phone: null, members: [] },
      { onConflict: "id" }
    );
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}



