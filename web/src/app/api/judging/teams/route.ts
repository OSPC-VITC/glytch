import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET() {
	const store = await cookies();
	const cookie = store.get("admin_session");
	if (!cookie || !process.env.__ADMIN_SESSION_NONCE__ || cookie.value !== process.env.__ADMIN_SESSION_NONCE__) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const supabase = getSupabaseServerClient();
	const { data, error } = await supabase
		.from("team_profiles")
		.select("id, team_name, github_url, deployment_url")
		.order("team_name", { ascending: true, nullsFirst: false });
	if (error) return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ teams: data ?? [] });
}


