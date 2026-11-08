# Changelog

All notable changes to `@particle-academy/twilio-ui`, `@particle-academy/twilio-js`,
`particle-academy/twilio-php` and `fancy-twilio`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.1.0] — 2026-11-15

### Added

- **First release.** `message_send` (an SMS from a Twilio number or a
  Messaging Service) and `message_get` (status, segments, price and Twilio's
  error code, e.g. 21610 when the recipient replied STOP).
- **Authentication:** HTTP basic with an API key SID and secret (recommended)
  or the Account SID and Auth Token. The Account SID is its own credential
  because it is also part of every URL.
- **Fake mode** answers from the faker, so tests send nothing.
