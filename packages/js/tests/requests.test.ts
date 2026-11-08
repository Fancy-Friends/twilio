/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- twilio
 */

/**
 * What Twilio actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { twilioMessageGet } from "../src/actions/message-get.js";
import { twilioMessageSend } from "../src/actions/message-send.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "accountSid": "test_accountSid",
  "username": "test_username",
  "password": "test_password"
};

test("message_get sends GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json", async () => {
  const { seen, transport } = capture();

  await twilioMessageGet({
    config: {
      "sid": "example-sid"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "GET");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/2010-04-01/Accounts/test_accountSid/Messages/example-sid.json"), seen[0]!.url);

  assert.deepEqual(
    Object.fromEntries(new URL(seen[0]!.url).searchParams),
    {},
  );
});

test("message_send sends POST /2010-04-01/Accounts/{AccountSid}/Messages.json", async () => {
  const { seen, transport } = capture();

  await twilioMessageSend({
    config: {
      "to": "  Example-to  ",
      "from": "example-from",
      "messagingServiceSid": "example-messagingServiceSid",
      "body": "example-body",
      "statusCallback": "example-statusCallback"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/2010-04-01/Accounts/test_accountSid/Messages.json"), seen[0]!.url);

  assert.deepEqual(
    Object.fromEntries(new URLSearchParams(String(seen[0]!.body ?? ""))),
    {
      "To": "Example-to",
      "From": "example-from",
      "MessagingServiceSid": "example-messagingServiceSid",
      "Body": "example-body",
      "StatusCallback": "example-statusCallback"
    },
  );
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await twilioMessageGet({
    config: {
      "sid": "example-sid"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  const encoded = Buffer.from("test_username:test_password").toString("base64");
  assert.equal(seen[0]!.headers.Authorization, `Basic ${encoded}`);
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    twilioMessageGet({
      config: {},
      credentials: CREDENTIALS,
      mode: "live",
      transport,
    }),
    new RegExp("sid"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
