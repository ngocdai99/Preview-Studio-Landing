"use client";

import React from "react";
import { PreviewTheme } from "./types";
import { Sun, Moon } from "lucide-react";

interface DeviceThemeToggleProps {
  theme: PreviewTheme;
  onChange: (theme: PreviewTheme) => void;
  className?: string;
}

/**
 * DeviceThemeToggle
 * Exact styling and dimensions matching Core Preview Studio stage toolbar:
 * - Capsule track: #171817 with #282928 border and inner shadow
 * - Circular sliding pill: 28px #2A2B2A with 1px border-white/12 and drop shadow
 * - Icons: Sun (light) and Moon (dark) with 15px size
 */
export function DeviceThemeToggle({
  theme,
  onChange,
  className = "",
}: DeviceThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <div
      role="group"
      aria-label="Device Theme"
      title="Device Theme (Light / Dark)"
      className={`relative inline-flex items-center p-[3px] gap-[3px] bg-[#171817] border border-[#282928] rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.15)] select-none shrink-0 ${className}`}
    >
      {/* Sliding Circular Pill */}
      <span
        aria-hidden="true"
        className="absolute top-[3px] bottom-[3px] left-[3px] w-[28px] h-[28px] rounded-full pointer-events-none bg-[#2A2B2A] border border-white/[0.12] shadow-[0_2px_6px_rgba(0,0,0,0.45)] transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] z-[1]"
        style={{
          transform: isDark ? "translateX(31px)" : "translateX(0px)",
        }}
      />

      {/* Light Theme Button */}
      <button
        type="button"
        onClick={() => onChange("light")}
        aria-pressed={!isDark}
        title="Light device theme"
        className={`relative z-[2] w-[28px] h-[28px] flex items-center justify-center rounded-full transition-colors duration-150 cursor-pointer ${
          !isDark ? "text-white" : "text-[#989A99] hover:text-[#f8fafc]"
        }`}
      >
        <Sun className="w-[15px] h-[15px]" strokeWidth={2.2} />
      </button>

      {/* Dark Theme Button */}
      <button
        type="button"
        onClick={() => onChange("dark")}
        aria-pressed={isDark}
        title="Dark device theme"
        className={`relative z-[2] w-[28px] h-[28px] flex items-center justify-center rounded-full transition-colors duration-150 cursor-pointer ${
          isDark ? "text-white" : "text-[#989A99] hover:text-[#f8fafc]"
        }`}
      >
        <Moon className="w-[15px] h-[15px]" strokeWidth={2.2} />
      </button>
    </div>
  );
}
