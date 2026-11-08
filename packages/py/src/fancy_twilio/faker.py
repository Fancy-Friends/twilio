# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- twilio

"""The Twilio faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _as_number(value: Any) -> float | None:
    """The coercion an `"as": "integer" | "number"` config binding uses: a value
    that IS a number, never int(float(...))'s uncaught ValueError on one that
    merely looks like text (a text field's auto-generated example, before an
    author has typed a real one).
    """
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _message_get(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "sid": (
            str(_v)
            if (_v := config.get("sid")) is not None and _v != ""
            else fake.id("SM")
        ),
        "account_sid": fake.id("AC"),
        "status": "delivered",
        "to": "+14155550100",
        "from": "+14155550199",
        "body": "Your code is 123456",
        "num_segments": "1",
        "direction": "outbound-api",
        "messaging_service_sid": None,
        "error_code": None,
        "error_message": None,
        "date_created": "Sat, 08 Nov 2026 12:00:00 +0000",
        "price": "-0.00790",
        "price_unit": "USD",
        "api_version": "2010-04-01",
    }


def _message_send(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "sid": fake.id("SM"),
        "account_sid": fake.id("AC"),
        "status": "queued",
        "to": (str(_v) if (_v := config.get("to")) is not None and _v != "" else "+14155550100"),
        "from": (
            str(_v)
            if (_v := config.get("from")) is not None and _v != ""
            else "+14155550199"
        ),
        "body": (
            str(_v)
            if (_v := config.get("body")) is not None and _v != ""
            else "Your code is 123456"
        ),
        "num_segments": "1",
        "direction": "outbound-api",
        "messaging_service_sid": (
            str(_v)
            if (_v := config.get("messagingServiceSid")) is not None and _v != ""
            else None
        ),
        "error_code": None,
        "error_message": None,
        "date_created": "Sat, 08 Nov 2026 12:00:00 +0000",
        "price": None,
        "price_unit": "USD",
        "api_version": "2010-04-01",
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "message_get":
        return _message_get(config, fake)

    if operation == "message_send":
        return _message_send(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'twilio: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
