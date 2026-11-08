# Changelog

All notable changes to `@particle-academy/twilio-ui`, `@particle-academy/twilio-js`,
`particle-academy/twilio-php` and `fancy-twilio`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.1.1] — 2026-11-08

### Fixed

- **The Laravel config's environment variable names now split camelCase**,
  as documented. **Consumer action: none.** The old unsplit names are still
  read as a fallback, so an app that set them keeps working; the new names
  are preferred.

  | Preferred | Still read |
  |---|---|
  | `TWILIO_ACCOUNT_SID` | `TWILIO_ACCOUNTSID` |
  | `TWILIO_MESSAGING_SERVICE_SID` | `TWILIO_MESSAGINGSERVICESID` |
  | `TWILIO_STATUS_CALLBACK` | `TWILIO_STATUSCALLBACK` |

## [0.1.0] — 2026-11-08

### Added

- **First release.** `message_send` (an SMS from a Twilio number or a
  Messaging Service) and `message_get` (status, segments, price and Twilio's
  error code, e.g. 21610 when the recipient replied STOP).
- **Authentication:** HTTP basic with an API key SID and secret (recommended)
  or the Account SID and Auth Token. The Account SID is its own credential
  because it is also part of every URL.
- **Fake mode** answers from the faker, so tests send nothing.
- **A Laravel Notification channel**: `via(): ['twilio']` sends with
  `message_send`. The recipient is the notifiable's `routeNotificationForTwilio()`;
  `toTwilio($notifiable)` returns the body as a string, or `message_send`'s
  config as an array. `config('connectors.twilio.notifications')` (from
  `TWILIO_FROM`, `TWILIO_MESSAGINGSERVICESID`, `TWILIO_STATUSCALLBACK`) fills
  what the message leaves out, typically the sender; the message wins. No route
  means nothing is sent. `Twilio::fake()` covers notifications:
  `Twilio::assertSent('message_send', ...)`.
- Plus the Laravel layer every connector has: the service provider, the
  `Twilio` facade, `Twilio::fake()` with `assertSent`, and its own Pest suite.
