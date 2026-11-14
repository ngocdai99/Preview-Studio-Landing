import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="border-t border-border bg-background py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Copyright Column (Spans 6 cols on md, 5 on lg) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-2.5">
              <BrandIcon className="w-6 h-6" />
              <span className="font-semibold text-[15px] sm:text-base text-foreground tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <div className="space-y-1 text-xs text-muted/80">
              <p>{footer.copyright}</p>
              <p className="text-[11.5px] text-muted/70">{footer.disclaimer}</p>
            </div>
          </div>

          {/* Navigation Columns (Spans remaining columns) */}
          <div className="md:col-span-6 lg:col-span-7 grid grid-cols-2 gap-8 sm:gap-10 sm:justify-items-end">
            {footer.columns.map((column) => (
              <div key={column.title} className="space-y-3 sm:min-w-[140px]">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {column.title}
                </h3>
                <ul className="space-y-2 text-xs sm:text-[13px]">
                  {column.links.map((link) => {
                    const isExternal = link.href.startsWith("http");

                    if (isExternal) {
                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted hover:text-foreground transition-colors py-1 select-none"
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-60 stroke-[2.2]" />
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-block text-muted hover:text-foreground transition-colors py-1 select-none"
                        >
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
