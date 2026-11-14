"use client";

import React, { useState } from "react";
import { PushNotificationData } from "./types";
import {
  generateFcmV1Payload,
  generateApnsPayload,
  generateOneSignalPayload,
} from "./payloadGenerator";
import { X, Copy, Check, Code } from "lucide-react";

interface FcmPayloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PushNotificationData;
}

export function FcmPayloadModal({
  isOpen,
  onClose,
  data,
}: FcmPayloadModalProps) {
  const [activeTab, setActiveTab] = useState<"fcm" | "apns" | "onesignal">(
    "fcm"
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  let code = "";
  if (activeTab === "fcm") {
    code = generateFcmV1Payload(data);
  } else if (activeTab === "apns") {
    code = generateApnsPayload(data);
  } else {
    code = generateOneSignalPayload(data);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1D1E1D] border border-[#282928] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#282928] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#171817] border border-[#282928] text-[#EDEDED]">
              <Code className="w-4 h-4 text-[#00D085]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#f8fafc]">
                Export Payload JSON
              </h3>
              <p className="text-xs text-[#989A99] mt-0.5">
                Ready-to-use payloads for backend services & testing tools
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#989A99] hover:text-[#EDEDED] transition-colors rounded-lg hover:bg-[#171817] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="px-5 pt-3 pb-2 flex items-center gap-2 bg-[#171817] border-b border-[#282928]">
          <button
            type="button"
            onClick={() => setActiveTab("fcm")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "fcm"
                ? "bg-[#1D1E1D] text-[#f8fafc] border border-[#282928] shadow-sm"
                : "text-[#989A99] hover:text-[#EDEDED]"
            }`}
          >
            Firebase FCM (HTTP v1)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("apns")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "apns"
                ? "bg-[#1D1E1D] text-[#f8fafc] border border-[#282928] shadow-sm"
                : "text-[#989A99] hover:text-[#EDEDED]"
            }`}
          >
            Apple APNs Raw
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("onesignal")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === "onesignal"
                ? "bg-[#1D1E1D] text-[#f8fafc] border border-[#282928] shadow-sm"
                : "text-[#989A99] hover:text-[#EDEDED]"
            }`}
          >
            OneSignal API
          </button>
        </div>

        {/* Code Content */}
        <div className="relative flex-1 p-5 overflow-auto bg-[#131413]">
          <pre className="font-mono text-xs text-[#EDEDED] leading-relaxed selection:bg-[#282928]">
            {code}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-[#282928] bg-[#171817] flex items-center justify-between">
          <span className="text-xs text-[#989A99]">
            {activeTab === "fcm" && "Compatible with Firebase Admin SDK & Postman"}
            {activeTab === "apns" && "Standard Apple Push Notification service dictionary"}
            {activeTab === "onesignal" && "REST API POST /api/v1/notifications body"}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="btn-scale flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EFF1F0] hover:bg-[#E1E3E2] text-[#252625] font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Payload
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
