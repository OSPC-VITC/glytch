"use client";

import type { CSSProperties } from "react";

export default function Loader({ size = 20 }: { size?: number }) {
  const style = { "--s": `${size}px` } as CSSProperties;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="loader" style={style} />
    </div>
  );
}
