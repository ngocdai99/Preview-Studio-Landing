"use client";

import React from "react";
import { PushNotificationData, PreviewTheme } from "./types";
import { useDeviceClock } from "./useDeviceClock";
import { Flashlight, Camera, Lock } from "lucide-react";

interface IosPreviewCardProps {
  data: PushNotificationData;
  theme?: PreviewTheme;
  expanded: boolean;
  onToggleExpand: () => void;
}

export function IosPreviewCard({
  data,
  theme = "dark",
  expanded,
  onToggleExpand,
}: IosPreviewCardProps) {
  const isLight = theme === "light";
  const clock = useDeviceClock();
  const validButtons = data.buttons.filter((b) => b && b.trim().length > 0);

  return (
    <div
      className={`relative mx-auto w-full max-w-[340px] h-[650px] rounded-[48px] p-[2.5px] select-none transition-all duration-300 ${
        isLight
          ? "border-[3.5px] border-[#cbd5e1] bg-[#e2e8f0] shadow-[0_25px_70px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.4)] ring-1 ring-black/10"
          : "border-[3.5px] border-[#3a3c44] bg-[#1c1d22] shadow-[0_25px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
      }`}
    >
      {/* Outer Physical Hardware Buttons for iPhone */}
      {/* Left Edge: Action Button / Mute Switch */}
      <div
        className={`absolute -left-[9.5px] top-[110px] w-[3.5px] h-[28px] rounded-l-sm shadow-sm pointer-events-none transition-colors duration-300 ${
          isLight ? "bg-[#94a3b8]" : "bg-[#3a3c42]"
        }`}
      />
      {/* Left Edge: Volume Up Button */}
      <div
        className={`absolute -left-[9.5px] top-[154px] w-[3.5px] h-[52px] rounded-l-sm shadow-sm pointer-events-none transition-colors duration-300 ${
          isLight ? "bg-[#94a3b8]" : "bg-[#3a3c42]"
        }`}
      />
      {/* Left Edge: Volume Down Button */}
      <div
        className={`absolute -left-[9.5px] top-[220px] w-[3.5px] h-[52px] rounded-l-sm shadow-sm pointer-events-none transition-colors duration-300 ${
          isLight ? "bg-[#94a3b8]" : "bg-[#3a3c42]"
        }`}
      />
      {/* Right Edge: Side / Power Button */}
      <div
        className={`absolute -right-[9.5px] top-[170px] w-[3.5px] h-[78px] rounded-r-sm shadow-sm pointer-events-none transition-colors duration-300 ${
          isLight ? "bg-[#94a3b8]" : "bg-[#3a3c42]"
        }`}
      />

      {/* Screen Inner Container (Cleanly Clipped Display with Authentic Black Bezel) */}
      <div className="relative w-full h-full rounded-[41px] p-[3.5px] bg-[#000000] flex flex-col overflow-hidden">
        <div className="relative w-full h-full rounded-[37px] overflow-hidden flex flex-col">
          {/* Dynamic Island Silhouette */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-26 h-6 bg-black rounded-full z-30 flex items-center justify-between px-3 border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111]" />
            <div className="w-2 h-2 rounded-full bg-[#0d1624]" />
          </div>

        {/* Apple Wallpaper (Dark vs Light Gradient) */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-300 ${
            isLight
              ? "bg-gradient-to-b from-[#c5d5ea] via-[#f0f4f8] to-[#e8edf2]"
              : "bg-gradient-to-b from-[#181d2e] via-[#0d101a] to-[#05060a]"
          }`}
        />

        {/* Authentic iOS Status Bar with 4-Bar Signal, Wi-Fi & Battery */}
        <div
          className={`relative z-10 pt-3 px-7 flex items-center justify-between text-[11px] font-semibold tracking-tight transition-colors duration-200 ${
            isLight ? "text-[#1c1c1e]" : "text-white/90"
          }`}
        >
          <span>{clock.time}</span>
          <div className="flex items-center gap-1.5">
            {/* Cellular Signal (4 ascending solid bars) */}
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

        {/* Lockscreen Clock & Date (Live synchronized) */}
        <div className="relative z-10 pt-9 pb-4 flex flex-col items-center">
          <div
            className={`flex items-center gap-1.5 text-[11px] font-medium tracking-wide uppercase transition-colors duration-200 ${
              isLight ? "text-[#1c1c1e]/75" : "text-white/70"
            }`}
          >
            <Lock
              className={`w-3 h-3 ${isLight ? "text-[#1c1c1e]/60" : "text-white/60"}`}
            />
            <span>{clock.fullDate}</span>
          </div>
          <div
            className={`text-[68px] font-light leading-none tracking-tight mt-1 font-sans drop-shadow-md transition-colors duration-200 ${
              isLight ? "text-[#1c1c1e]" : "text-white/95"
            }`}
          >
            {clock.time}
          </div>
        </div>

        {/* Notification Area */}
        <div className="relative z-10 flex-1 px-3.5 pt-2 overflow-y-auto">
          <div
            onClick={onToggleExpand}
            className={`group cursor-pointer w-full rounded-[24px] p-3.5 transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isLight
                ? "bg-white/80 backdrop-blur-3xl border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:bg-white/90"
                : "bg-white/[0.13] backdrop-blur-3xl border border-white/[0.2] shadow-[0_12px_40px_rgba(0,0,0,0.45)] hover:bg-white/[0.18]"
            }`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-md overflow-hidden flex items-center justify-center shrink-0 shadow-sm border ${
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
                      className={`text-[10px] font-semibold ${
                        isLight ? "text-[#1c1c1e]" : "text-white/90"
                      }`}
                    >
                      {data.appName.charAt(0).toUpperCase() || "A"}
                    </span>
                  )}
                </div>
                <span
                  className={`font-semibold text-xs tracking-tight ${
                    isLight ? "text-[#1c1c1e]" : "text-white/95"
                  }`}
                >
                  {data.appName || "App Name"}
                </span>
              </div>
              <span
                className={`text-[10px] font-normal ${
                  isLight ? "text-[#8e8e93]" : "text-white/60"
                }`}
              >
                now
              </span>
            </div>

            {/* Content */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4
                  className={`text-[13px] font-semibold leading-snug tracking-tight ${
                    isLight ? "text-[#1c1c1e]" : "text-white"
                  }`}
                >
                  {data.title || "Notification Title"}
                </h4>

                {data.subtitle && (
                  <p
                    className={`text-[12px] font-medium leading-snug mt-0.5 ${
                      isLight ? "text-[#3a3a3c]" : "text-white/80"
                    }`}
                  >
                    {data.subtitle}
                  </p>
                )}

                <p
                  className={`text-[12px] leading-relaxed mt-0.5 transition-all duration-300 ${
                    isLight ? "text-[#48484a]" : "text-white/75"
                  } ${expanded ? "" : "line-clamp-2"}`}
                >
                  {data.body || "Notification body message..."}
                </p>
              </div>

              {/* Small thumbnail in collapsed view with smooth AnimatedSize fade */}
              {data.attachedImageUrl && (
                <div
                  className={`transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    expanded
                      ? "w-0 h-0 opacity-0 scale-75 overflow-hidden pointer-events-none"
                      : "w-11 h-11 opacity-100 scale-100 rounded-xl overflow-hidden shrink-0 shadow-sm border"
                  } ${
                    isLight
                      ? "bg-[#e5e7eb] border-black/10"
                      : "bg-black/40 border-white/10"
                  }`}
                >
                  <img
                    src={data.attachedImageUrl}
                    alt="Attachment"
                    className="w-11 h-11 object-cover"
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
                {/* Expanded Rich Media Attachment */}
                {data.attachedImageUrl && (
                  <div
                    className={`mt-2.5 rounded-xl overflow-hidden max-h-40 shadow-inner border ${
                      isLight
                        ? "bg-black/10 border-black/10"
                        : "bg-black/40 border-white/10"
                    }`}
                  >
                    <img
                      src={data.attachedImageUrl}
                      alt="Banner Attachment"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Expanded Action Buttons (iOS Frosted Glass Pills) */}
                {validButtons.length > 0 && (
                  <div
                    className={`mt-3 grid grid-cols-2 gap-1.5 pt-2 border-t ${
                      isLight ? "border-black/10" : "border-white/10"
                    }`}
                  >
                    {validButtons.map((btn, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`w-full py-1.5 px-2 rounded-xl text-[11px] font-medium text-center transition-colors shadow-sm ${
                          isLight
                            ? "bg-black/[0.06] hover:bg-black/[0.12] text-[#1c1c1e] border border-black/5"
                            : "bg-white/[0.16] hover:bg-white/[0.26] text-white border border-white/5"
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
                  ? "text-[#1c1c1e]/50 hover:text-[#1c1c1e]/80"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {expanded ? "▲ Tap card to collapse" : "▼ Tap card to expand"}
            </button>
          </div>
        </div>

        {/* Lockscreen Quick Action Controls (Flashlight & Camera) */}
        <div className="relative z-10 px-8 pb-6 flex items-center justify-between">
          <div
            className={`w-11 h-11 rounded-full backdrop-blur-xl border flex items-center justify-center shadow-md ${
              isLight
                ? "bg-black/10 border-black/10 text-[#1c1c1e]"
                : "bg-white/15 border-white/10 text-white/80"
            }`}
          >
            <Flashlight className="w-4 h-4" />
          </div>
          <div
            className={`w-11 h-11 rounded-full backdrop-blur-xl border flex items-center justify-center shadow-md ${
              isLight
                ? "bg-black/10 border-black/10 text-[#1c1c1e]"
                : "bg-white/15 border-white/10 text-white/80"
            }`}
          >
            <Camera className="w-4 h-4" />
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="relative z-10 pb-2 flex justify-center">
          <div
            className={`w-32 h-1 rounded-full ${
              isLight ? "bg-black/35" : "bg-white/50"
            }`}
          />
        </div>
        </div>
      </div>
    </div>
  );
}
