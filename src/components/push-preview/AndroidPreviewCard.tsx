"use client";

import React from "react";
import { PushNotificationData, PreviewTheme } from "./types";
import { Wifi, Signal, Battery, ChevronDown, ChevronUp } from "lucide-react";

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

  return (
    <div className="relative mx-auto w-full max-w-[340px] h-[650px] rounded-[48px] border-[7px] border-[#252625] bg-[#121316] shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col select-none transition-colors duration-300">
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

      {/* Android Status Bar */}
      <div
        className={`relative z-10 pt-3 px-6 flex items-center justify-between text-[11px] font-medium tracking-normal transition-colors duration-200 ${
          isLight ? "text-[#444746]" : "text-[#c4c7c5]"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className={`font-semibold ${isLight ? "text-[#1f1f1f]" : "text-white"}`}>
            10:00
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Subtle Clock Header */}
      <div className="relative z-10 pt-6 pb-2 text-center">
        <div
          className={`text-[48px] font-light leading-none tracking-tight font-sans transition-colors duration-200 ${
            isLight ? "text-[#1f1f1f]" : "text-[#e3e3e3]"
          }`}
        >
          10:00
        </div>
        <div
          className={`text-[11px] mt-1 font-medium transition-colors duration-200 ${
            isLight ? "text-[#444746]" : "text-[#8e918f]"
          }`}
        >
          Sat, Nov 15
        </div>
      </div>

      {/* Notification Shade Area */}
      <div className="relative z-10 flex-1 px-3.5 pt-3 overflow-y-auto">
        <div
          onClick={onToggleExpand}
          className={`group cursor-pointer w-full rounded-[22px] p-3.5 transition-all duration-300 ${
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
              <span className={`text-[10px] ${isLight ? "text-[#747775]" : "text-[#8e918f]"}`}>
                •
              </span>
              <span className={`text-[10px] ${isLight ? "text-[#747775]" : "text-[#8e918f]"}`}>
                2m
              </span>
            </div>
            <div
              className={`transition-colors ${
                isLight ? "text-[#747775] group-hover:text-[#1f1f1f]" : "text-[#8e918f] group-hover:text-white"
              }`}
            >
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
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
                className={`text-[12px] leading-relaxed mt-0.5 ${
                  isLight ? "text-[#444746]" : "text-[#c4c7c5]"
                } ${expanded ? "" : "line-clamp-2"}`}
              >
                {data.body || "Notification body message..."}
              </p>
            </div>

            {/* Collapsed view thumbnail */}
            {!expanded && data.attachedImageUrl && (
              <div
                className={`w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border ${
                  isLight
                    ? "bg-[#e5e7eb] border-black/10"
                    : "bg-black/40 border-white/5"
                }`}
              >
                <img
                  src={data.attachedImageUrl}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Expanded Big Picture */}
          {expanded && data.attachedImageUrl && (
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
          {expanded &&
            data.buttons.filter((b) => b && b.trim().length > 0).length > 0 && (
              <div
                className={`mt-3 flex flex-wrap gap-2 pt-2 border-t ${
                  isLight ? "border-[#e1e3e1]" : "border-[#2d3139]"
                }`}
              >
                {data.buttons
                  .filter((b) => b && b.trim().length > 0)
                  .map((btn, idx) => (
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
  );
}
