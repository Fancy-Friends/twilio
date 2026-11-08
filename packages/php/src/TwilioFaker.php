<?php

declare(strict_types=1);

namespace ParticleAcademy\Twilio;

use ParticleAcademy\Connectors\FakeRequest;

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
 * The Twilio faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class TwilioFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'message_get' => self::MessageGet($config, $fake),
            'message_send' => self::MessageSend($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'twilio: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function MessageGet(array $config, mixed $fake): array|\stdClass
    {
        return [
        'sid' => ((($v = $config['sid'] ?? null) !== null && $v !== '') ? (string) $v : $fake->id('SM')),
        'account_sid' => $fake->id('AC'),
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
    ];
    }

    /** @param array<string,mixed> $config */
    private static function MessageSend(array $config, mixed $fake): array|\stdClass
    {
        return [
        'sid' => $fake->id('SM'),
        'account_sid' => $fake->id('AC'),
        'status' => 'queued',
        'to' => ((($v = $config['to'] ?? null) !== null && $v !== '') ? (string) $v : '+14155550100'),
        'from' => ((($v = $config['from'] ?? null) !== null && $v !== '') ? (string) $v : '+14155550199'),
        'body' => ((($v = $config['body'] ?? null) !== null && $v !== '') ? (string) $v : 'Your code is 123456'),
        'num_segments' => '1',
        'direction' => 'outbound-api',
        'messaging_service_sid' => ((($v = $config['messagingServiceSid'] ?? null) !== null && $v !== '') ? (string) $v : null),
        'error_code' => null,
        'error_message' => null,
        'date_created' => 'Sat, 08 Nov 2026 12:00:00 +0000',
        'price' => null,
        'price_unit' => 'USD',
        'api_version' => '2010-04-01',
    ];
    }
}
