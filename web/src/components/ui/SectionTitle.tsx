import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return (
    <div className={`text-center mb-8 ${className || ""}`}>
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4">
        <span
          className="bg-gradient-to-r from-white from-40% via-purple-300 via-60% to-white bg-clip-text text-transparent"
          style={{
            backgroundSize: "300% 100%",
            animation: "gradientShift 5s ease-in-out infinite",
          }}
        >
          {children}
        </span>
      </h2>
      <div className="w-20 h-1 mx-auto mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500 rounded-full opacity-80" />
    </div>
  );
}