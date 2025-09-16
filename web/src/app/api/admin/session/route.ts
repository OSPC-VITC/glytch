import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
	const store = await cookies();
	const cookie = store.get("admin_session");
	const ok = !!cookie && !!process.env.__ADMIN_SESSION_NONCE__ && cookie.value === process.env.__ADMIN_SESSION_NONCE__;
	return NextResponse.json({ ok });
}


