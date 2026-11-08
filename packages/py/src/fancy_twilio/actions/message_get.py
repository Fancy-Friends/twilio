# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/message-get.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/message-get.json (or weaver's template/) and regenerate:
#
# npm run provider -- twilio

"""Read a message's current status, segments, price and error code.

GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json —
https://www.twilio.com/docs/messaging/api/message-resource#fetch-a-message-resource

This describes the request. `call` resolves the connection, picks the
estate, and either calls Twilio or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "message_get"
METHOD = "GET"
PATH = "/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json"
SIDE_EFFECTS = "none"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the form body for one call, failing loudly and specifically."""
    if config.get("sid") is None or config.get("sid") == "":
        raise ConnectorConfigError(
            "message_get: \"sid\" is required (Message SID)."
        )

    out: dict[str, Any] = {}

    return out



def path(config: dict[str, Any]) -> str:
    """The request path, with each config value URL-ENCODED into it.

    `PATH` above is the TEMPLATE, which is what the descriptor advertises;
    this is what a caller sends. A value interpolated raw changes WHICH URL is
    called — a range like `Sheet1!A:B`, or a sheet named `Q1/Q2` — and the
    provider answers 404 about the document rather than about the encoding.
    """
    return (
        "/2010-04-01/Accounts/"
        + "{AccountSid}"
        + "/Messages/"
        + quote(str(config.get("sid") or ""), safe="")
        + ".json"
    )

def message_get(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Read a message's current status, segments, price and error code."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        form=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
