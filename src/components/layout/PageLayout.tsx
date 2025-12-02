import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CookieBanner } from "@/components/common/CookieBanner";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A1A2F] text-slate-50">
      <SiteHeader />
      <main className="flex-1 bg-[#0A1A2F]">{children}</main>
      <SiteFooter />
      <CookieBanner />
    </div>
  );
}
