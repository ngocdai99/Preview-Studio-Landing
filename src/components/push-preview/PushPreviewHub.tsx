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
import { Smartphone, Code, Maximize2, Minimize2 } from "lucide-react";

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
      {/* Top Controls Bar */}
      <div className="w-full max-w-6xl px-4 sm:px-6 pt-8 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#282928]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono tracking-widest text-[#989A99] uppercase">
              Free Developer Tool
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1D1E1D] border border-[#282928] text-[#989A99]">
              Client-Side Local
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f8fafc]">
            Push Notification Visual Preview
          </h1>
          <p className="text-xs sm:text-sm text-[#989A99] mt-1 max-w-xl">
            Test realistic iPhone lock screen and Android notification layouts, verify character truncation limits, and export instant FCM v1 payloads.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Device Switcher */}
          <div className="p-1 rounded-xl bg-[#1D1E1D] border border-[#282928] flex items-center shadow-sm">
            <button
              type="button"
              onClick={() => setDevice("ios")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                device === "ios"
                  ? "bg-white text-[#0f172a] shadow-sm"
                  : "text-[#989A99] hover:text-[#EDEDED]"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              iPhone
            </button>
            <button
              type="button"
              onClick={() => setDevice("android")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                device === "android"
                  ? "bg-white text-[#0f172a] shadow-sm"
                  : "text-[#989A99] hover:text-[#EDEDED]"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Android phone
            </button>
          </div>

          {/* Expand / Collapse toggle */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1D1E1D] hover:bg-[#222322] border border-[#282928] text-xs font-medium text-[#EDEDED] transition-colors shadow-sm cursor-pointer"
            title={expanded ? "Collapse to single line view" : "Expand to media view"}
          >
            {expanded ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-[#989A99]" />
                <span className="hidden sm:inline">Compact</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#989A99]" />
                <span className="hidden sm:inline">Expanded</span>
              </>
            )}
          </button>

          {/* Export Payload Button (Supabase signature emerald styling) */}
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

      {/* Main 2-Column Workspace */}
      <div className="w-full max-w-6xl px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 bg-[#1D1E1D] border border-[#282928] rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
          <PushFormEditor
            data={data}
            onChange={setData}
            onReset={handleReset}
          />
        </div>

        {/* Right Column: Device Screen Preview (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
          <div className="w-full max-w-[340px] flex items-center justify-between px-2 mb-3 text-xs text-[#989A99]">
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {device === "ios" ? "iPhone Preview" : "Android Preview"}
            </span>
            <span className="text-[11px] font-medium text-[#989A99]">
              {expanded ? "Expanded Mode" : "Compact Mode"}
            </span>
          </div>

          {/* Active Device Mockup */}
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
