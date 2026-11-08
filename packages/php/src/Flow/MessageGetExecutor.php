<?php

declare(strict_types=1);

namespace ParticleAcademy\Twilio\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Twilio\Actions\MessageGet;
use ParticleAcademy\Twilio\Twilio;

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
 * Twilio message, run on a fancy-flow-php host.
 *
 * The PHP twin of `twilioMessageGetExecutor` in @particle-academy/twilio-js:
 * the same request, built from the node's config by the same
 * `Actions\MessageGet` a host would call directly, and the same value on `out`
 * — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Twilio. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/twilio_message_get',
    aliases: [
        'twilio_message_get',
    ],
    category: 'io',
    label: 'Twilio message',
    description: 'Read a message\'s current status, segments, price and error code.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.sid',
            'type' => 'string',
            'description' => 'The message SID (SM... or MM...).',
        ],
        [
            'path' => 'data.status',
            'type' => 'string',
            'description' => 'queued, sending, sent, delivered, undelivered, failed, scheduled, canceled, and others. A send answers `queued` or `accepted`, not delivered: delivery is reported later.',
        ],
        [
            'path' => 'data.to',
            'type' => 'string',
            'description' => 'The recipient, E.164.',
        ],
        [
            'path' => 'data.from',
            'type' => 'string',
            'description' => 'The sender. Null while a Messaging Service is still choosing one.',
        ],
        [
            'path' => 'data.body',
            'type' => 'string',
            'description' => 'The text.',
        ],
        [
            'path' => 'data.num_segments',
            'type' => 'string',
            'description' => 'How many SMS segments Twilio billed or will bill. A STRING in Twilio\'s schema.',
        ],
        [
            'path' => 'data.messaging_service_sid',
            'type' => 'string',
            'description' => 'The Messaging Service used, if any.',
        ],
        [
            'path' => 'data.error_code',
            'type' => 'number',
            'description' => 'Twilio\'s error code when the message failed, e.g. 21610 (the recipient replied STOP). Null otherwise.',
        ],
        [
            'path' => 'data.error_message',
            'type' => 'string',
            'description' => 'Twilio\'s description of the error. Null otherwise.',
        ],
        [
            'path' => 'data.date_created',
            'type' => 'string',
            'description' => 'RFC 2822 date.',
        ],
        [
            'path' => 'data.price',
            'type' => 'string',
            'description' => 'The price, negative, once known. Null until then.',
        ],
        [
            'path' => 'data.price_unit',
            'type' => 'string',
            'description' => 'ISO 4217 currency of `price`.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against: fake or live.',
        ],
    ],
)]
final class MessageGetExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Twilio::descriptor(),
            MessageGet::OPERATION,
            $config,
            [
                'method' => MessageGet::METHOD,
                'path' => MessageGet::path($config),
                'query' => MessageGet::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'twilio message_get'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
