import { ReactNode } from "react";

export type SectionSubtitleProps = {
  className?: string;
  children: ReactNode;
};

export default function SectionSubtitle({
  className,
  children,
}: SectionSubtitleProps) {
  return (
    <h3 className={`text-center text-2xl font-bold mb-6 ${className ?? ""}`}>
      {children}
    </h3>
  );
}