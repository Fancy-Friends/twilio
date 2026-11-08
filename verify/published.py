"""
Twilio — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_twilio._fake import FakeValues, seed_for_call
from fancy_twilio.faker import respond

GOLDENS = [
    {
        "operation": "message_get",
        "config": {},
        "expected": {
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
        },
    },
    {
        "operation": "message_send",
        "config": {},
        "expected": {
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
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-twilio")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("twilio", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
