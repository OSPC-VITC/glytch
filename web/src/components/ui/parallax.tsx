"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";

type Layer = {
  depth: number; // positive numbers move slower (farther back)
  className?: string;
};

export function ParallaxContainer({ children }: PropsWithChildren<object>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-parallax-depth]"));

    let raf = 0;
    let lastY = window.scrollY;

    const onScroll = () => {
      lastY = window.scrollY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const apply = () => {
      layers.forEach((node) => {
        const depth = parseFloat(node.dataset.parallaxDepth || "0");
        const translate = -(lastY * depth);
        node.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0)`;
      });
      raf = 0;
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full will-change-transform">
      {children}
    </div>
  );
}

export function ParallaxLayer({ depth, className, children }: PropsWithChildren<Layer>) {
  return (
    <div data-parallax-depth={depth} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

export default ParallaxContainer;


