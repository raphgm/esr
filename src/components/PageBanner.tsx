import React, { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface PageBannerProps {
  title: ReactNode;
  subtitle: string;
  description: ReactNode;
  icon: LucideIcon;
  actions?: ReactNode;
}

export function PageBanner({
  title,
  subtitle,
  description,
  icon: Icon,
  actions,
}: PageBannerProps) {
  return (
    <div className="bg-[#120c24] text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-6 shadow-sm border border-[#211640]">
      <div className="absolute -right-24 -top-24 opacity-[0.07] pointer-events-none">
        <Icon className="w-[500px] h-[500px]" strokeWidth={1} />
      </div>
      <div className="relative z-10 max-w-2xl flex flex-col gap-2">
        <span className="text-purple-400 font-mono text-sm tracking-wide mb-1 font-bold">
          {subtitle}
        </span>
        <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight leading-tight mb-2">
          {title}
        </h2>
        <div className="text-slate-200 text-base md:text-lg leading-relaxed font-medium">
          {description}
        </div>
      </div>
      {actions && <div className="relative z-10 shrink-0">{actions}</div>}
    </div>
  );
}
