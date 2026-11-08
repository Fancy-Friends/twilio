<?php

declare(strict_types=1);

namespace ParticleAcademy\Twilio\Actions;

use ParticleAcademy\Twilio\Twilio;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Twilio or calls the faker.
 */
final class MessageGet
{
    public const OPERATION = 'message_get';
    public const METHOD = 'GET';
    public const PATH = '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json';
    public const SIDE_EFFECTS = 'none';

    /**
     * Build the form body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Twilio.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        if (($config['sid'] ?? null) === null || ($config['sid'] ?? null) === '') {
            throw new ConnectorConfigException('message_get: "sid" is required (Message SID).');
        }

        $body = [];

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/2010-04-01/Accounts/'.'{AccountSid}'.'/Messages/'.rawurlencode((string) ($config['sid'] ?? '')).'.json';
    }
}
