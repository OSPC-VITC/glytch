import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const COOKIE_NAME = "team_session";

async function getTeamIdFromCookie(): Promise<string | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  const supabase = getSupabaseServerClient();
  const { data } = await supabase
    .from("team_sessions")
    .select("team_id, expires_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();
  if (!data) return null;
  if (new Date(data.expires_at).getTime() < Date.now()) return null;
  return data.team_id as string;
}

export async function GET() {
  const teamId = await getTeamIdFromCookie();
  if (!teamId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("team_profiles")
    .select("id, team_name, github_url, deployment_url")
    .eq("id", teamId)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ profile: data });
}

export async function POST(request: Request) {
  const teamId = await getTeamIdFromCookie();
  if (!teamId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json().catch(() => ({}))) as {
    team_name?: string;
    github_url?: string | null;
    deployment_url?: string | null;
  };
  const supabase = getSupabaseServerClient();
  const updates = {
    team_name: (payload.team_name ?? "").toString().trim() || null,
    github_url: (payload.github_url ?? "").toString().trim() || null,
    deployment_url: (payload.deployment_url ?? "").toString().trim() || null,
  } as const;
  const { data, error } = await supabase
    .from("team_profiles")
    .update(updates)
    .eq("id", teamId)
    .select("id, team_name, github_url, deployment_url")
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, profile: data });
}
