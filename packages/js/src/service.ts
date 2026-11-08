/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- twilio
 */

/**
 * Twilio, as one service descriptor shared by every Twilio operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Twilio: its base URL, its auth
 * scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Twilio's test estate is selected by the CREDENTIALS, not the URL: a separate
 * test Account SID and test Auth Token (Console -> API keys & tokens), against
 * the same api.twilio.com. A live key on a node marked sandbox texts a real
 * phone and is billed. With test credentials only message_send works -- every
 * other resource, including message_get, answers 403 -- nothing is sent or
 * charged, no status callback fires, and From must be Twilio's magic
 * +15005550006 (+15005550004 as To returns 21610, the STOP case). Test
 * credentials are the test Account SID and Auth Token, not an API key.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { twilioFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const TWILIO_BASE_URLS = {
  "live": "https://api.twilio.com",
  "sandbox": "https://api.twilio.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const TWILIO_REQUIRES = [
  "accountSid",
  "username",
  "password"
] as const;

/**
 * Apply Twilio's auth scheme to an outgoing request.
 *
 * HTTP basic, two parts: an API key SID and its secret (recommended), or the
 * Account SID and its Auth Token. Either way the ACCOUNT SID is also a path
 * segment of every URL (/2010-04-01/Accounts/{AccountSid}/...), which is why
 * it is its own credential rather than read out of the username: with an API
 * key the two differ.
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function twilioAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  const accountSidSegment = encodeURIComponent(String(credentials.accountSid ?? ""));
  request.url = request.url.split("{AccountSid}").join(accountSidSegment).split("%7BAccountSid%7D").join(accountSidSegment);

  const encoded = Buffer.from(`${credentials.username ?? ""}:${credentials.password ?? ""}`).toString("base64");
  request.headers.Authorization = `Basic ${encoded}`;
}

/** The Twilio service, for the TypeScript runtime. */
export const TWILIO: ServiceDescriptor = {
  service: "twilio",
  title: "Twilio",
  sandbox: "credential",
  baseUrls: { ...TWILIO_BASE_URLS },
  requires: [...TWILIO_REQUIRES],
  authorize: twilioAuthorize,
  faker: twilioFaker,
};
