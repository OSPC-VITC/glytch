import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const COOKIE_NAME = "team_session";

export async function GET() {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return NextResponse.json({ ok: false });

  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("team_sessions")
    .select("team_id, expires_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();
  if (error || !data) return NextResponse.json({ ok: false });
  if (new Date(data.expires_at).getTime() < Date.now()) return NextResponse.json({ ok: false });

  const { data: team, error: tErr } = await supabase
    .from("team_profiles")
    .select("id, team_name")
    .eq("id", data.team_id)
    .maybeSingle();
  if (tErr || !team) return NextResponse.json({ ok: false });

  return NextResponse.json({ ok: true, team: { id: team.id, team_name: team.team_name } });
}
