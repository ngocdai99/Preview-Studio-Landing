"use client";

import React, { useRef } from "react";
import {
  PushNotificationData,
  CHARACTER_LIMITS,
  DEFAULT_PUSH_DATA,
} from "./types";
import { CharacterSafeMeter } from "./CharacterSafeMeter";
import { Image as ImageIcon, Upload, X, RotateCcw } from "lucide-react";

interface PushFormEditorProps {
  data: PushNotificationData;
  onChange: (data: PushNotificationData) => void;
  onReset: () => void;
}

export function PushFormEditor({
  data,
  onChange,
  onReset,
}: PushFormEditorProps) {
  const iconInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof PushNotificationData>(
    field: K,
    value: PushNotificationData[K]
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleFileUpload = (
    field: "iconUrl" | "attachedImageUrl",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateField(field, url);
    }
  };

  // Ensure buttons array always has 3 slots for Button 1, Button 2, Button 3
  const button1 = data.buttons[0] || "";
  const button2 = data.buttons[1] || "";
  const button3 = data.buttons[2] || "";

  const handleSlotChange = (index: number, val: string) => {
    const newButtons = [button1, button2, button3];
    newButtons[index] = val;
    // Keep empty strings until device rendering filters them out
    updateField("buttons", newButtons);
  };

  const loadPreset = (presetType: "promo" | "chat" | "reminder") => {
    if (presetType === "promo") {
      onChange({
        ...DEFAULT_PUSH_DATA,
        appName: "Store Preview Studio",
        title: "⚡ Black Friday Lifetime Pass",
        subtitle: "Unlock unlimited client links",
        body: "Get lifetime access to the offline store preview studio for agency client sign-offs. Deal ends in 4 hours.",
        buttons: ["Claim Offer", "Later", ""],
      });
    } else if (presetType === "chat") {
      onChange({
        ...DEFAULT_PUSH_DATA,
        appName: "Messenger",
        title: "Sarah Jenkins",
        subtitle: "Design Team",
        body: "Hey Kai, the client just signed off on the App Store screenshots! Exporting the ZIP file now.",
        buttons: ["Reply", "Mark as Read", ""],
      });
    } else {
      onChange({
        ...DEFAULT_PUSH_DATA,
        appName: "Fitness Hub",
        title: "Daily Goal Incomplete",
        subtitle: "Evening reminder",
        body: "You're only 850 steps away from closing your movement ring today. Take a quick 10-minute walk!",
        buttons: ["Start Walk", "Snooze", ""],
      });
    }
  };

  return (
    <div className="flex flex-col gap-3.5 text-xs sm:text-[13px]">
      {/* Top Presets Row */}
      <div className="flex items-center justify-between pb-2 border-b border-[#282928]/60">
        <span className="text-xs font-medium text-[#EDEDED]">Presets</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => loadPreset("promo")}
            className="px-2.5 py-1 text-[11px] font-medium text-[#c4c5c4] hover:text-white bg-[#1A1B1A] hover:bg-[#222422] border border-[#282928] rounded-lg transition-colors cursor-pointer"
          >
            Promo
          </button>
          <button
            type="button"
            onClick={() => loadPreset("chat")}
            className="px-2.5 py-1 text-[11px] font-medium text-[#c4c5c4] hover:text-white bg-[#1A1B1A] hover:bg-[#222422] border border-[#282928] rounded-lg transition-colors cursor-pointer"
          >
            Chat
          </button>
          <button
            type="button"
            onClick={() => loadPreset("reminder")}
            className="px-2.5 py-1 text-[11px] font-medium text-[#c4c5c4] hover:text-white bg-[#1A1B1A] hover:bg-[#222422] border border-[#282928] rounded-lg transition-colors cursor-pointer"
          >
            Reminder
          </button>
          <button
            type="button"
            onClick={onReset}
            className="p-1.5 text-[#989A99] hover:text-white transition-colors rounded-lg hover:bg-[#1A1B1A] cursor-pointer ml-1"
            title="Reset to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Your App Name */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-medium text-[#c4c5c4]">
            Your App Name
          </label>
          <CharacterSafeMeter
            current={data.appName.length}
            recommended={CHARACTER_LIMITS.appName.recommended}
            max={CHARACTER_LIMITS.appName.max}
          />
        </div>
        <input
          type="text"
          value={data.appName}
          onChange={(e) => updateField("appName", e.target.value)}
          maxLength={CHARACTER_LIMITS.appName.max}
          placeholder="e.g. ExampleApp"
          className="w-full bg-[#181918] border border-[#282928] rounded-lg px-3 py-2 text-[#f8fafc] placeholder-[#989A99]/40 focus:outline-none focus:border-white/20 text-xs sm:text-[13px] transition-colors"
        />
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-medium text-[#c4c5c4]">
            Title
          </label>
          <CharacterSafeMeter
            current={data.title.length}
            recommended={CHARACTER_LIMITS.title.recommended}
            max={CHARACTER_LIMITS.title.max}
          />
        </div>
        <input
          type="text"
          value={data.title}
          onChange={(e) => updateField("title", e.target.value)}
          maxLength={CHARACTER_LIMITS.title.max}
          placeholder="Notification Title..."
          className="w-full bg-[#181918] border border-[#282928] rounded-lg px-3 py-2 text-[#f8fafc] placeholder-[#989A99]/40 focus:outline-none focus:border-white/20 text-xs sm:text-[13px] transition-colors"
        />
      </div>

      {/* Subtitle (only for iOS) */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-medium text-[#c4c5c4]">
            Subtitle (only for iOS)
          </label>
          <CharacterSafeMeter
            current={data.subtitle.length}
            recommended={CHARACTER_LIMITS.subtitle.recommended}
            max={CHARACTER_LIMITS.subtitle.max}
          />
        </div>
        <input
          type="text"
          value={data.subtitle}
          onChange={(e) => updateField("subtitle", e.target.value)}
          maxLength={CHARACTER_LIMITS.subtitle.max}
          placeholder="Optional secondary line..."
          className="w-full bg-[#181918] border border-[#282928] rounded-lg px-3 py-2 text-[#f8fafc] placeholder-[#989A99]/40 focus:outline-none focus:border-white/20 text-xs sm:text-[13px] transition-colors"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-medium text-[#c4c5c4]">
            Message
          </label>
          <CharacterSafeMeter
            current={data.body.length}
            recommended={CHARACTER_LIMITS.body.recommended}
            max={CHARACTER_LIMITS.body.max}
          />
        </div>
        <textarea
          rows={3}
          value={data.body}
          onChange={(e) => updateField("body", e.target.value)}
          maxLength={CHARACTER_LIMITS.body.max}
          placeholder="Preview your push notification..."
          className="w-full bg-[#181918] border border-[#282928] rounded-lg px-3 py-2 text-[#f8fafc] placeholder-[#989A99]/40 focus:outline-none focus:border-white/20 text-xs sm:text-[13px] resize-none transition-colors leading-relaxed"
        />
      </div>

      {/* Icon (URL input with Upload trigger + thumbnail) */}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-medium text-[#c4c5c4]">
          Icon
        </label>
        <div className="relative flex items-center">
          <input
            type="file"
            ref={iconInputRef}
            onChange={(e) => handleFileUpload("iconUrl", e)}
            accept="image/*"
            className="hidden"
          />
          {data.iconUrl && (
            <div className="absolute left-2 w-5 h-5 rounded overflow-hidden shrink-0 border border-white/10 z-10 pointer-events-none">
              <img
                src={data.iconUrl}
                alt="Icon"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <input
            type="text"
            value={data.iconUrl}
            onChange={(e) => updateField("iconUrl", e.target.value)}
            placeholder="Image URL or upload local file..."
            className={`w-full bg-[#181918] border border-[#282928] rounded-lg ${
              data.iconUrl ? "pl-9" : "pl-3"
            } pr-16 py-2 text-[#f8fafc] placeholder-[#989A99]/40 focus:outline-none focus:border-white/20 text-xs sm:text-[13px] transition-colors`}
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            {data.iconUrl && (
              <button
                type="button"
                onClick={() => updateField("iconUrl", "")}
                className="p-1 text-[#989A99] hover:text-rose-400 transition-colors rounded cursor-pointer"
                title="Clear icon"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => iconInputRef.current?.click()}
              className="p-1 text-[#989A99] hover:text-white transition-colors rounded hover:bg-[#252625] cursor-pointer"
              title="Upload local icon"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Attached Image (URL input with Upload trigger + thumbnail) */}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-medium text-[#c4c5c4]">
          Attached Image
        </label>
        <div className="relative flex items-center">
          <input
            type="file"
            ref={imageInputRef}
            onChange={(e) => handleFileUpload("attachedImageUrl", e)}
            accept="image/*"
            className="hidden"
          />
          {data.attachedImageUrl && (
            <div className="absolute left-2 w-5 h-5 rounded overflow-hidden shrink-0 border border-white/10 z-10 pointer-events-none">
              <img
                src={data.attachedImageUrl}
                alt="Attached"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <input
            type="text"
            value={data.attachedImageUrl}
            onChange={(e) => updateField("attachedImageUrl", e.target.value)}
            placeholder="Image URL or upload banner..."
            className={`w-full bg-[#181918] border border-[#282928] rounded-lg ${
              data.attachedImageUrl ? "pl-9" : "pl-3"
            } pr-16 py-2 text-[#f8fafc] placeholder-[#989A99]/40 focus:outline-none focus:border-white/20 text-xs sm:text-[13px] transition-colors`}
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            {data.attachedImageUrl && (
              <button
                type="button"
                onClick={() => updateField("attachedImageUrl", "")}
                className="p-1 text-[#989A99] hover:text-rose-400 transition-colors rounded cursor-pointer"
                title="Clear image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="p-1 text-[#989A99] hover:text-white transition-colors rounded hover:bg-[#252625] cursor-pointer"
              title="Upload local banner"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Button 1 */}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-medium text-[#c4c5c4]">
          Button 1
        </label>
        <input
          type="text"
          value={button1}
          onChange={(e) => handleSlotChange(0, e.target.value)}
          maxLength={CHARACTER_LIMITS.button.max}
          placeholder="e.g. Reply"
          className="w-full bg-[#181918] border border-[#282928] rounded-lg px-3 py-2 text-[#f8fafc] placeholder-[#989A99]/40 focus:outline-none focus:border-white/20 text-xs sm:text-[13px] transition-colors"
        />
      </div>

      {/* Button 2 */}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-medium text-[#c4c5c4]">
          Button 2
        </label>
        <input
          type="text"
          value={button2}
          onChange={(e) => handleSlotChange(1, e.target.value)}
          maxLength={CHARACTER_LIMITS.button.max}
          placeholder="e.g. Ignore"
          className="w-full bg-[#181918] border border-[#282928] rounded-lg px-3 py-2 text-[#f8fafc] placeholder-[#989A99]/40 focus:outline-none focus:border-white/20 text-xs sm:text-[13px] transition-colors"
        />
      </div>

      {/* Button 3 */}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-medium text-[#c4c5c4]">
          Button 3
        </label>
        <input
          type="text"
          value={button3}
          onChange={(e) => handleSlotChange(2, e.target.value)}
          maxLength={CHARACTER_LIMITS.button.max}
          placeholder="e.g. Cancel"
          className="w-full bg-[#181918] border border-[#282928] rounded-lg px-3 py-2 text-[#f8fafc] placeholder-[#989A99]/40 focus:outline-none focus:border-white/20 text-xs sm:text-[13px] transition-colors"
        />
      </div>
    </div>
  );
}
