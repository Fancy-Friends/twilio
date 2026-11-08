<?php

declare(strict_types=1);

use ParticleAcademy\Twilio\TwilioFaker;
use ParticleAcademy\Connectors\FakeValues;

/*
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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('message_get fakes the shape Twilio publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('twilio', 'message_get', $config));

    $faked = TwilioFaker::respond('message_get', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'sid' => 'SM_fake_2b8e2ce62c41',
        'account_sid' => 'AC_fake_0081c7af36f3',
        'status' => 'delivered',
        'to' => '+14155550100',
        'from' => '+14155550199',
        'body' => 'Your code is 123456',
        'num_segments' => '1',
        'direction' => 'outbound-api',
        'messaging_service_sid' => null,
        'error_code' => null,
        'error_message' => null,
        'date_created' => 'Sat, 08 Nov 2026 12:00:00 +0000',
        'price' => '-0.00790',
        'price_unit' => 'USD',
        'api_version' => '2010-04-01',
    ]);
});

it('message_send fakes the shape Twilio publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('twilio', 'message_send', $config));

    $faked = TwilioFaker::respond('message_send', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'sid' => 'SM_fake_6635db8975d6',
        'account_sid' => 'AC_fake_c83e3d24fccd',
        'status' => 'queued',
        'to' => '+14155550100',
        'from' => '+14155550199',
        'body' => 'Your code is 123456',
        'num_segments' => '1',
        'direction' => 'outbound-api',
        'messaging_service_sid' => null,
        'error_code' => null,
        'error_message' => null,
        'date_created' => 'Sat, 08 Nov 2026 12:00:00 +0000',
        'price' => null,
        'price_unit' => 'USD',
        'api_version' => '2010-04-01',
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('twilio', 'no_such_operation', []));

    expect(fn () => TwilioFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
