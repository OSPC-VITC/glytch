import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

async function ensureAdmin() {
	const store = await cookies();
	const cookie = store.get("admin_session");
	if (!cookie || !process.env.__ADMIN_SESSION_NONCE__ || cookie.value !== process.env.__ADMIN_SESSION_NONCE__) return false;
	return true;
}

export async function GET() {
	if (!(await ensureAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const supabase = getSupabaseServerClient();
	const { data, error } = await supabase
		.from("team_grades")
		.select("id, team_id, visual_aesthetics, interactivity, ui_navigation, creativity, performance, comments");
	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ grades: data ?? [] });
}

export async function POST(request: Request) {
	if (!(await ensureAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const payload = (await request.json()) as {
		team_id: string;
		visual_aesthetics: number;
		interactivity: number;
		ui_navigation: number;
		creativity: number;
		performance: number;
		comments?: string | null;
	};

	const sanitize = (n: number) => {
		if (typeof n !== "number" || !Number.isFinite(n)) return 0;
		const v = Math.max(0, Math.min(10, Math.round(n)));
		return v;
	};

	const supabase = getSupabaseServerClient();
	const { data, error } = await supabase
		.from("team_grades")
		.upsert({
			team_id: payload.team_id,
			visual_aesthetics: sanitize(payload.visual_aesthetics),
			interactivity: sanitize(payload.interactivity),
			ui_navigation: sanitize(payload.ui_navigation),
			creativity: sanitize(payload.creativity),
			performance: sanitize(payload.performance),
			comments: (payload.comments ?? "").toString().slice(0, 2000) || null,
		}, { onConflict: "team_id" })
		.select("id, team_id, visual_aesthetics, interactivity, ui_navigation, creativity, performance, comments")
		.single();
	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ ok: true, grade: data });
}


