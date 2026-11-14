"use client";

import React from "react";

interface CharacterSafeMeterProps {
  current: number;
  recommended: number;
  max: number;
}

export function CharacterSafeMeter({
  current,
  recommended,
  max,
}: CharacterSafeMeterProps) {
  const isOverMax = current > max;
  const isOverRecommended = current > recommended;

  const percentage = Math.min(100, Math.round((current / max) * 100));

  let statusColor = "bg-[#EDEDED]/30";
  let textColor = "text-[#989A99]";

  if (isOverMax) {
    statusColor = "bg-rose-500";
    textColor = "text-rose-400";
  } else if (isOverRecommended) {
    statusColor = "bg-amber-400";
    textColor = "text-amber-300";
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="w-16 h-1.5 bg-[#282928] rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${statusColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`font-mono text-[11px] ${textColor}`}>
        {current}/{max}
      </span>
      {isOverRecommended && !isOverMax && (
        <span className="text-[10px] text-amber-400/90 hidden sm:inline">
          (may truncate on small screens)
        </span>
      )}
      {isOverMax && (
        <span className="text-[10px] text-rose-400 hidden sm:inline">
          (exceeds limit)
        </span>
      )}
    </div>
  );
}
