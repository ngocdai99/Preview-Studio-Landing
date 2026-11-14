"use client";

import React, { useState } from "react";
import {
  PushNotificationData,
  DeviceType,
  PreviewTheme,
  DEFAULT_PUSH_DATA,
} from "./types";
import { PushFormEditor } from "./PushFormEditor";
import { IosPreviewCard } from "./IosPreviewCard";
import { AndroidPreviewCard } from "./AndroidPreviewCard";
import { DeviceThemeToggle } from "./DeviceThemeToggle";
import { FcmPayloadModal } from "./FcmPayloadModal";
import { FunnelFooterBanner } from "./FunnelFooterBanner";
import { SlidingTabs } from "@/components/ui/SlidingTabs";
import { Code } from "lucide-react";

export function PushPreviewHub() {
  const [data, setData] = useState<PushNotificationData>(DEFAULT_PUSH_DATA);
  const [device, setDevice] = useState<DeviceType>("ios");
  const [singleDevice, setSingleDevice] = useState<"ios" | "android">("ios");
  const [theme, setTheme] = useState<PreviewTheme>("dark");
  // Independent expand/collapse states for iPhone and Android devices
  const [iosExpanded, setIosExpanded] = useState<boolean>(true);
  const [androidExpanded, setAndroidExpanded] = useState<boolean>(true);
  const [isPayloadOpen, setIsPayloadOpen] = useState<boolean>(false);

  const handleDeviceChange = (newDevice: DeviceType) => {
    setDevice(newDevice);
    if (newDevice === "ios" || newDevice === "android") {
      setSingleDevice(newDevice);
    }
  };

  const handleReset = () => {
    setData(DEFAULT_PUSH_DATA);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#131413] text-[#f8fafc]">
      {/* Top Header Bar */}
      <div className="w-full max-w-7xl px-4 sm:px-6 pt-8 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#282928]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono tracking-widest text-[#989A99] uppercase">
              Free Developer Tool
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1D1E1D] border border-[#282928] text-[#989A99]">
              Client-Side Local
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f8fafc]">
            Push Notification Visual Preview
          </h1>
          <p className="text-xs text-[#989A99] mt-0.5">
            Preview notifications on realistic iPhone & Android device frames before sending.
          </p>
        </div>

        {/* Header Action: Export FCM Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsPayloadOpen(true)}
            className="btn-scale flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-semibold text-xs tracking-tight transition-all duration-150 shadow-md cursor-pointer"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 100%), #006636",
              borderColor: "#1B845E",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow:
                "inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 1px 3px 0 rgba(0, 0, 0, 0.3)",
            }}
          >
            <Code className="w-3.5 h-3.5 text-[#00D085]" />
            Export FCM Payload
          </button>
        </div>
      </div>

      {/* Main Workspace (Completely Clean & Flat - No Enclosing Outer Cards) */}
      <div
        className={`w-full ${
          device === "dual" ? "max-w-[1440px]" : "max-w-7xl"
        } px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center transition-all duration-300`}
      >
        {/* Left Column: Clean Unboxed Form */}
        <div className="w-full lg:w-[370px] xl:w-[400px] shrink-0">
          <PushFormEditor
            data={data}
            onChange={setData}
            onReset={handleReset}
          />
        </div>

        {/* Right Column: Direct Phone Staging (Single 3D Flip vs Dual View) */}
        <div className="flex-1 w-full min-w-0 flex flex-col items-center justify-center pt-1">
          {device === "dual" ? (
            /* Dual View: Both iPhone & Android side-by-side with independent expand/collapse */
            <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-8 py-2 animate-in fade-in duration-300">
              {/* iPhone Staging */}
              <div className="flex flex-col items-center">
                <div className="text-[11px] font-mono tracking-widest text-[#989A99] uppercase mb-2">
                  iPhone Preview
                </div>
                <IosPreviewCard
                  data={data}
                  theme={theme}
                  expanded={iosExpanded}
                  onToggleExpand={() => setIosExpanded((prev) => !prev)}
                />
              </div>

              {/* Android Staging */}
              <div className="flex flex-col items-center">
                <div className="text-[11px] font-mono tracking-widest text-[#989A99] uppercase mb-2">
                  Android phone Preview
                </div>
                <AndroidPreviewCard
                  data={data}
                  theme={theme}
                  expanded={androidExpanded}
                  onToggleExpand={() => setAndroidExpanded((prev) => !prev)}
                />
              </div>
            </div>
          ) : (
            /* Single Device Staging with 3D Flip Card Animation */
            <div
              className="w-full flex justify-center py-2"
              style={{ perspective: "1400px" }}
            >
              {/* 3D Flipping Card Anchor */}
              <div
                className="relative w-full max-w-[340px] h-[650px] transition-transform duration-700 ease-[cubic-bezier(0.34,1.4,0.64,1)] will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  transform:
                    singleDevice === "android" ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front Face: iPhone Mockup */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <IosPreviewCard
                    data={data}
                    theme={theme}
                    expanded={iosExpanded}
                    onToggleExpand={() => setIosExpanded((prev) => !prev)}
                  />
                </div>

                {/* Back Face: Android Phone Mockup (Rotated 180deg) */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <AndroidPreviewCard
                    data={data}
                    theme={theme}
                    expanded={androidExpanded}
                    onToggleExpand={() => setAndroidExpanded((prev) => !prev)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Unified Device Controls: Device Switcher + Dual View + Capsule Theme Toggle */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <SlidingTabs<DeviceType>
              value={device}
              onChange={handleDeviceChange}
              options={[
                { value: "ios", label: "iOS" },
                { value: "android", label: "Android" },
                { value: "dual", label: "Dual" },
              ]}
              className="w-[230px] sm:w-[250px] shrink-0"
              size="sm"
              ariaLabel="Device selector tabs"
            />

            {/* Device Theme Toggle (Sun/Moon Capsule Switch from Core) */}
            <DeviceThemeToggle
              theme={theme}
              onChange={setTheme}
            />
          </div>
        </div>
      </div>

      {/* Conversion Banner & Lead Magnet Funnel */}
      <FunnelFooterBanner />

      {/* FCM & APNs Payload Modal */}
      <FcmPayloadModal
        isOpen={isPayloadOpen}
        onClose={() => setIsPayloadOpen(false)}
        data={data}
      />
    </div>
  );
}
