/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- twilio
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { twilioFaker } from "../src/faker.js";

test("message_get fakes the shape Twilio publishes", () => {
  const config = {};

  const faked = twilioFaker("message_get", fakeRequest("twilio", "message_get", config));

  assert.deepEqual(faked, {
    "sid": "SM_fake_2b8e2ce62c41",
    "account_sid": "AC_fake_0081c7af36f3",
    "status": "delivered",
    "to": "+14155550100",
    "from": "+14155550199",
    "body": "Your code is 123456",
    "num_segments": "1",
    "direction": "outbound-api",
    "messaging_service_sid": null,
    "error_code": null,
    "error_message": null,
    "date_created": "Sat, 08 Nov 2026 12:00:00 +0000",
    "price": "-0.00790",
    "price_unit": "USD",
    "api_version": "2010-04-01"
  });
});

test("message_send fakes the shape Twilio publishes", () => {
  const config = {};

  const faked = twilioFaker("message_send", fakeRequest("twilio", "message_send", config));

  assert.deepEqual(faked, {
    "sid": "SM_fake_6635db8975d6",
    "account_sid": "AC_fake_c83e3d24fccd",
    "status": "queued",
    "to": "+14155550100",
    "from": "+14155550199",
    "body": "Your code is 123456",
    "num_segments": "1",
    "direction": "outbound-api",
    "messaging_service_sid": null,
    "error_code": null,
    "error_message": null,
    "date_created": "Sat, 08 Nov 2026 12:00:00 +0000",
    "price": null,
    "price_unit": "USD",
    "api_version": "2010-04-01"
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => twilioFaker("no_such_operation", fakeRequest("twilio", "no_such_operation", {})), /no fake response/);
});
