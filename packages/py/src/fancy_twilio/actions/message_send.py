# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/message-send.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/message-send.json (or weaver's template/) and regenerate:
#
# npm run provider -- twilio

"""Send a text message.

POST /2010-04-01/Accounts/{AccountSid}/Messages.json —
https://www.twilio.com/docs/messaging/api/message-resource#create-a-message-resource

This describes the request. `call` resolves the connection, picks the
estate, and either calls Twilio or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "message_send"
METHOD = "POST"
PATH = "/2010-04-01/Accounts/{AccountSid}/Messages.json"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the form body for one call, failing loudly and specifically."""
    if config.get("to") is None or config.get("to") == "":
        raise ConnectorConfigError(
            "message_send: \"to\" is required (To)."
        )

    if config.get("body") is None or config.get("body") == "":
        raise ConnectorConfigError(
            "message_send: \"body\" is required (Body)."
        )

    if not (
        (config.get("from") is not None and config.get("from") != "")
        or (config.get("messagingServiceSid") not in (None, ""))
    ):
        raise ConnectorConfigError(
            "message_send: message_send needs a sender: From (a Twilio number) or a Messaging "
            "Service SID. Twilio refuses a message with neither.."
        )

    out: dict[str, Any] = {}
    _value = config.get("to")
    if _value is None or _value == "":
        raise ConnectorConfigError("message_send: \"to\" is required.")

    out["To"] = str(_value).strip()
    _value = config.get("from")
    if _value is not None and _value != "":
        out["From"] = str(_value)
    _value = config.get("messagingServiceSid")
    if _value is not None and _value != "":
        out["MessagingServiceSid"] = str(_value)
    _value = config.get("body")
    if _value is None or _value == "":
        raise ConnectorConfigError("message_send: \"body\" is required.")

    out["Body"] = str(_value)
    _value = config.get("statusCallback")
    if _value is not None and _value != "":
        out["StatusCallback"] = str(_value)

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
        + "/Messages.json"
    )

def message_send(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Send a text message."""
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
