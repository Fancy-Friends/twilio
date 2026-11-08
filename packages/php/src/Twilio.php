<?php

declare(strict_types=1);

namespace ParticleAcademy\Twilio;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Connectors\Mode;
use ParticleAcademy\Connectors\PreparedRequest;
use ParticleAcademy\Connectors\SandboxKind;
use ParticleAcademy\Connectors\ServiceDescriptor;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- twilio
 */
/**
 * Twilio, as one service descriptor shared by every Twilio operation.
 *
 * The PHP twin of the js package's `src/service.ts`.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Twilio's test estate is selected by the CREDENTIALS, not the URL: a separate
 * test Account SID and test Auth Token (Console -> API keys & tokens), against
 * the same api.twilio.com. A live key on a node marked sandbox texts a real
 * phone and is billed. With test credentials only message_send works -- every
 * other resource, including message_get, answers 403 -- nothing is sent or
 * charged, no status callback fires, and From must be Twilio's magic
 * +15005550006 (+15005550004 as To returns 21610, the STOP case). Test
 * credentials are the test Account SID and Auth Token, not an API key.
 */
final class Twilio
{
    // The connector API version this package was GENERATED against. A
    // literal, never imported: an imported constant lets an upgrade rewrite
    // the very claim it exists to detect.
    public const CONNECTOR_API_VERSION = 1;

    public const SERVICE = 'twilio';

    public const LIVE_URL = 'https://api.twilio.com';
    public const SANDBOX_URL = 'https://api.twilio.com';

    /** @var list<string> Credential keys a remote call cannot proceed without. */
    public const REQUIRES = [
        'accountSid',
        'username',
        'password',
    ];

    public static function descriptor(): ServiceDescriptor
    {
        return new ServiceDescriptor(
            service: self::SERVICE,
            title: 'Twilio',
            sandbox: SandboxKind::Credential,
            baseUrls: [
                Mode::Live->value => self::LIVE_URL,
                Mode::Sandbox->value => self::SANDBOX_URL,
            ],
            requires: self::REQUIRES,
            authorize: self::authorize(...),
            // The core calls a faker ($operation, $config, $fake, $input); respond()
            // takes TypeScript's FakeRequest shape. This is the translation.
            faker: static fn (string $operation, array $config, FakeValues $fake, mixed $input = null): mixed => TwilioFaker::respond(
                $operation,
                ['config' => $config, 'fake' => $fake, 'input' => $input],
            ),
        );
    }

    /**
     * Apply Twilio's auth scheme to an outgoing request.
     *
     * HTTP basic, two parts: an API key SID and its secret (recommended), or the
     * Account SID and its Auth Token. Either way the ACCOUNT SID is also a path
     * segment of every URL (/2010-04-01/Accounts/{AccountSid}/...), which is why
     * it is its own credential rather than read out of the username: with an API
     * key the two differ.
     *
     * @param array<string,string> $credentials
     */
    public static function authorize(array $credentials, PreparedRequest $request, Mode $mode): void
    {
        $request->url = str_replace(['{AccountSid}', '%7BAccountSid%7D'], rawurlencode((string) ($credentials['accountSid'] ?? '')), $request->url);

        $encoded = base64_encode(($credentials['username'] ?? '').':'.($credentials['password'] ?? ''));
        $request->withHeader('Authorization', 'Basic '.$encoded);
    }
}
