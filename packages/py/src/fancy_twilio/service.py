# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- twilio

"""Twilio, as one service descriptor shared by every Twilio operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

Twilio's test estate is selected by the CREDENTIALS, not the URL: a separate
test Account SID and test Auth Token (Console -> API keys & tokens), against
the same api.twilio.com. A live key on a node marked sandbox texts a real
phone and is billed. With test credentials only message_send works -- every
other resource, including message_get, answers 403 -- nothing is sent or
charged, no status callback fires, and From must be Twilio's magic
+15005550006 (+15005550004 as To returns 21610, the STOP case). Test
credentials are the test Account SID and Auth Token, not an API key.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "twilio"
TITLE = "Twilio"
SANDBOX = "credential"
BASE_URLS = {
    "live": "https://api.twilio.com",
    "sandbox": "https://api.twilio.com",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "accountSid",
    "username",
    "password",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Twilio's auth scheme to an outgoing request.
    
    HTTP basic, two parts: an API key SID and its secret (recommended), or the
    Account SID and its Auth Token. Either way the ACCOUNT SID is also a path
    segment of every URL (/2010-04-01/Accounts/{AccountSid}/...), which is why
    it is its own credential rather than read out of the username: with an API
    key the two differ.
    """
    from urllib.parse import quote as _quote

    _segment = _quote(str(credentials.get("accountSid") or ""), safe="")
    request.url = request.url.replace("{AccountSid}", _segment)
    request.url = request.url.replace("%7BAccountSid%7D", _segment)

    import base64

    pair = f"{credentials.get('username') or ''}:{credentials.get('password') or ''}"
    encoded = base64.b64encode(pair.encode()).decode()
    request.headers["Authorization"] = f"Basic {encoded}"


def descriptor() -> ServiceDescriptor:
    """The Twilio service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
