/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/message-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/message-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- twilio
 */

/**
 * Twilio message — Read a message's current status, segments, price and error
 * code.
 *
 * https://www.twilio.com/docs/messaging/api/message-resource#fetch-a-message-resource
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { twilioMeta } from "../service.js";

export const TWILIO_MESSAGE_GET_KIND = "@particle-academy/twilio_message_get";
export const TWILIO_MESSAGE_GET_OPERATION = "message_get";

export const TWILIO_MESSAGE_GET_META = twilioMeta("action", "read a message", "https://www.twilio.com/docs/messaging/api/message-resource#fetch-a-message-resource");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const TWILIO_MESSAGE_GET_OUTPUT: OutputField[] = [
  {
    "path": "data.sid",
    "type": "string",
    "description": "The message SID (SM... or MM...)."
  },
  {
    "path": "data.status",
    "type": "string",
    "description": "queued, sending, sent, delivered, undelivered, failed, scheduled, canceled, and others. A send answers `queued` or `accepted`, not delivered: delivery is reported later."
  },
  {
    "path": "data.to",
    "type": "string",
    "description": "The recipient, E.164."
  },
  {
    "path": "data.from",
    "type": "string",
    "description": "The sender. Null while a Messaging Service is still choosing one."
  },
  {
    "path": "data.body",
    "type": "string",
    "description": "The text."
  },
  {
    "path": "data.num_segments",
    "type": "string",
    "description": "How many SMS segments Twilio billed or will bill. A STRING in Twilio's schema."
  },
  {
    "path": "data.messaging_service_sid",
    "type": "string",
    "description": "The Messaging Service used, if any."
  },
  {
    "path": "data.error_code",
    "type": "number",
    "description": "Twilio's error code when the message failed, e.g. 21610 (the recipient replied STOP). Null otherwise."
  },
  {
    "path": "data.error_message",
    "type": "string",
    "description": "Twilio's description of the error. Null otherwise."
  },
  {
    "path": "data.date_created",
    "type": "string",
    "description": "RFC 2822 date."
  },
  {
    "path": "data.price",
    "type": "string",
    "description": "The price, negative, once known. Null until then."
  },
  {
    "path": "data.price_unit",
    "type": "string",
    "description": "ISO 4217 currency of `price`."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against: fake or live."
  }
];

export const twilioMessageGetKind: NodeKindDefinition = defineConnectorKind(TWILIO_MESSAGE_GET_META, {
  name: TWILIO_MESSAGE_GET_KIND,
  aliases: ["twilio_message_get"],
  label: "Twilio message",
  description: "Read a message's current status, segments, price and error code.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: TWILIO_MESSAGE_GET_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "sid",
      "label": "Message SID",
      "required": true,
      "description": "From message_send's data.sid."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(TWILIO_MESSAGE_GET_META, config as Record<string, unknown>, "read a message"),
});
