# Twilio

[![Fancified](art/fancified.svg)](https://particle.academy)

Twilio for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/twilio-ui` | `npm install @particle-academy/twilio-ui` |
| Node | `@particle-academy/twilio-js` | `npm install @particle-academy/twilio-js` |
| PHP 8.4+ | `particle-academy/twilio-php` | `composer require particle-academy/twilio-php` |
| Python 3.11+ | `fancy-twilio` | `pip install fancy-twilio` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Twilio SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### On Twilio's side

1. **Find your Account SID** — Sign in to the Twilio Console; the Account SID is on the Console home page. It is AC followed by 32 hex characters, and it is part of every URL this connector calls. A TRIAL account can only send to verified numbers (up to 5; your sign-up number is verified already), so upgrade before sending to anyone else. ([www.twilio.com](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account))
2. **Create a Standard API key for **your app's name**** — Console: Settings, Account settings, API keys & auth tokens, then Create API key. Choose Standard: it reaches every API this connector uses, but not the Accounts or Keys resources, so it cannot create more keys if it leaks. Copy the key's SID into the username and its secret into the password, and store the secret immediately. Leave the region at the default unless your account uses another Twilio region: this connector calls api.twilio.com. ([www.twilio.com](https://www.twilio.com/docs/iam/api-keys/keys-in-console))
3. **Give **your app's name** a sender** — Either a Twilio phone number with SMS capability, or a Messaging Service (Console: Messaging, Services, Create Messaging Service, then add your numbers to its sender pool). message_send takes one of From or MessagingServiceSid; for Laravel notifications set TWILIO_FROM or TWILIO_MESSAGING_SERVICE_SID so a notification that names no sender still has one. ([www.twilio.com](https://www.twilio.com/docs/messaging/services))
4. **Register for A2P 10DLC before texting US numbers** — Anyone sending application SMS to the US from a 10-digit long code must register for A2P 10DLC, hobbyists included, and unregistered traffic incurs additional carrier fees. If the number only sends verification codes, Twilio Verify can be used instead of registering. ([www.twilio.com](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc))
5. **Send a test message and read it back** — Send one SMS to a phone you can read, then read it back with message_get to see what Twilio did with it. ([www.twilio.com](https://www.twilio.com/docs/messaging/api/message-resource))

Every step in full — who does it, what to paste, which credentials it yields, and how you know it worked — is in [SETUP.md](SETUP.md).

### Credentials

A Twilio connection holds 3 values.

Every value here is `account` scope: one per connected account, not one per installation.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **Account SID** | per connected account | not secret | AC followed by 32 hex characters, from the Twilio Console. It is part of every request URL. |
| **API key SID (or Account SID)** | per connected account | not secret | An API key SID from the Twilio Console (API keys & tokens), recommended. Or the Account SID again, to authenticate with the Auth Token. |
| **API key secret (or Auth Token)** | per connected account | **secret** | The secret shown once when the API key was created, or the account's Auth Token. The Auth Token can do everything on the account; an API key can be revoked on its own. |

### The estate

**Twilio decides live-or-test by the KEY, not by the endpoint.** The same host serves both, and a live key pointed at a node marked “sandbox” reaches the real estate and SUCCEEDS. Nothing in the request distinguishes them, which is why credentials sit on the connection rather than on each node.

> Twilio's test estate is selected by the CREDENTIALS, not the URL: a separate test Account SID and test Auth Token (Console -> API keys & tokens), against the same api.twilio.com. A live key on a node marked sandbox texts a real phone and is billed. With test credentials only message_send works -- every other resource, including message_get, answers 403 -- nothing is sent or charged, no status callback fires, and From must be Twilio's magic +15005550006 (+15005550004 as To returns 21610, the STOP case). Test credentials are the test Account SID and Auth Token, not an API key.

## What it can do

### Actions

#### `message_get` — Twilio message

Read a message's current status, segments, price and error code.

`GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json` · reads only — safe to replay

| Input | Required | What it is |
|---|---|---|
| `sid` | yes | From message_send's data.sid. |

#### `message_send` — Send an SMS with Twilio

Send a text message.

`POST /2010-04-01/Accounts/{AccountSid}/Messages.json` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `to` | yes | The recipient in E.164, e.g. +14155550100. |
| `from` | no | A Twilio number you own, in E.164, or an alphanumeric sender ID where the destination allows one. Give this or a Messaging Service. |
| `messagingServiceSid` | no | MG... A Messaging Service picks the sender from its pool. Give this or From. |
| `body` | yes | The text. Up to 1,600 characters. A character outside GSM-7 makes the whole message UCS-2, which halves how much fits in each billed segment. |
| `statusCallback` | no | Optional. Twilio POSTs delivery status changes here. Verifying those requests arrives in 0.2.0. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Twilio has a sandbox. Set a
node's mode to `fake` and it returns the shape Twilio actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/twilio`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
