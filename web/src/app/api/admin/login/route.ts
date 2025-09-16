import { NextResponse } from "next/server";
import crypto from "node:crypto";

const ADMIN_USERNAME = "admin2025";
const ADMIN_PASSWORD = "bpAdmin@2025";

export async function POST(request: Request) {
	try {
		const body = await request.json().catch(() => ({}));
		const { username, password } = body as { username?: string; password?: string };
		if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
			return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
		}
		const sessionNonce = crypto.randomBytes(16).toString("hex");
		const res = NextResponse.json({ ok: true });
		res.cookies.set("admin_session", sessionNonce, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			// session cookie (no maxAge) so it clears on browser close
		});
		// Mark server runtime token so sessions reset on server restart
		process.env.__ADMIN_SESSION_NONCE__ = sessionNonce;
		return res;
	} catch {
		return NextResponse.json({ ok: false }, { status: 500 });
	}
}


