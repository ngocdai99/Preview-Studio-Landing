"use client";

import React, { useState } from "react";
import { PushNotificationData } from "./types";
import {
  generateFcmV1Payload,
  generateApnsPayload,
  generateOneSignalPayload,
} from "./payloadGenerator";
import { X, Copy, Check, Code } from "lucide-react";
import { SlidingTabs } from "@/components/ui/SlidingTabs";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[720px] max-h-[90vh] bg-[#1D1E1D] border border-[#282928] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#282928] flex items-center justify-between">
          <div className="flex items-center gap-3">
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
        <div className="px-6 py-3 bg-[#171817] border-b border-[#282928] flex items-center">
          <SlidingTabs<"fcm" | "apns" | "onesignal">
            value={activeTab}
            onChange={setActiveTab}
            options={[
              { value: "fcm", label: "Firebase FCM (HTTP v1)" },
              { value: "apns", label: "Apple APNs Raw" },
              { value: "onesignal", label: "OneSignal API" },
            ]}
            className="w-full sm:w-[500px]"
            size="sm"
            ariaLabel="Payload format selector"
          />
        </div>

        {/* Code Content */}
        <div className="relative flex-1 p-6 overflow-auto bg-[#131413]">
          <pre className="font-mono text-[13px] text-[#EDEDED] leading-relaxed selection:bg-[#282928]">
            {code}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#282928] bg-[#171817] flex items-center justify-between">
          <span className="text-xs text-[#989A99]">
            {activeTab === "fcm" && "Compatible with Firebase Admin SDK & Postman"}
            {activeTab === "apns" && "Standard Apple Push Notification service dictionary"}
            {activeTab === "onesignal" && "REST API POST /api/v1/notifications body"}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="btn-scale h-8.5 flex items-center gap-1.5 px-4 rounded-full text-white font-medium text-xs tracking-tight transition-all duration-150 shadow-sm cursor-pointer border border-[#282928] bg-[#1D1E1D] hover:bg-[#252625] hover:border-[#383A38]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00D085]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#00D085]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
