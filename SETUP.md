# Setting up Twilio

Generated from `provider/manifest.json`; do not edit. Each step cites the provider page it
came from. Words in **bold** are values from YOUR app, filled in where a host shows these steps.

## 1. Find your Account SID

Sign in to the Twilio Console; the Account SID is on the Console home page. It is AC followed by 32 hex characters, and it is part of every URL this connector calls. A TRIAL account can only send to verified numbers (up to 5; your sign-up number is verified already), so upgrade before sending to anyone else.

**Yields:** `accountSid`

Source: [www.twilio.com](https://www.twilio.com/docs/usage/tutorials/how-to-use-your-free-trial-account)

## 2. Create a Standard API key for **your app's name**

Console: Settings, Account settings, API keys & auth tokens, then Create API key. Choose Standard: it reaches every API this connector uses, but not the Accounts or Keys resources, so it cannot create more keys if it leaks. Copy the key's SID into the username and its secret into the password, and store the secret immediately. Leave the region at the default unless your account uses another Twilio region: this connector calls api.twilio.com.

**Copy:**

- Friendly name: **your app's name** (**this connector's name**)

**Yields:** `username`, `password`

Source: [www.twilio.com](https://www.twilio.com/docs/iam/api-keys/keys-in-console)

## 3. Give **your app's name** a sender

Either a Twilio phone number with SMS capability, or a Messaging Service (Console: Messaging, Services, Create Messaging Service, then add your numbers to its sender pool). message_send takes one of From or MessagingServiceSid; for Laravel notifications set TWILIO_FROM or TWILIO_MESSAGING_SERVICE_SID so a notification that names no sender still has one.

Source: [www.twilio.com](https://www.twilio.com/docs/messaging/services)

## 4. Register for A2P 10DLC before texting US numbers

Anyone sending application SMS to the US from a 10-digit long code must register for A2P 10DLC, hobbyists included, and unregistered traffic incurs additional carrier fees. If the number only sends verification codes, Twilio Verify can be used instead of registering.

Source: [www.twilio.com](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc)

## 5. Send a test message and read it back — an AGENT step

Send one SMS to a phone you can read, then read it back with message_get to see what Twilio did with it.

**The agent is asked:**

> Using **your app's name**'s **this connector's name** connection, send one SMS with message_send to a phone the person can read (on a trial account, a verified number), then call message_get with the returned sid and report its status, error_code and error_message.

**Done when:** message_get reports status sent or delivered with error_code null, and the person received the text.

Source: [www.twilio.com](https://www.twilio.com/docs/messaging/api/message-resource)
