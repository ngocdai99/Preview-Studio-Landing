import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PushPreviewHub } from "@/components/push-preview/PushPreviewHub";

export const metadata: Metadata = {
  title: "Push Notification Visual Preview Tool & FCM Payload Generator",
  description:
    "Preview push notifications on realistic iPhone and Android phone frames before sending. Live character counter, media preview, and instant Firebase FCM v1 JSON export.",
  alternates: {
    canonical: "/push-preview",
  },
  openGraph: {
    title: "Push Notification Visual Preview Tool | Store Preview Studio",
    description:
      "Preview push notifications on realistic iPhone and Android phone frames before sending. Live character counter, media preview, and instant Firebase FCM v1 JSON export.",
    url: "https://storepreviewstudio.com/push-preview",
  },
};

export default function PushPreviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-foreground selection:text-background transition-colors">
      <Navbar />
      <main className="flex-1 w-full flex flex-col items-center">
        <PushPreviewHub />
      </main>
      <Footer />
    </div>
  );
}
