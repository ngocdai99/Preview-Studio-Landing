"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Layers } from "lucide-react";

export function FunnelFooterBanner() {
  return (
    <section className="w-full mt-12 pt-10 border-t border-[#282928] pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#989A99] font-mono">
            Ecosystem Tools for Mobile Teams
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc] mt-1.5">
            Level up your App Store & Google Play submissions
          </h3>
          <p className="text-xs sm:text-sm text-[#989A99] max-w-xl mx-auto mt-2">
            Stop guessing character cutoffs and review delays. Explore our curated resources for mobile developers and agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Free Cheatsheet */}
          <a
            href="https://kaidevlabs.gumroad.com/l/the-no-bs-aso-cheatsheet"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 sm:p-7 rounded-2xl bg-[#1D1E1D] border border-[#282928] hover:border-[#383a38] transition-all flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#171817] border border-[#282928] flex items-center justify-center text-[#EDEDED] shadow-inner">
                  <BookOpen className="w-5 h-5 text-[#00D085]" />
                </div>
                <span className="text-xs font-semibold text-[#EDEDED] px-3 py-1 rounded-full bg-[#171817] border border-[#282928]">
                  Free Guide ($0+)
                </span>
              </div>
              <h4 className="text-lg font-semibold text-[#f8fafc] group-hover:text-white transition-colors">
                The No-BS ASO Cheatsheet
              </h4>
              <p className="text-xs sm:text-sm text-[#989A99] mt-2 leading-relaxed">
                App Store & Google Play character limits, asset specs, and submission rules compiled into a single pragmatic reference guide.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#00D085] group-hover:text-[#26e099] transition-colors">
              <span>Get free download on Gumroad</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Card 2: Store Preview Studio ($39) */}
          <Link
            href="/"
            className="group relative p-6 sm:p-7 rounded-2xl bg-[#1D1E1D] border border-[#282928] hover:border-[#383a38] transition-all flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#171817] border border-[#282928] flex items-center justify-center text-[#EDEDED] shadow-inner">
                  <Layers className="w-5 h-5 text-[#00D085]" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EFF1F0] text-[#252625] shadow-sm">
                  Flagship Tool ($39)
                </span>
              </div>
              <h4 className="text-lg font-semibold text-[#f8fafc] group-hover:text-white transition-colors">
                Store Preview Studio
              </h4>
              <p className="text-xs sm:text-sm text-[#989A99] mt-2 leading-relaxed">
                Live App Store & Google Play listings preview on realistic device frames. Streamlined client sign-offs and one-click ZIP handoff packs.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#00D085] group-hover:text-[#26e099] transition-colors">
              <span>Explore Studio & Interactive Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
