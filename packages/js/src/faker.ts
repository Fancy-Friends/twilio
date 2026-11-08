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
 * The Twilio faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Twilio actually publishes, so an author can wire {{ $json.data.id }}
 * against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeMessageGet({ config, fake }: FakeRequest): unknown {
  return {
    "sid": (config.sid !== undefined && config.sid !== null && config.sid !== "" ? String(config.sid) : fake.id("SM")),
    "account_sid": fake.id("AC"),
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
    "api_version": "2010-04-01",
  };
}

function fakeMessageSend({ config, fake }: FakeRequest): unknown {
  return {
    "sid": fake.id("SM"),
    "account_sid": fake.id("AC"),
    "status": "queued",
    "to": (config.to !== undefined && config.to !== null && config.to !== "" ? String(config.to) : "+14155550100"),
    "from": (config.from !== undefined && config.from !== null && config.from !== "" ? String(config.from) : "+14155550199"),
    "body": (config.body !== undefined && config.body !== null && config.body !== "" ? String(config.body) : "Your code is 123456"),
    "num_segments": "1",
    "direction": "outbound-api",
    "messaging_service_sid": (config.messagingServiceSid !== undefined && config.messagingServiceSid !== null && config.messagingServiceSid !== "" ? String(config.messagingServiceSid) : null),
    "error_code": null,
    "error_message": null,
    "date_created": "Sat, 08 Nov 2026 12:00:00 +0000",
    "price": null,
    "price_unit": "USD",
    "api_version": "2010-04-01",
  };
}

export const twilioFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "message_get":
      return fakeMessageGet(request);

    case "message_send":
      return fakeMessageSend(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `twilio: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
