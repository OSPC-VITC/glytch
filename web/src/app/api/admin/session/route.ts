import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AdminSession } from "@/lib/adminSession";

export async function GET() {
  const store = await cookies();
  const cookie = store.get(AdminSession.COOKIE_NAME);
  const ok = AdminSession.verifyAdminSessionToken(cookie?.value);
  return NextResponse.json({ ok });
}


