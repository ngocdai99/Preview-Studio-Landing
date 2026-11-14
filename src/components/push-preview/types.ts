export interface PushNotificationData {
  appName: string;
  title: string;
  subtitle: string;
  body: string;
  iconUrl: string;
  attachedImageUrl: string;
  buttons: string[];
}

export type DeviceType = "ios" | "android";
export type PreviewTheme = "dark" | "light";

export const DEFAULT_PUSH_DATA: PushNotificationData = {
  appName: "PreviewStudio",
  title: "Flash Sale: 50% Off Lifetime Access",
  subtitle: "Limited time offer for agencies",
  body: "Upgrade today to unlock unlimited client review links, custom branding, and export packs before midnight.",
  iconUrl: "",
  attachedImageUrl: "",
  buttons: ["View Offer", "Dismiss"],
};

export const CHARACTER_LIMITS = {
  appName: { max: 25, recommended: 20 },
  title: { max: 60, recommended: 40 },
  subtitle: { max: 60, recommended: 35 },
  body: { max: 250, recommended: 120 },
  button: { max: 15, recommended: 12 },
};
