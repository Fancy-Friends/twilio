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
 * Read a message's current status, segments, price and error code.
 *
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json —
 * https://www.twilio.com/docs/messaging/api/message-resource#fetch-a-message-resource
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Twilio or calls the faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { TWILIO } from "../service.js";

export const MESSAGE_GET_OPERATION = "message_get";

export type MessageGetOptions = {
  /** The node's resolved config. Keys: sid. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function twilioMessageGet(options: MessageGetOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.sid === undefined || config.sid === null || config.sid === "") {
    throw new Error(`message_get: "sid" is required (Message SID).`);
  }

  return callConnector(TWILIO, {
    operation: MESSAGE_GET_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/2010-04-01/Accounts/{AccountSid}/Messages/${encodeURIComponent(String(config.sid))}.json`,
      query: {},
    },
  });
}
