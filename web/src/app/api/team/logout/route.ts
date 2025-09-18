import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const COOKIE_NAME = "team_session";

export async function POST() {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  if (!raw) return res;

  const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");
  const supabase = getSupabaseServerClient();
  await supabase.from("team_sessions").delete().eq("token_hash", tokenHash);
  return res;
}
