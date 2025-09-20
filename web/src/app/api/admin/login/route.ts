import { NextResponse } from "next/server";
import { AdminSession } from "@/lib/adminSession";

const ADMIN_USERNAME = "admin2025";
const ADMIN_PASSWORD = "bpAdmin@2025";

export async function POST(request: Request) {
	try {
		const body = await request.json().catch(() => ({}));
		const { username, password } = body as { username?: string; password?: string };
		if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
			return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
		}
		const token = AdminSession.createAdminSessionToken();
		const res = NextResponse.json({ ok: true });
		res.cookies.set(AdminSession.COOKIE_NAME, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 12, // 12h
		});
		return res;
	} catch {
		return NextResponse.json({ ok: false }, { status: 500 });
	}
}


