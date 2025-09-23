"use client";

import { useEffect, useMemo, useState } from "react";
import ElectricBorder from "@/components/ui/ElectricBorder";
import { Eye, EyeOff, Search } from "lucide-react";

type Team = {
  id: string;
  team_name: string;
  github_url: string | null;
  deployment_url: string | null;
};

type Grade = {
  id?: string;
  team_id: string;
  visual_aesthetics: number;
  interactivity: number;
  ui_navigation: number;
  creativity: number;
  performance: number;
  comments?: string | null;
};

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [teams, setTeams] = useState<Team[]>([]);
  const [gradesByTeam, setGradesByTeam] = useState<Record<string, Grade>>({});
  const [loading, setLoading] = useState(false);
  const [savingTeamId, setSavingTeamId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const json = (await res.json()) as { ok: boolean };
        setIsAuthed(json.ok);
        if (json.ok) {
          await loadData();
        }
      } catch {
        setIsAuthed(false);
      }
    })();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tRes, gRes] = await Promise.all([
        fetch("/api/judging/teams", { cache: "no-store" }),
        fetch("/api/judging/grades", { cache: "no-store" }),
      ]);
      const tJson = (await tRes.json().catch(() => ({}))) as { teams?: Team[] };
      const gJson = (await gRes.json().catch(() => ({}))) as { grades?: Grade[] };
      const safeTeams = Array.isArray(tJson.teams) ? tJson.teams : [];
      const safeGrades = Array.isArray(gJson.grades) ? gJson.grades : [];
      setTeams(safeTeams);
      const map: Record<string, Grade> = {};
      for (const g of safeGrades) {
        map[g.team_id] = g;
      }
      setGradesByTeam(map);
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setIsAuthed(true);
      await loadData();
    } else {
      const j = (await res.json().catch(() => ({ error: "Login failed" }))) as { error?: string };
      setLoginError(j?.error ?? "Login failed");
    }
  };

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthed(false);
  };

  const clamp10 = (n: number) => Math.max(0, Math.min(10, Math.round(n)));

  type NumericGradeKey = "visual_aesthetics" | "interactivity" | "ui_navigation" | "creativity" | "performance";
  const numericKeys: Record<NumericGradeKey, true> = {
    visual_aesthetics: true,
    interactivity: true,
    ui_navigation: true,
    creativity: true,
    performance: true,
  };

  const onScoreChange = (teamId: string, field: keyof Grade, value: number | string) => {
    setGradesByTeam(prev => {
      const existing = prev[teamId] ?? {
        team_id: teamId,
        visual_aesthetics: 0,
        interactivity: 0,
        ui_navigation: 0,
        creativity: 0,
        performance: 0,
        comments: null,
      };
      const next: Grade = { ...existing };
      if (field === "comments") {
        next.comments = String(value);
      } else {
        const num = clamp10(Number(value));
        if (field in numericKeys) {
          const k = field as NumericGradeKey;
          next[k] = Number.isFinite(num) ? num : 0;
        }
      }
      return { ...prev, [teamId]: next };
    });
  };

  const saveGrade = async (teamId: string) => {
    const payload = gradesByTeam[teamId];
    if (!payload) return;
    setSavingTeamId(teamId);
    try {
      const res = await fetch("/api/judging/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({ error: "Failed to save" }))) as { error?: string };
        alert(j?.error ?? "Failed to save");
      } else {
        await loadData();
      }
    } finally {
      setSavingTeamId(null);
    }
  };

  const filteredTeams = useMemo(() => {
    const list = Array.isArray(teams) ? teams : [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(t =>
      (t.team_name || "").toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      (t.github_url || "").toLowerCase().includes(q) ||
      (t.deployment_url || "").toLowerCase().includes(q)
    );
  }, [teams, searchQuery]);

  if (isAuthed === null) {
    return (
      <main className="min-h-screen px-6 py-24 max-w-2xl mx-auto text-white">Loading…</main>
    );
  }

  if (!isAuthed) {
    return (
      <main className="min-h-screen w-full px-6 py-8 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <ElectricBorder color="#22d3ee" thickness={2} className="rounded-2xl w-full">
            <div className="rounded-2xl bg-black/50 backdrop-blur-md p-6 text-white">
              <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
              {loginError ? <div className="mb-3 text-sm text-red-400">{loginError}</div> : null}
              <form onSubmit={onLogin} className="space-y-3">
                <div>
                  <label className="text-sm text-gray-300">Username</label>
                  <input className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="relative">
                  <label className="text-sm text-gray-300">Password</label>
                  <input
                    type={showAdminPassword ? "text" : "password"}
                    className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 pr-12 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    aria-label={showAdminPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 translate-y-[4px] -mt-3 text-white/70 hover:text-white flex items-center justify-center h-8 w-8"
                    onClick={() => setShowAdminPassword(v => !v)}
                  >
                    {showAdminPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button type="submit" className="w-full rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-4 py-2">Sign in</button>
              </form>
            </div>
          </ElectricBorder>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mt-12">Judging Panel</h1>
          <p className="text-sm text-white-400 mt-2">Grade each team out of 10 per criterion.</p>
        </div>
        <button onClick={onLogout} className="rounded-md bg-white/10 hover:bg-white/20 text-white px-3 py-1.5">Logout</button>
      </header>

      <div className="flex items-center justify-center gap-3">
        <div className="relative w-full md:w-96">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams (name, id, GitHub, deploy)"
            className="w-full rounded-md bg-black/40 border-2 border-cyan-400/70 shadow-[0_0_18px_#22d3ee] px-9 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-cyan-200" size={18} />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-200 hover:text-white text-sm"
            >
              Clear
            </button>
          ) : null}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <label className="text-sm text-white/70">Sort</label>
          <button
            type="button"
            className="rounded-md bg-white/10 hover:bg-white/20 text-white px-3 py-1.5"
            onClick={() => {
              setTeams(prev => {
                const cloned = [...prev];
                cloned.sort((a, b) => {
                  const ga = gradesByTeam[a.id];
                  const gb = gradesByTeam[b.id];
                  const ta = (ga?.visual_aesthetics ?? 0) + (ga?.interactivity ?? 0) + (ga?.ui_navigation ?? 0) + (ga?.creativity ?? 0) + (ga?.performance ?? 0);
                  const tb = (gb?.visual_aesthetics ?? 0) + (gb?.interactivity ?? 0) + (gb?.ui_navigation ?? 0) + (gb?.creativity ?? 0) + (gb?.performance ?? 0);
                  return tb - ta; // desc
                });
                return cloned;
              });
            }}
          >
            by Total Score
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-white">Loading teams…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTeams.map(team => {
            const g = gradesByTeam[team.id] ?? {
              team_id: team.id,
              visual_aesthetics: 0,
              interactivity: 0,
              ui_navigation: 0,
              creativity: 0,
              performance: 0,
              comments: "",
            };
            const total = g.visual_aesthetics + g.interactivity + g.ui_navigation + g.creativity + g.performance;
            return (
              <ElectricBorder key={team.id} color="#22d3ee" thickness={2} className="rounded-xl">
              <div className="rounded-xl text-white bg-black/60 backdrop-blur-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-medium">{team.team_name || team.id}</h2>
                  <span className="text-sm text-gray-400">Total: {total}/50</span>
                </div>
                <div className="flex gap-3 mb-3 text-sm">
                  {team.github_url ? <a className="underline text-cyan-300" href={team.github_url} target="_blank" rel="noreferrer">GitHub</a> : <span className="text-gray-500">No GitHub</span>}
                  {team.deployment_url ? <a className="underline text-cyan-300" href={team.deployment_url} target="_blank" rel="noreferrer">Deployment</a> : <span className="text-gray-500">No Deployment</span>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Visual Appeal & Aesthetics" value={g.visual_aesthetics} onChange={v => onScoreChange(team.id, "visual_aesthetics", v)} />
                  <Field label="Interactivity & Engagement" value={g.interactivity} onChange={v => onScoreChange(team.id, "interactivity", v)} />
                  <Field label="UI & Navigation" value={g.ui_navigation} onChange={v => onScoreChange(team.id, "ui_navigation", v)} />
                  <Field label="Creativity & Originality" value={g.creativity} onChange={v => onScoreChange(team.id, "creativity", v)} />
                  <Field label="Performance & Responsiveness" value={g.performance} onChange={v => onScoreChange(team.id, "performance", v)} />
                </div>
                <div className="mt-3">
                  <label className="text-sm text-gray-300">Comments</label>
                  <textarea className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" value={g.comments ?? ""} onChange={e => onScoreChange(team.id, "comments", e.target.value)} />
                </div>
                <div className="mt-3 flex justify-end">
                  <button disabled={savingTeamId === team.id} onClick={() => saveGrade(team.id)} className="rounded-md bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-medium px-4 py-2">{savingTeamId === team.id ? "Saving…" : "Save grade"}</button>
                </div>
              </div>
              </ElectricBorder>
            );
          })}
        </div>
      )}
    </main>
  );
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type="number"
        min={0}
        max={10}
        className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

