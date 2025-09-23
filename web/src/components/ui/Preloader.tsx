"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId = 0 as unknown as number;
    const onReady = () => setDone(true);
    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
      timeoutId = window.setTimeout(onReady, 2500);
    }
    return () => {
      window.removeEventListener("load", onReady);
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (done) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-3">
        <Loader size={28} />
        <p className="text-cyan-200 text-sm">Loading experience…</p>
      </div>
    </div>
  );
}


