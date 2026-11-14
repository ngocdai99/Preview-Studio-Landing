"use client";

import React, { useRef } from "react";
import {
  PushNotificationData,
  CHARACTER_LIMITS,
  DEFAULT_PUSH_DATA,
} from "./types";
import { CharacterSafeMeter } from "./CharacterSafeMeter";
import { Image as ImageIcon, Upload, X, Plus, RotateCcw } from "lucide-react";

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

  const handleButtonChange = (index: number, val: string) => {
    const newButtons = [...data.buttons];
    newButtons[index] = val;
    updateField("buttons", newButtons);
  };

  const addButton = () => {
    if (data.buttons.length < 3) {
      updateField("buttons", [...data.buttons, "Action"]);
    }
  };

  const removeButton = (index: number) => {
    const newButtons = data.buttons.filter((_, i) => i !== index);
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
        buttons: ["Claim Offer", "Later"],
      });
    } else if (presetType === "chat") {
      onChange({
        ...DEFAULT_PUSH_DATA,
        appName: "Messenger",
        title: "Sarah Jenkins",
        subtitle: "Design Team",
        body: "Hey Kai, the client just signed off on the App Store screenshots! Exporting the ZIP file now.",
        buttons: ["Reply", "Mark as Read"],
      });
    } else {
      onChange({
        ...DEFAULT_PUSH_DATA,
        appName: "Fitness Hub",
        title: "Daily Goal Incomplete",
        subtitle: "Evening reminder",
        body: "You're only 850 steps away from closing your movement ring today. Take a quick 10-minute walk!",
        buttons: ["Start Walk", "Snooze"],
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 text-sm">
      {/* Header with Quick Presets */}
      <div className="flex items-center justify-between pb-4 border-b border-[#282928]">
        <div>
          <h2 className="text-base font-semibold text-[#f8fafc]">
            Notification Content
          </h2>
          <p className="text-xs text-[#989A99] mt-0.5">
            Real-time updates & instant truncation warnings
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => loadPreset("promo")}
            className="px-2.5 py-1 text-xs font-medium text-[#EDEDED] bg-[#171817] hover:bg-[#222322] border border-[#282928] rounded-lg transition-colors cursor-pointer"
          >
            Promo
          </button>
          <button
            type="button"
            onClick={() => loadPreset("chat")}
            className="px-2.5 py-1 text-xs font-medium text-[#EDEDED] bg-[#171817] hover:bg-[#222322] border border-[#282928] rounded-lg transition-colors cursor-pointer"
          >
            Chat
          </button>
          <button
            type="button"
            onClick={onReset}
            className="p-1.5 text-[#989A99] hover:text-[#EDEDED] transition-colors rounded-lg hover:bg-[#171817] cursor-pointer"
            title="Reset to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* App Name */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[#EDEDED]">
            App Name
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
          placeholder="e.g. PreviewStudio"
          className="w-full bg-[#131413] border border-[#282928] rounded-xl px-3.5 py-2.5 text-[#f8fafc] placeholder-[#989A99]/50 focus:outline-none focus:border-[#00D085]/60 focus:ring-1 focus:ring-[#00D085]/30 text-sm transition-all"
        />
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[#EDEDED]">
            Notification Title
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
          placeholder="Enter attention-grabbing headline..."
          className="w-full bg-[#131413] border border-[#282928] rounded-xl px-3.5 py-2.5 text-[#f8fafc] placeholder-[#989A99]/50 focus:outline-none focus:border-[#00D085]/60 focus:ring-1 focus:ring-[#00D085]/30 text-sm transition-all"
        />
      </div>

      {/* Subtitle (iOS only) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <label className="text-xs font-medium text-[#EDEDED]">
              Subtitle
            </label>
            <span className="text-[10px] text-[#989A99] px-2 py-0.5 rounded-full bg-[#171817] border border-[#282928]">
              iPhone
            </span>
          </div>
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
          placeholder="Optional secondary line for iPhone..."
          className="w-full bg-[#131413] border border-[#282928] rounded-xl px-3.5 py-2.5 text-[#f8fafc] placeholder-[#989A99]/50 focus:outline-none focus:border-[#00D085]/60 focus:ring-1 focus:ring-[#00D085]/30 text-sm transition-all"
        />
      </div>

      {/* Message Body */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[#EDEDED]">
            Message Body
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
          placeholder="Write the full push notification message..."
          className="w-full bg-[#131413] border border-[#282928] rounded-xl px-3.5 py-2.5 text-[#f8fafc] placeholder-[#989A99]/50 focus:outline-none focus:border-[#00D085]/60 focus:ring-1 focus:ring-[#00D085]/30 text-sm resize-none transition-all leading-relaxed"
        />
      </div>

      {/* Media & Images (App Icon + Attached Image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* App Icon Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#EDEDED]">
            App Icon
          </label>
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl bg-[#171817] border border-[#282928] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
              {data.iconUrl ? (
                <img
                  src={data.iconUrl}
                  alt="Icon"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-[#2d2f2d] to-[#181918] border border-white/10 flex items-center justify-center text-[#EDEDED] font-semibold text-xs shadow-inner">
                  {data.appName.charAt(0).toUpperCase() || "A"}
                </div>
              )}
            </div>
            <div className="flex-1 flex gap-1.5">
              <input
                type="file"
                ref={iconInputRef}
                onChange={(e) => handleFileUpload("iconUrl", e)}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => iconInputRef.current?.click()}
                className="flex-1 px-3 py-2 bg-[#171817] hover:bg-[#222322] border border-[#282928] text-xs font-medium text-[#EDEDED] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#989A99]" />
                Upload Icon
              </button>
              {data.iconUrl && (
                <button
                  type="button"
                  onClick={() => updateField("iconUrl", "")}
                  className="p-2 text-[#989A99] hover:text-[#EDEDED] transition-colors rounded-xl hover:bg-[#171817] cursor-pointer"
                  title="Remove icon"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Attached Big Picture Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#EDEDED]">
            Attached Banner (Expanded)
          </label>
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl bg-[#171817] border border-[#282928] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
              {data.attachedImageUrl ? (
                <img
                  src={data.attachedImageUrl}
                  alt="Attached"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-4 h-4 text-[#989A99]/50" />
              )}
            </div>
            <div className="flex-1 flex gap-1.5">
              <input
                type="file"
                ref={imageInputRef}
                onChange={(e) => handleFileUpload("attachedImageUrl", e)}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="flex-1 px-3 py-2 bg-[#171817] hover:bg-[#222322] border border-[#282928] text-xs font-medium text-[#EDEDED] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#989A99]" />
                Upload Banner
              </button>
              {data.attachedImageUrl && (
                <button
                  type="button"
                  onClick={() => updateField("attachedImageUrl", "")}
                  className="p-2 text-[#989A99] hover:text-[#EDEDED] transition-colors rounded-xl hover:bg-[#171817] cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-[#282928]">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[#EDEDED]">
            Interactive Action Buttons ({data.buttons.length}/3)
          </label>
          {data.buttons.length < 3 && (
            <button
              type="button"
              onClick={addButton}
              className="flex items-center gap-1 text-xs font-medium text-[#00D085] hover:text-[#26e099] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add CTA Button
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {data.buttons.map((btn, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={btn}
                onChange={(e) => handleButtonChange(idx, e.target.value)}
                maxLength={CHARACTER_LIMITS.button.max}
                placeholder={`Action button ${idx + 1}`}
                className="flex-1 bg-[#131413] border border-[#282928] rounded-xl px-3.5 py-2 text-xs text-[#f8fafc] placeholder-[#989A99]/50 focus:outline-none focus:border-[#00D085]/60 transition-colors"
              />
              <button
                type="button"
                onClick={() => removeButton(idx)}
                className="p-2 text-[#989A99] hover:text-rose-400 transition-colors rounded-lg hover:bg-[#171817] cursor-pointer"
                title="Delete button"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {data.buttons.length === 0 && (
            <p className="text-xs text-[#989A99]/70 italic">
              No action buttons added yet. Click &quot;Add CTA Button&quot; to test interactive CTA buttons.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
