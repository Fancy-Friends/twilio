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
 * Twilio's identity on the authoring surface, shared by every Twilio node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
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

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const TWILIO_SERVICE = {
  service: "twilio",
  serviceTitle: "Twilio",
  domain: "messaging",
  sandbox: "credential",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a Twilio connection holds. */
export const TWILIO_CREDENTIALS = [
  {
    "key": "accountSid",
    "label": "Account SID",
    "scope": "account",
    "secret": false,
    "help": "AC followed by 32 hex characters, from the Twilio Console. It is part of every request URL."
  },
  {
    "key": "username",
    "label": "API key SID (or Account SID)",
    "scope": "account",
    "secret": false,
    "help": "An API key SID from the Twilio Console (API keys & tokens), recommended. Or the Account SID again, to authenticate with the Auth Token."
  },
  {
    "key": "password",
    "label": "API key secret (or Auth Token)",
    "scope": "account",
    "secret": true,
    "help": "The secret shown once when the API key was created, or the account's Auth Token. The Auth Token can do everything on the account; an API key can be revoked on its own."
  }
] as const;

/** Build a Twilio node's connector metadata from the operation it performs. */
export function twilioMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...TWILIO_SERVICE, role, operation, docs };
}
