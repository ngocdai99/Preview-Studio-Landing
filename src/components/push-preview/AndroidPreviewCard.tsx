"use client";

import React from "react";
import { PushNotificationData, PreviewTheme } from "./types";
import { useDeviceClock } from "./useDeviceClock";
import { ChevronUp } from "lucide-react";

interface AndroidPreviewCardProps {
  data: PushNotificationData;
  theme?: PreviewTheme;
  expanded: boolean;
  onToggleExpand: () => void;
}

export function AndroidPreviewCard({
  data,
  theme = "dark",
  expanded,
  onToggleExpand,
}: AndroidPreviewCardProps) {
  const isLight = theme === "light";
  const clock = useDeviceClock();
  const validButtons = data.buttons.filter((b) => b && b.trim().length > 0);

  return (
    <div className="relative mx-auto w-full max-w-[340px] h-[650px] rounded-[48px] border-[7px] border-[#252625] bg-[#121316] shadow-[0_25px_70px_rgba(0,0,0,0.7)] select-none transition-colors duration-300">
      {/* Outer Physical Hardware Buttons for Android */}
      {/* Right Edge: Power Button */}
      <div className="absolute -right-[10.5px] top-[150px] w-[3.5px] h-[36px] rounded-r-sm bg-[#3a3c42] shadow-sm pointer-events-none" />
      {/* Right Edge: Volume Rocker Button */}
      <div className="absolute -right-[10.5px] top-[204px] w-[3.5px] h-[68px] rounded-r-sm bg-[#3a3c42] shadow-sm pointer-events-none" />

      {/* Screen Inner Container (Cleanly Clipped) */}
      <div className="relative w-full h-full rounded-[41px] overflow-hidden flex flex-col">
        {/* Front Camera Hole-punch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black z-30 border border-[#1a1a1a]" />

        {/* Screen Background (Google Pixel Material You Dark vs Light Wallpaper) */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-300 ${
            isLight
              ? "bg-gradient-to-b from-[#e2e8f0] via-[#f1f3f8] to-[#ffffff]"
              : "bg-gradient-to-b from-[#181a1f] via-[#131417] to-[#0c0d0f]"
          }`}
        />

        {/* Android Status Bar with Authentic Vector Icons */}
        <div
          className={`relative z-10 pt-3 px-6 flex items-center justify-between text-[11px] font-medium tracking-normal transition-colors duration-200 ${
            isLight ? "text-[#444746]" : "text-[#c4c7c5]"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span
              className={`font-semibold ${
                isLight ? "text-[#1f1f1f]" : "text-white"
              }`}
            >
              {clock.time}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Cellular Signal (4 solid ascending bars) */}
            <svg
              className="w-[16px] h-[10.5px]"
              viewBox="0 0 16 11"
              fill="currentColor"
            >
              <rect x="0.5" y="7.5" width="2.5" height="3" rx="0.6" />
              <rect x="4.5" y="5" width="2.5" height="5.5" rx="0.6" />
              <rect x="8.5" y="2.5" width="2.5" height="8" rx="0.6" />
              <rect x="12.5" y="0" width="2.5" height="10.5" rx="0.6" />
            </svg>

            {/* Wi-Fi Icon (dot + 2 concentric arcs) */}
            <svg
              className="w-[15px] h-[11px]"
              viewBox="0 0 16 12"
              fill="none"
            >
              <circle cx="8" cy="9.8" r="1.1" fill="currentColor" />
              <path
                d="M5 6.8a4.2 4.2 0 0 1 6 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2.2 4a8.2 8.2 0 0 1 11.6 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Battery Icon (solid body with rounded terminal nub) */}
            <svg
              className="w-[20px] h-[10.5px] ml-0.5"
              viewBox="0 0 22 11"
              fill="currentColor"
            >
              <rect x="0" y="0" width="18.5" height="11" rx="3" />
              <path d="M19.5 3.3c.7 0 1.2.6 1.2 1.3v1.8c0 .7-.5 1.3-1.2 1.3v-4.4z" />
            </svg>
          </div>
        </div>

        {/* Subtle Clock Header (Live synchronized) */}
        <div className="relative z-10 pt-6 pb-2 text-center">
          <div
            className={`text-[48px] font-light leading-none tracking-tight font-sans transition-colors duration-200 ${
              isLight ? "text-[#1f1f1f]" : "text-[#e3e3e3]"
            }`}
          >
            {clock.time}
          </div>
          <div
            className={`text-[11px] mt-1 font-medium transition-colors duration-200 ${
              isLight ? "text-[#444746]" : "text-[#8e918f]"
            }`}
          >
            {clock.shortDate}
          </div>
        </div>

        {/* Notification Shade Area */}
        <div className="relative z-10 flex-1 px-3.5 pt-3 overflow-y-auto">
          <div
            onClick={onToggleExpand}
            className={`group cursor-pointer w-full rounded-[22px] p-3.5 transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isLight
                ? "bg-[#ffffff] border border-[#e1e3e1] shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#c4c7c5]"
                : "bg-[#1d2024] border border-[#2d3139] shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-[#3c4043]"
            }`}
          >
            {/* Header row */}
            <div
              className={`flex items-center justify-between mb-2 text-xs transition-colors ${
                isLight ? "text-[#444746]" : "text-[#c4c7c5]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-4 h-4 rounded-full overflow-hidden flex items-center justify-center shrink-0 border ${
                    isLight
                      ? "bg-[#e5e7eb] border-black/10"
                      : "bg-gradient-to-b from-[#2d2f2d] to-[#181918] border-white/10"
                  }`}
                >
                  {data.iconUrl ? (
                    <img
                      src={data.iconUrl}
                      alt={data.appName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      className={`text-[8px] font-semibold ${
                        isLight ? "text-[#1f1f1f]" : "text-white/90"
                      }`}
                    >
                      {data.appName.charAt(0).toUpperCase() || "A"}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium tracking-tight ${
                    isLight ? "text-[#1f1f1f]" : "text-[#c4c7c5]"
                  }`}
                >
                  {data.appName || "App Name"}
                </span>
                <span
                  className={`text-[10px] ${
                    isLight ? "text-[#747775]" : "text-[#8e918f]"
                  }`}
                >
                  •
                </span>
                <span
                  className={`text-[10px] ${
                    isLight ? "text-[#747775]" : "text-[#8e918f]"
                  }`}
                >
                  2m
                </span>
              </div>
              <div
                className={`transition-transform duration-300 ${
                  isLight
                    ? "text-[#747775] group-hover:text-[#1f1f1f]"
                    : "text-[#8e918f] group-hover:text-white"
                } ${expanded ? "rotate-0" : "rotate-180"}`}
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Content Row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-[13px] font-semibold leading-snug ${
                    isLight ? "text-[#1f1f1f]" : "text-[#e3e3e3]"
                  }`}
                >
                  {data.title || "Notification Title"}
                </h4>
                <p
                  className={`text-[12px] leading-relaxed mt-0.5 transition-all duration-300 ${
                    isLight ? "text-[#444746]" : "text-[#c4c7c5]"
                  } ${expanded ? "" : "line-clamp-2"}`}
                >
                  {data.body || "Notification body message..."}
                </p>
              </div>

              {/* Collapsed view thumbnail with smooth AnimatedSize fade */}
              {data.attachedImageUrl && (
                <div
                  className={`transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    expanded
                      ? "w-0 h-0 opacity-0 scale-75 overflow-hidden pointer-events-none"
                      : "w-12 h-12 opacity-100 scale-100 rounded-xl overflow-hidden shrink-0 shadow-sm border"
                  } ${
                    isLight
                      ? "bg-[#e5e7eb] border-black/10"
                      : "bg-black/40 border-white/5"
                  }`}
                >
                  <img
                    src={data.attachedImageUrl}
                    alt="Thumbnail"
                    className="w-12 h-12 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Animated Expandable Area (AnimatedSize) */}
            <div
              className="grid transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                gridTemplateRows: expanded ? "1fr" : "0fr",
                opacity: expanded ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                {/* Expanded Big Picture */}
                {data.attachedImageUrl && (
                  <div
                    className={`mt-2.5 rounded-xl overflow-hidden max-h-40 shadow-inner border ${
                      isLight
                        ? "bg-black/5 border-black/10"
                        : "bg-black/30 border-white/5"
                    }`}
                  >
                    <img
                      src={data.attachedImageUrl}
                      alt="Big Picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Expanded Action Buttons (Material You Pills) */}
                {validButtons.length > 0 && (
                  <div
                    className={`mt-3 flex flex-wrap gap-2 pt-2 border-t ${
                      isLight ? "border-[#e1e3e1]" : "border-[#2d3139]"
                    }`}
                  >
                    {validButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                          isLight
                            ? "text-[#0b57d0] border border-[#747775]/40 hover:bg-[#0b57d0]/5"
                            : "text-[#a8c7fa] border border-[#444746] hover:bg-white/5"
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* State Toggle Hint */}
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={onToggleExpand}
              className={`text-[10px] uppercase tracking-wider font-mono cursor-pointer transition-colors ${
                isLight
                  ? "text-[#747775] hover:text-[#1f1f1f]"
                : "text-[#8e918f] hover:text-[#c4c7c5]"
              }`}
            >
              {expanded ? "▲ Tap card to collapse" : "▼ Tap card to expand"}
            </button>
          </div>
        </div>

        {/* Android Gesture Navigation Bar */}
        <div className="relative z-10 pb-2 flex justify-center">
          <div
            className={`w-20 h-1 rounded-full ${
              isLight ? "bg-[#747775]/40" : "bg-[#8e918f]/50"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
