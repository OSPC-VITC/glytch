"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { useRouter } from "next/navigation";

type TeamProfile = {
  id: string;
  team_name: string;
  github_url: string | null;
  deployment_url: string | null;
};

export default function TeamLeaderProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<TeamProfile | null>(null);
  const [teamName, setTeamName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = getSupabaseClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/login?redirect=/profile");
        return;
      }
      const { data: row, error: qerr } = await supabase
        .from("team_profiles")
        .select("id, team_name, github_url, deployment_url")
        .eq("id", data.session.user.id)
        .maybeSingle();
      if (qerr) {
        setError(qerr.message);
      } else if (row) {
        setProfile(row as TeamProfile);
        setTeamName(row.team_name ?? "");
        setGithubUrl(row.github_url ?? "");
        setDeploymentUrl(row.deployment_url ?? "");
      }
      setLoading(false);
    })();
  }, [router]);

  const onSave = async () => {
    setError(null);
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      router.replace("/login?redirect=/profile");
      return;
    }
    const { error: uerr } = await supabase
      .from("team_profiles")
      .upsert({
        id: data.user.id,
        team_name: teamName.trim(),
        github_url: githubUrl.trim() || null,
        deployment_url: deploymentUrl.trim() || null,
      });
    if (uerr) setError(uerr.message);
    else setSaveMsg("Team profile saved successfully.");
  };

  if (loading) return <main className="min-h-screen px-6 py-24 max-w-2xl mx-auto text-white">Loading…</main>;

  return (
    <main className="min-h-screen px-6 py-24 max-w-2xl mx-auto">
      <ElectricBorder color="#22d3ee" thickness={2} className="rounded-2xl">
        <div className="rounded-2xl bg-black/50 backdrop-blur-md p-6 text-white">
        <h1 className="text-2xl font-semibold mb-4">Team Leader Profile</h1>
        {error ? <div className="mb-3 text-sm text-red-400">{error}</div> : null}
        {saveMsg ? <div className="mb-3 text-sm text-green-400">{saveMsg}</div> : null}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Team name</label>
            <input
              className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Your team name"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Team GitHub repository</label>
            <input
              className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/org/repo"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Deployment link (optional)</label>
            <input
              className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              value={deploymentUrl}
              onChange={(e) => setDeploymentUrl(e.target.value)}
              placeholder="https://your-app.com"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={onSave} className="rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-4 py-2">
              Save
            </button>
          </div>
        </div>
        </div>
      </ElectricBorder>
    </main>
  );
}


