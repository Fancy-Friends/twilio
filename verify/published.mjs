/*
 * Twilio — the published npm packages.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { twilioFaker } from "@particle-academy/twilio-js";
import { TWILIO_KINDS } from "@particle-academy/twilio-ui";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

/*
 * WHERE did that come from?
 *
 * Node resolves a bare specifier from the importing MODULE's directory, not
 * the working directory. So running this script across from a checkout
 * resolves out of the REPO's node_modules and silently tests the source
 * again — which it did, and passed, before CI caught it.
 *
 * Two things are checked, because neither is enough alone: that the package
 * came from an INSTALL rather than from source, and that this script is not
 * sitting inside the provider repo it is supposed to be testing.
 */
const resolved = import.meta.resolve("@particle-academy/twilio-js");
const here = dirname(fileURLToPath(import.meta.url));

assert.ok(
  !existsSync(join(here, "..", "packages", "js", "package.json")),
  `${here} is inside the provider repo, so a bare import resolves the repo's ` +
    "own node_modules. Copy this script into a project that installed the " +
    "published package and run it there.",
);
assert.match(resolved, /node_modules/, `resolved ${resolved}, which is not an installed package`);
console.log(`  ok   resolved from ${resolved}`);

const GOLDENS = [
  {
    "operation": "message_get",
    "config": {},
    "expected": {
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
    }
  },
  {
    "operation": "message_send",
    "config": {},
    "expected": {
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
    }
  }
];

for (const { operation, config, expected } of GOLDENS) {
  const faked = twilioFaker(operation, fakeRequest("twilio", operation, config));

  assert.deepEqual(
    faked,
    expected,
    `the PUBLISHED package produced different bytes for ${operation} than the repo does`,
  );
  console.log(`  ok   ${operation}`);
}

// The ui package is a separate tarball, and js depends on it by its
// published name — so this also proves that dependency resolves.
assert.equal(TWILIO_KINDS.length, 2);
for (const kind of TWILIO_KINDS) {
  const keys = kind.configSchema.map((field) => field.key);
  assert.equal(keys[0], "connection");
  assert.equal(keys[1], "mode");
  assert.ok(kind.outputShape.length > 0, `${kind.name} declares no output shape`);
}
console.log(`  ok   ui kinds resolve from ${"@particle-academy/twilio-ui"}`);

console.log(`\n  ${GOLDENS.length} operations verified against the published packages.`);
