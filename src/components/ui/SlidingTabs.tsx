"use client";

import React from "react";

export interface TabOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SlidingTabsProps<T extends string> {
  options: (TabOption<T> | T)[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
  ariaLabel?: string;
}

/**
 * Pure CSS-driven SlidingTabs Component
 * - Exact visual styling matching DeviceThemeSwitch & Theme Toggle:
 *   Track: bg-slate-100 dark:bg-[var(--card-muted,#171817)] with dark:border-[var(--border,#282928)]
 *   Pill:  bg-white dark:bg-[var(--card,#1D1E1D)] with dark:border-white/[0.12] and subtle top inner highlight
 *   Text:  text-slate-900 dark:text-white for active; text-slate-500 dark:text-[var(--muted,#989A99)] for inactive
 * - Zero layout shift: mathematical N-column grid with pure CSS transform
 * - 100% centered text and icons horizontally and vertically
 * - Supports clean 2-line text wrap without truncation
 */
export function SlidingTabs<T extends string>({
  options,
  value,
  onChange,
  className = "",
  size = "sm",
  ariaLabel = "Segmented controls",
}: SlidingTabsProps<T>) {
  const normalizedOptions: TabOption<T>[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const count = normalizedOptions.length;
  const activeIndex = Math.max(
    0,
    normalizedOptions.findIndex((opt) => opt.value === value)
  );

  const py = size === "sm" ? "py-1" : "py-1.5";
  const fontSize = size === "sm" ? "text-[12px]" : "text-[12.5px]";

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`relative grid p-1 rounded-xl bg-[#171817] border border-[#282928] shadow-[inset_0_1px_3px_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.15)] select-none ${className}`}
      style={{
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
      }}
    >
      {/* 
        Pure CSS Sliding Pill Indicator:
        - Exact dark neutral pill matching StorePresetsCard & Brand Design System
      */}
      <div
        aria-hidden="true"
        className="absolute top-1 bottom-1 rounded-lg pointer-events-none bg-[#242624] border border-white/[0.12] shadow-[0_2px_6px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform duration-300 ease-[cubic-bezier(0.2,0.9,0.3,1.15)] will-change-transform z-[1]"
        style={{
          left: "4px",
          width: `calc((100% - 8px) / ${count})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />

      {/* Segment Buttons (Equal width, 100% centered text) */}
      {normalizedOptions.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative z-10 w-full min-h-[30px] ${py} px-2 flex items-center justify-center text-center font-semibold ${fontSize} cursor-pointer transition-colors duration-150 ${
              isActive
                ? "text-white font-bold"
                : "text-[#989A99] hover:text-[#f8fafc]"
            }`}
          >
            <span className="flex items-center justify-center gap-1.5 text-center leading-tight whitespace-nowrap">
              {opt.icon && (
                <span className="shrink-0 flex items-center justify-center">
                  {opt.icon}
                </span>
              )}
              <span className="text-center leading-tight break-words line-clamp-2">
                {opt.label}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
