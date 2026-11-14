"use client";

import React from "react";
import { PushNotificationData } from "./types";
import { Wifi, Signal, Battery, Flashlight, Camera, Lock } from "lucide-react";

interface IosPreviewCardProps {
  data: PushNotificationData;
  expanded: boolean;
  onToggleExpand: () => void;
}

export function IosPreviewCard({
  data,
  expanded,
  onToggleExpand,
}: IosPreviewCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-[340px] h-[650px] rounded-[48px] border-[7px] border-[#252625] bg-[#000000] shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col text-white select-none">
      {/* Dynamic Island Silhouette */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-26 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3 border border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#111]" />
        <div className="w-2 h-2 rounded-full bg-[#0d1624]" />
      </div>

      {/* Atmospheric Apple Dark Gradient Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181d2e] via-[#0d101a] to-[#05060a] z-0" />

      {/* Status Bar */}
      <div className="relative z-10 pt-3 px-7 flex items-center justify-between text-[11px] font-semibold tracking-tight text-white/90">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-white/90">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* Lockscreen Clock & Date */}
      <div className="relative z-10 pt-9 pb-4 flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/70 tracking-wide uppercase">
          <Lock className="w-3 h-3 text-white/60" />
          <span>Saturday, Nov 15</span>
        </div>
        <div className="text-[68px] font-light leading-none tracking-tight text-white/95 mt-1 font-sans drop-shadow-md">
          9:41
        </div>
      </div>

      {/* Notification Area */}
      <div className="relative z-10 flex-1 px-3.5 pt-2 overflow-y-auto">
        <div
          onClick={onToggleExpand}
          className="group cursor-pointer w-full rounded-[24px] bg-white/[0.13] backdrop-blur-3xl border border-white/[0.2] shadow-[0_12px_40px_rgba(0,0,0,0.45)] p-3.5 transition-all duration-300 hover:bg-white/[0.18]"
        >
          {/* Header row */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md overflow-hidden bg-gradient-to-b from-[#2d2f2d] to-[#181918] border border-white/10 flex items-center justify-center shrink-0 shadow-sm">
                {data.iconUrl ? (
                  <img
                    src={data.iconUrl}
                    alt={data.appName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] font-semibold text-white/90">
                    {data.appName.charAt(0).toUpperCase() || "A"}
                  </span>
                )}
              </div>
              <span className="font-semibold text-white/95 text-xs tracking-tight">
                {data.appName || "App Name"}
              </span>
            </div>
            <span className="text-[10px] text-white/60 font-normal">now</span>
          </div>

          {/* Content */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-semibold text-white leading-snug tracking-tight">
                {data.title || "Notification Title"}
              </h4>

              {data.subtitle && (
                <p className="text-[12px] font-medium text-white/80 leading-snug mt-0.5">
                  {data.subtitle}
                </p>
              )}

              <p
                className={`text-[12px] text-white/75 leading-relaxed mt-0.5 ${
                  expanded ? "" : "line-clamp-2"
                }`}
              >
                {data.body || "Notification body message..."}
              </p>
            </div>

            {/* Small thumbnail in collapsed view if image exists */}
            {!expanded && data.attachedImageUrl && (
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 shadow-sm">
                <img
                  src={data.attachedImageUrl}
                  alt="Attachment"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Expanded Rich Media Attachment */}
          {expanded && data.attachedImageUrl && (
            <div className="mt-2.5 rounded-xl overflow-hidden max-h-40 bg-black/40 border border-white/10 shadow-inner">
              <img
                src={data.attachedImageUrl}
                alt="Banner Attachment"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Expanded Action Buttons (iOS Frosted Glass Pills) */}
          {expanded && data.buttons.filter((b) => b && b.trim().length > 0).length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-1.5 pt-2 border-t border-white/10">
              {data.buttons
                .filter((b) => b && b.trim().length > 0)
                .map((btn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="w-full py-1.5 px-2 rounded-xl bg-white/[0.16] hover:bg-white/[0.26] text-[11px] font-medium text-white text-center transition-colors shadow-sm"
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
            className="text-[10px] text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider font-mono cursor-pointer"
          >
            {expanded ? "▲ Tap card to collapse" : "▼ Tap card to expand"}
          </button>
        </div>
      </div>

      {/* Lockscreen Quick Action Controls (Flashlight & Camera) */}
      <div className="relative z-10 px-8 pb-6 flex items-center justify-between">
        <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 shadow-md">
          <Flashlight className="w-4 h-4" />
        </div>
        <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/80 shadow-md">
          <Camera className="w-4 h-4" />
        </div>
      </div>

      {/* Home Indicator Bar */}
      <div className="relative z-10 pb-2 flex justify-center">
        <div className="w-32 h-1 bg-white/50 rounded-full" />
      </div>
    </div>
  );
}
