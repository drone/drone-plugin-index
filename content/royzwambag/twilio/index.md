---
date: 2020-08-14T00:00:00+00:00
title: Twilio
author: royzwambag
tags: [ twilio, sms ]
logo: twilio.svg
repo: royzwambag/drone-twilio
image: royzwambag/drone-twilio
---

This twilio plugin allows you to send an sms via the twilio api.

The below pipeline configuration demonstrates simple usage to deploy the current working directory:

```yaml
steps:
- name: twilio  
  image: royzwambag/drone-twilio
  settings:
    account_sid: AC1234abcdef
    auth_token:
      from_secret: twilio_auth_token
    from_number: +12512205274
    to_number: +12512205274
    body: Your drone build is ready!
    type: whatsapp
```

# Parameter Reference

account_sid
: `Required` Your twilio account SID

auth_token
: `Required` Your twilio auth token

from_number
: `Required` The number from which the sms will be send

to_number
: `Required` The number to which the sms will be send

body
: `Required` The body of the sms

type
: The type of message, choose between whatsapp and sms (defaults to sms)
