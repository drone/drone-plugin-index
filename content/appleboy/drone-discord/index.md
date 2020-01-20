---
date: 2017-06-10T00:00:00+00:00
title: Discord
author: appleboy
tags: [ notifications, chat ]
repo: appleboy/drone-discord
logo: discord.svg
repo: appleboy/drone-discord
image: appleboy/drone-discord
---

Webhooks are a low-effort way to post messages to channels in Discord. They do not require a bot user or authentication to use.

The discord plugin posts build status messages to discord channel. The below pipeline configuration demonstrates simple usage:

```yaml
- name: discord notification
  image: appleboy/drone-discord
  settings:
    webhook_id: xxxxxxxxxx
    webhook_token: xxxxxxxxxx
```

Example configuration with TTS (text-to-speech) message:

```diff
  - name: discord notification
    image: appleboy/drone-discord
    settings:
      webhook_id: xxxxxxxxxx
      webhook_token: xxxxxxxxxx
+     tts: true
      message: "Testing from drone image"
```

Example configuration with override the default username of the webhook:

```diff
  - name: discord notification
    image: appleboy/drone-discord
    settings:
      webhook_id: xxxxxxxxxx
      webhook_token: xxxxxxxxxx
+     username: appleboy
      message: "Testing from drone image"
```

Example configuration with override the default avatar of the webhook:

```diff
  - name: discord notification
    image: appleboy/drone-discord
    settings:
      webhook_id: xxxxxxxxxx
      webhook_token: xxxxxxxxxx
+     avatar_url: http://exampple.com/appleboy.png
      message: "Testing from drone image"
```

Example configuration with a custom message template:

```diff
  - name: discord notification
    image: appleboy/drone-discord
    settings:
      webhook_id: xxxxxxxxxx
      webhook_token: xxxxxxxxxx
+     message: >
+       {{#success build.status}}
+         build {{build.number}} succeeded. Good job.
+       {{else}}
+         build {{build.number}} failed. Fix me please.
+       {{/success}}
```

Example configuration using credentials from secrets:

```diff
  - name: discord notification
    image: appleboy/drone-discord
    settings:
-     webhook_id: xxxxxxxxxx
-     webhook_token: xxxxxxxxxx
+     secrets: [ discord_webhook_id, discord_webhook_token ]
      message: "Testing from drone image"
```

## Secret Reference

discord_webhook_id
: discord webhook id

discord_webhook_token
: discord webhook token

## Parameter Reference

webhook_id
: webhook id

webhook_token
: webhook token

avatar_url
: override the default avatar of the webhook

username
: override the default username of the webhook

tts
: true if this is a TTS message

message
: the message contents (up to 2000 characters)

## Template Reference

repo.owner
: repository owner

repo.name
: repository name

build.status
: build status type enumeration, either `success` or `failure`

build.event
: build event type enumeration, one of `push`, `pull_request`, `tag`, `deployment`

build.number
: build number

build.commit
: git sha for current commit

build.message
: git commit messsage for current commit

build.branch
: git branch for current commit

build.tag
: git tag for current commit

build.ref
: git ref for current commit

build.author
: git author for current commit

build.link
: link the the build results in drone

build.started
: unix timestamp for build started

build.finished
: unix timestamp for build finished

## Template Function Reference

uppercasefirst
: converts the first letter of a string to uppercase

uppercase
: converts a string to uppercase

lowercase
: converts a string to lowercase. Example `{{lowercase build.author}}`

datetime
: converts a unix timestamp to a date time string. Example `{{datetime build.started}}`

success
: returns true if the build is successful

failure
: returns true if the build is failed

truncate
: returns a truncated string to n characters. Example `{{truncate build.sha 8}}`

urlencode
: returns a url encoded string

since
: returns a duration string between now and the given timestamp. Example `{{since build.started}}`
