<?php

declare(strict_types=1);

/*
 * Twilio — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/twilio-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Twilio\TwilioFaker;

$goldens = [
    [
        'operation' => 'message_get',
        'config' => [],
        'expected' => [
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
        ],
    ],
    [
        'operation' => 'message_send',
        'config' => [],
        'expected' => [
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
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('twilio', $operation, $config));
    $faked = TwilioFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
