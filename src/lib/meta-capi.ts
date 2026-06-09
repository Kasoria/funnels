import crypto from "crypto";

const GRAPH_VERSION = process.env.META_CAPI_API_VERSION ?? "v21.0";

function hashPii(value?: string | null): string | undefined {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

export interface CapiUserData {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
  externalId?: string | null;
}

export interface CapiEvent {
  eventName: string;
  eventId: string;
  eventTime?: number;
  eventSourceUrl?: string | null;
  actionSource?: "website" | "system_generated";
  user: CapiUserData;
  customData?: Record<string, unknown>;
}

// Best-effort — a tracking failure must never break the funnel.
export async function sendCapiEvent(event: CapiEvent): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn(`[Meta CAPI] missing credentials — skipped ${event.eventName}`);
    return false;
  }

  const userData: Record<string, unknown> = {};
  const email = hashPii(event.user.email);
  if (email) userData.em = [email];
  const firstName = hashPii(event.user.firstName);
  if (firstName) userData.fn = [firstName];
  const lastName = hashPii(event.user.lastName);
  if (lastName) userData.ln = [lastName];
  const externalId = hashPii(event.user.externalId ?? event.user.email);
  if (externalId) userData.external_id = [externalId];
  if (event.user.fbp) userData.fbp = event.user.fbp;
  if (event.user.fbc) userData.fbc = event.user.fbc;
  if (event.user.clientIp) userData.client_ip_address = event.user.clientIp;
  if (event.user.userAgent) userData.client_user_agent = event.user.userAgent;

  const payload = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: event.actionSource ?? "website",
        ...(event.eventSourceUrl ? { event_source_url: event.eventSourceUrl } : {}),
        user_data: userData,
        ...(event.customData ? { custom_data: event.customData } : {}),
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_TEST_EVENT_CODE }
      : {}),
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
      { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) },
    );

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[Meta CAPI] ${event.eventName} rejected (${response.status}):`, detail);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[Meta CAPI] ${event.eventName} send failed:`, error);
    return false;
  }
}

export function capiContextFromRequest(req: Request): {
  clientIp: string | null;
  userAgent: string | null;
  fbp: string | null;
  fbc: string | null;
} {
  const forwarded = req.headers.get("x-forwarded-for");
  const clientIp = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || null;
  const userAgent = req.headers.get("user-agent");

  const cookieHeader = req.headers.get("cookie") ?? "";
  const readCookie = (name: string): string | null => {
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
    return match ? decodeURIComponent(match[1]) : null;
  };

  return { clientIp, userAgent, fbp: readCookie("_fbp"), fbc: readCookie("_fbc") };
}
