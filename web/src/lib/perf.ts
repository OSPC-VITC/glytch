export type PerfTier = "high" | "medium" | "low";

const CACHE_KEY = "__perf_tier_v1";

export async function detectPerfTier(): Promise<PerfTier> {
  if (typeof window === "undefined") return "high";
  try {
    const cached = localStorage.getItem(CACHE_KEY) as PerfTier | null;
    if (cached === "high" || cached === "medium" || cached === "low") return cached;
  } catch {}

  const deviceMem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
  const cores = (navigator as unknown as { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;

  // Quick 400ms raf test
  const frames = await new Promise<number>((resolve) => {
    let count = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      count++;
      if (t - start < 400) requestAnimationFrame(step);
      else resolve(count);
    };
    requestAnimationFrame(step);
  });

  let tier: PerfTier = "high";
  if (frames < 18 || deviceMem < 3 || cores <= 2) tier = "low";
  else if (frames < 28 || deviceMem < 5 || cores <= 4) tier = "medium";

  try { localStorage.setItem(CACHE_KEY, tier); } catch {}
  return tier;
}

export function getCachedPerfTier(): PerfTier | null {
  try {
    const v = localStorage.getItem(CACHE_KEY) as PerfTier | null;
    return v === "high" || v === "medium" || v === "low" ? v : null;
  } catch { return null; }
}
