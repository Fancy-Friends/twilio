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
 * Send a text message.
 *
 * POST /2010-04-01/Accounts/{AccountSid}/Messages.json —
 * https://www.twilio.com/docs/messaging/api/message-resource#create-a-message-resource
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Twilio or calls the faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { TWILIO } from "../service.js";

export const MESSAGE_SEND_OPERATION = "message_send";

export type MessageSendOptions = {
  /** The node's resolved config. Keys: to, from, messagingServiceSid, body, statusCallback. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function twilioMessageSend(options: MessageSendOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.to === undefined || config.to === null || config.to === "") {
    throw new Error(`message_send: "to" is required (To).`);
  }

  if (config.body === undefined || config.body === null || config.body === "") {
    throw new Error(`message_send: "body" is required (Body).`);
  }

  if (!((config.from !== undefined && config.from !== null && config.from !== "") || (config.messagingServiceSid !== undefined && config.messagingServiceSid !== null && config.messagingServiceSid !== ""))) {
    throw new Error(`message_send: message_send needs a sender: From (a Twilio number) or a Messaging Service SID. Twilio refuses a message with neither..`);
  }

  return callConnector(TWILIO, {
    operation: MESSAGE_SEND_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: `/2010-04-01/Accounts/{AccountSid}/Messages.json`,
      form: {
        "To": String(config.to).trim(),
        ...(config.from !== undefined && config.from !== null && config.from !== "" ? { "From": String(config.from) } : {}),
        ...(config.messagingServiceSid !== undefined && config.messagingServiceSid !== null && config.messagingServiceSid !== "" ? { "MessagingServiceSid": String(config.messagingServiceSid) } : {}),
        "Body": String(config.body),
        ...(config.statusCallback !== undefined && config.statusCallback !== null && config.statusCallback !== "" ? { "StatusCallback": String(config.statusCallback) } : {}),
      },
    },
  });
}
