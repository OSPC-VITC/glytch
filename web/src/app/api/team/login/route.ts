import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const COOKIE_NAME = "team_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export async function POST(request: Request) {
  try {
    const { teamName, password } = (await request.json().catch(() => ({}))) as {
      teamName?: string;
      password?: string;
    };
    if (!teamName || !password) {
      return NextResponse.json({ ok: false, error: "Missing teamName or password" }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();
    const { data: teamId, error } = await supabase.rpc("team_authenticate", {
      p_team_name: teamName,
      p_password: password,
    });
    if (error || !teamId) {
      return NextResponse.json({ ok: false, error: "Invalid team credentials" }, { status: 401 });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();

    const { error: upsertErr } = await supabase
      .from("team_sessions")
      .upsert({ token_hash: tokenHash, team_id: teamId as string, expires_at: expiresAt })
      .select("token_hash")
      .single();
    if (upsertErr) {
      return NextResponse.json({ ok: false, error: "Unable to create session" }, { status: 500 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, rawToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
