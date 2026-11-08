<?php

declare(strict_types=1);

namespace ParticleAcademy\Twilio\Actions;

use ParticleAcademy\Twilio\Twilio;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Twilio or calls the faker.
 */
final class MessageSend
{
    public const OPERATION = 'message_send';
    public const METHOD = 'POST';
    public const PATH = '/2010-04-01/Accounts/{AccountSid}/Messages.json';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

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
        if (($config['to'] ?? null) === null || ($config['to'] ?? null) === '') {
            throw new ConnectorConfigException('message_send: "to" is required (To).');
        }

        if (($config['body'] ?? null) === null || ($config['body'] ?? null) === '') {
            throw new ConnectorConfigException('message_send: "body" is required (Body).');
        }

        if (! ((($config['from'] ?? null) !== null && ($config['from'] ?? null) !== '') || (($config['messagingServiceSid'] ?? null) !== null && ($config['messagingServiceSid'] ?? null) !== ''))) {
            throw new ConnectorConfigException('message_send: message_send needs a sender: From (a Twilio number) or a Messaging Service SID. Twilio refuses a message with neither..');
        }

        $body = [];

        $value = $config['to'] ?? null;
        $body['To'] = trim((string) $value);

        $value = $config['from'] ?? null;
        if ($value !== null && $value !== '') {
            $body['From'] = (string) $value;
        }

        $value = $config['messagingServiceSid'] ?? null;
        if ($value !== null && $value !== '') {
            $body['MessagingServiceSid'] = (string) $value;
        }

        $value = $config['body'] ?? null;
        $body['Body'] = (string) $value;

        $value = $config['statusCallback'] ?? null;
        if ($value !== null && $value !== '') {
            $body['StatusCallback'] = (string) $value;
        }

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
        return '/2010-04-01/Accounts/'.'{AccountSid}'.'/Messages.json';
    }
}
