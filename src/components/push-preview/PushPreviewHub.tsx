"use client";

import React, { useState } from "react";
import {
  PushNotificationData,
  DeviceType,
  DEFAULT_PUSH_DATA,
} from "./types";
import { PushFormEditor } from "./PushFormEditor";
import { IosPreviewCard } from "./IosPreviewCard";
import { AndroidPreviewCard } from "./AndroidPreviewCard";
import { FcmPayloadModal } from "./FcmPayloadModal";
import { FunnelFooterBanner } from "./FunnelFooterBanner";
import { SlidingTabs } from "@/components/ui/SlidingTabs";
import { Smartphone, Code } from "lucide-react";

export function PushPreviewHub() {
  const [data, setData] = useState<PushNotificationData>(DEFAULT_PUSH_DATA);
  const [device, setDevice] = useState<DeviceType>("ios");
  const [expanded, setExpanded] = useState<boolean>(true);
  const [isPayloadOpen, setIsPayloadOpen] = useState<boolean>(false);

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
      <div className="w-full max-w-7xl px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center">
        {/* Left Column: Clean Unboxed Form */}
        <div className="w-full lg:w-[380px] xl:w-[410px] shrink-0">
          <PushFormEditor
            data={data}
            onChange={setData}
            onReset={handleReset}
          />
        </div>

        {/* Right Column: Direct Phone Staging (Free-standing, No Enclosing Canvas Box) */}
        <div className="flex-1 w-full min-w-0 flex flex-col items-center justify-center pt-1">
          {/* Active Device Mockup Standing Directly on Background */}
          <div className="w-full flex justify-center py-2">
            {device === "ios" ? (
              <IosPreviewCard
                data={data}
                expanded={expanded}
                onToggleExpand={() => setExpanded(!expanded)}
              />
            ) : (
              <AndroidPreviewCard
                data={data}
                expanded={expanded}
                onToggleExpand={() => setExpanded(!expanded)}
              />
            )}
          </div>

          {/* Device Switcher Placed Directly Below Device Mockup (OneSignal Style) */}
          <div className="mt-5 flex items-center justify-center">
            <SlidingTabs<DeviceType>
              value={device}
              onChange={(val) => setDevice(val as DeviceType)}
              options={[
                {
                  value: "ios",
                  label: "iPhone",
                  icon: <Smartphone className="w-3.5 h-3.5" />,
                },
                {
                  value: "android",
                  label: "Android phone",
                  icon: <Smartphone className="w-3.5 h-3.5" />,
                },
              ]}
              className="w-[230px] sm:w-[250px] shrink-0"
              size="sm"
              ariaLabel="Device selector tabs"
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
