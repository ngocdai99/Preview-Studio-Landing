"use client";

import React from "react";
import Image from "next/image";

export function FunnelFooterBanner() {
  return (
    <section id="products" className="w-full mt-14 pt-10 border-t border-[#282928] pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-9">
          <span className="text-xs uppercase tracking-widest text-[#989A99] font-mono">
            Ecosystem Tools for Mobile Teams
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc] mt-1.5">
            Level up your App Store & Google Play submissions
          </h3>
          <p className="text-xs sm:text-sm text-[#989A99] max-w-xl mx-auto mt-2 leading-relaxed">
            Stop guessing character cutoffs and review delays. Explore our curated resources for mobile developers and agencies.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Product 1: The No-BS ASO Cheatsheet */}
          <article className="bg-[#1D1E1D] border border-[#282928] rounded-xl overflow-hidden flex flex-col sm:flex-row hover:border-[#383a38] transition-colors">
            <div className="relative aspect-square w-full sm:w-[200px] shrink-0 bg-[#131413] overflow-hidden">
              <Image
                src="/covers/gumroad_thumbnail_cheatsheet.png"
                alt="Cover of The No-BS ASO Cheatsheet"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    The No-BS ASO Cheatsheet
                  </h3>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#171817] border border-[#282928] text-[#EDEDED]">
                    Free
                  </span>
                </div>

                <p className="text-sm text-[#989A99] leading-relaxed mt-2">
                  A free guide to App Store and Google Play submission rules,
                  character limits and asset specs.
                </p>
              </div>

              <div className="pt-1 flex items-center gap-3 text-sm">
                <a
                  href="https://kaidevlabs.gumroad.com/l/aso-cheatsheet"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-medium bg-[#1D1E1D] text-[#EDEDED] border border-[#282928] hover:bg-[#222322] transition-colors"
                >
                  Get it on Gumroad
                </a>
              </div>
            </div>
          </article>

          {/* Product 2: Store Preview Studio */}
          <article className="bg-[#1D1E1D] border border-[#282928] rounded-xl overflow-hidden flex flex-col sm:flex-row hover:border-[#383a38] transition-colors">
            <div className="relative aspect-square w-full sm:w-[200px] shrink-0 bg-[#131413] overflow-hidden">
              <Image
                src="/covers/gumroad-store_preview.png"
                alt="Store Preview Studio: see your listing before you submit"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base font-semibold text-white tracking-tight">
                    Store Preview Studio
                  </h3>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#171817] border border-[#282928] text-[#EDEDED] inline-flex items-center gap-1.5">
                    <span className="line-through text-[#989A99] text-[10.5px]">$39</span>
                    <span className="text-[#00D085] font-semibold">$29</span>
                    <span className="text-[#989A99] text-[10.5px]">/ lifetime · One-time purchase</span>
                  </span>
                </div>

                <p className="text-sm text-[#989A99] leading-relaxed mt-2">
                  Preview your App Store and Google Play listing on accurate
                  device mockups before you submit, with app icon validation and resizing. Runs fully offline in your
                  browser; nothing is uploaded.
                </p>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-3 text-sm">
                <a
                  href="https://kaidevlabs.gumroad.com/l/store-preview-studio"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-medium bg-[#EFF1F0] text-[#252625] hover:bg-[#E1E3E2] transition-colors"
                >
                  Buy on Gumroad
                </a>
                <a
                  href="/try"
                  className="text-xs text-blue-300/80 hover:text-blue-200 underline underline-offset-4 decoration-blue-300/30 hover:decoration-blue-200/70 transition-colors"
                >
                  Open the live site →
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
