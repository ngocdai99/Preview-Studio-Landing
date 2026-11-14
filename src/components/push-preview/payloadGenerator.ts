import { PushNotificationData } from "./types";

export function generateFcmV1Payload(data: PushNotificationData): string {
  const payload = {
    message: {
      topic: "all_users",
      notification: {
        title: data.title || "Notification Title",
        body: data.body || "Notification Body text",
        ...(data.attachedImageUrl ? { image: data.attachedImageUrl } : {}),
      },
      android: {
        notification: {
          title: data.title || "Notification Title",
          body: data.body || "Notification Body text",
          ...(data.iconUrl ? { icon: "ic_notification" } : {}),
          ...(data.attachedImageUrl ? { image: data.attachedImageUrl } : {}),
          click_action: "FLUTTER_NOTIFICATION_CLICK",
        },
      },
      apns: {
        payload: {
          aps: {
            alert: {
              title: data.title || "Notification Title",
              ...(data.subtitle ? { subtitle: data.subtitle } : {}),
              body: data.body || "Notification Body text",
            },
            sound: "default",
            badge: 1,
            ...(data.attachedImageUrl
              ? {
                  "mutable-content": 1,
                }
              : {}),
          },
        },
        ...(data.attachedImageUrl
          ? {
              fcm_options: {
                image: data.attachedImageUrl,
              },
            }
          : {}),
      },
      data: {
        click_action: "OPEN_APP",
        campaign_id: "push_promo_2026",
      },
    },
  };

  return JSON.stringify(payload, null, 2);
}

export function generateApnsPayload(data: PushNotificationData): string {
  const payload = {
    aps: {
      alert: {
        title: data.title || "Notification Title",
        ...(data.subtitle ? { subtitle: data.subtitle } : {}),
        body: data.body || "Notification Body text",
      },
      badge: 1,
      sound: "default",
      "mutable-content": data.attachedImageUrl ? 1 : 0,
    },
    ...(data.attachedImageUrl ? { "media-url": data.attachedImageUrl } : {}),
    ...(data.buttons.length > 0 ? { actions: data.buttons } : {}),
  };

  return JSON.stringify(payload, null, 2);
}

export function generateOneSignalPayload(data: PushNotificationData): string {
  const payload = {
    app_id: "YOUR_ONESIGNAL_APP_ID",
    included_segments: ["All"],
    headings: { en: data.title || "Notification Title" },
    ...(data.subtitle ? { subtitle: { en: data.subtitle } } : {}),
    contents: { en: data.body || "Notification Body text" },
    ...(data.attachedImageUrl
      ? {
          big_picture: data.attachedImageUrl,
          ios_attachments: { id1: data.attachedImageUrl },
        }
      : {}),
    ...(data.buttons.length > 0
      ? {
          buttons: data.buttons.map((b, idx) => ({
            id: `id_${idx}`,
            text: b,
          })),
        }
      : {}),
  };

  return JSON.stringify(payload, null, 2);
}
