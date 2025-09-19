import React from "react";

type AsElement = "div" | "aside" | "section";

interface CurvedPanelProps extends React.HTMLAttributes<HTMLElement> {
  as?: AsElement;
  curvature?: number;
}

export function CurvedPanel({
  as = "div",
  curvature = 0.2,
  className,
  children,
  style,
  ...rest
}: CurvedPanelProps) {
  const Component: React.ElementType = as;

  const overlayStyle: React.CSSProperties = {
    borderRadius: "inherit",
    background:
      "radial-gradient(120% 140% at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.18) 85%, rgba(0,0,0,0.35) 100%)",
    opacity: 0.85,
    transform: `scale(${1 + curvature * 0.02})`,
  };

  const edgeShineStyle: React.CSSProperties = {
    borderRadius: "inherit",
    background:
      "radial-gradient(180% 180% at 50% 10%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 35%, rgba(255,255,255,0) 60%)",
    mixBlendMode: "soft-light",
    opacity: 0.6,
    transform: `scale(${1 + curvature * 0.015})`,
  };

  const outlineStyle: React.CSSProperties = {
    borderRadius: "inherit",
    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.04)",
  };

  const sheenStyle: React.CSSProperties = {
    borderRadius: "inherit",
    background:
      "radial-gradient(120% 140% at 50% 0%, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0.08) 35%, transparent 60%)",
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
    maskImage:
      "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
    opacity: 0.4,
  };

  return (
    <Component
      className={`relative overflow-hidden backdrop-blur-md backdrop-saturate-150 ${className ?? ""}`}
      style={style}
      {...rest}
    >
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={outlineStyle} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={sheenStyle} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={overlayStyle} />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={edgeShineStyle} />
    </Component>
  );
}

export default CurvedPanel;
