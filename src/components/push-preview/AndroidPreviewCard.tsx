"use client";

import React from "react";
import { PushNotificationData } from "./types";
import { Wifi, Signal, Battery, ChevronDown, ChevronUp } from "lucide-react";

interface AndroidPreviewCardProps {
  data: PushNotificationData;
  expanded: boolean;
  onToggleExpand: () => void;
}

export function AndroidPreviewCard({
  data,
  expanded,
  onToggleExpand,
}: AndroidPreviewCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-[340px] h-[650px] rounded-[48px] border-[7px] border-[#252625] bg-[#121316] shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col text-[#e3e3e3] select-none">
      {/* Front Camera Hole-punch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black z-30 border border-[#1a1a1a]" />

      {/* Screen Background (Subtle Material Dark Wallpaper) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181a1f] via-[#131417] to-[#0c0d0f] z-0" />

      {/* Android Status Bar */}
      <div className="relative z-10 pt-3 px-6 flex items-center justify-between text-[11px] font-medium tracking-normal text-[#c4c7c5]">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-white">10:00</span>
        </div>
        <div className="flex items-center gap-2">
          <Signal className="w-3 h-3 text-[#c4c7c5]" />
          <Wifi className="w-3 h-3 text-[#c4c7c5]" />
          <Battery className="w-3.5 h-3.5 text-[#c4c7c5]" />
        </div>
      </div>

      {/* Subtle Clock Header */}
      <div className="relative z-10 pt-6 pb-2 text-center">
        <div className="text-[48px] font-light leading-none tracking-tight text-[#e3e3e3] font-sans">
          10:00
        </div>
        <div className="text-[11px] text-[#8e918f] mt-1 font-medium">
          Sat, Nov 15
        </div>
      </div>

      {/* Notification Shade Area */}
      <div className="relative z-10 flex-1 px-3.5 pt-3 overflow-y-auto">
        <div
          onClick={onToggleExpand}
          className="group cursor-pointer w-full rounded-[22px] bg-[#1d2024] border border-[#2d3139] shadow-[0_8px_30px_rgba(0,0,0,0.35)] p-3.5 transition-all duration-300 hover:border-[#3c4043]"
        >
          {/* Header row */}
          <div className="flex items-center justify-between mb-2 text-xs text-[#c4c7c5]">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full overflow-hidden bg-gradient-to-b from-[#2d2f2d] to-[#181918] border border-white/10 flex items-center justify-center shrink-0">
                {data.iconUrl ? (
                  <img
                    src={data.iconUrl}
                    alt={data.appName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[8px] font-semibold text-white/90">
                    {data.appName.charAt(0).toUpperCase() || "A"}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-[#c4c7c5] tracking-tight">
                {data.appName || "App Name"}
              </span>
              <span className="text-[10px] text-[#8e918f]">•</span>
              <span className="text-[10px] text-[#8e918f]">2m</span>
            </div>
            <div className="text-[#8e918f] group-hover:text-white transition-colors">
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
              <h4 className="text-[13px] font-semibold text-[#e3e3e3] leading-snug">
                {data.title || "Notification Title"}
              </h4>
              <p
                className={`text-[12px] text-[#c4c7c5] leading-relaxed mt-0.5 ${
                  expanded ? "" : "line-clamp-2"
                }`}
              >
                {data.body || "Notification body message..."}
              </p>
            </div>

            {/* Collapsed view thumbnail */}
            {!expanded && data.attachedImageUrl && (
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/5 shrink-0 shadow-sm">
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
            <div className="mt-2.5 rounded-xl overflow-hidden max-h-40 bg-black/30 border border-white/5 shadow-inner">
              <img
                src={data.attachedImageUrl}
                alt="Big Picture"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Expanded Action Buttons (Material You Pills) */}
          {expanded && data.buttons.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-[#2d3139]">
              {data.buttons.map((btn, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="px-3 py-1 rounded-full text-[11px] font-medium text-[#a8c7fa] border border-[#444746] hover:bg-white/5 transition-colors"
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
            className="text-[10px] text-[#8e918f] hover:text-[#c4c7c5] transition-colors uppercase tracking-wider font-mono cursor-pointer"
          >
            {expanded ? "▲ Tap card to collapse" : "▼ Tap card to expand"}
          </button>
        </div>
      </div>

      {/* Android Gesture Navigation Bar */}
      <div className="relative z-10 pb-2 flex justify-center">
        <div className="w-20 h-1 bg-[#8e918f]/50 rounded-full" />
      </div>
    </div>
  );
}
