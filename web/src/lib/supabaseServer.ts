import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serverClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient {
	if (serverClient) return serverClient;
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;
	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error(
			"Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
		);
	}
	serverClient = createClient(supabaseUrl, supabaseAnonKey);
	return serverClient;
}


