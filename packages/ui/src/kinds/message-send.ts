/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/message-send.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/message-send.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- twilio
 */

/**
 * Send an SMS with Twilio — Send a text message.
 *
 * https://www.twilio.com/docs/messaging/api/message-resource#create-a-message-resource
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { twilioMeta } from "../service.js";

export const TWILIO_MESSAGE_SEND_KIND = "@particle-academy/twilio_message_send";
export const TWILIO_MESSAGE_SEND_OPERATION = "message_send";

export const TWILIO_MESSAGE_SEND_META = twilioMeta("action", "send an SMS", "https://www.twilio.com/docs/messaging/api/message-resource#create-a-message-resource");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const TWILIO_MESSAGE_SEND_OUTPUT: OutputField[] = [
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

export const twilioMessageSendKind: NodeKindDefinition = defineConnectorKind(TWILIO_MESSAGE_SEND_META, {
  name: TWILIO_MESSAGE_SEND_KIND,
  aliases: ["twilio_message_send"],
  label: "Send an SMS with Twilio",
  description: "Send a text message.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: TWILIO_MESSAGE_SEND_OUTPUT,
  configSchema: [
    {
      "type": "expression",
      "key": "to",
      "label": "To",
      "required": true,
      "example": "{{ $json.phone }}",
      "description": "The recipient in E.164, e.g. +14155550100."
    },
    {
      "type": "text",
      "key": "from",
      "label": "From",
      "description": "A Twilio number you own, in E.164, or an alphanumeric sender ID where the destination allows one. Give this or a Messaging Service."
    },
    {
      "type": "text",
      "key": "messagingServiceSid",
      "label": "Messaging Service SID",
      "description": "MG... A Messaging Service picks the sender from its pool. Give this or From."
    },
    {
      "type": "textarea",
      "key": "body",
      "label": "Body",
      "required": true,
      "description": "The text. Up to 1,600 characters. A character outside GSM-7 makes the whole message UCS-2, which halves how much fits in each billed segment."
    },
    {
      "type": "text",
      "key": "statusCallback",
      "label": "Status callback URL",
      "description": "Optional. Twilio POSTs delivery status changes here. Verifying those requests arrives in 0.2.0."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(TWILIO_MESSAGE_SEND_META, config as Record<string, unknown>, "send an SMS"),
});
