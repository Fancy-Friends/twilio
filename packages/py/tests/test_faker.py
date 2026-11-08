# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- twilio

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_twilio._fake import FakeValues, seed_for_call
from fancy_twilio.faker import respond


def test_message_get_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("twilio", "message_get", config))

    faked = respond("message_get", {"config": config, "fake": fake})

    assert faked == {
        "sid": "SM_fake_2b8e2ce62c41",
        "account_sid": "AC_fake_0081c7af36f3",
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


def test_message_send_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("twilio", "message_send", config))

    faked = respond("message_send", {"config": config, "fake": fake})

    assert faked == {
        "sid": "SM_fake_6635db8975d6",
        "account_sid": "AC_fake_c83e3d24fccd",
        "status": "queued",
        "to": "+14155550100",
        "from": "+14155550199",
        "body": "Your code is 123456",
        "num_segments": "1",
        "direction": "outbound-api",
        "messaging_service_sid": None,
        "error_code": None,
        "error_message": None,
        "date_created": "Sat, 08 Nov 2026 12:00:00 +0000",
        "price": None,
        "price_unit": "USD",
        "api_version": "2010-04-01",
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("twilio", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
