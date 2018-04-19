---
date: 2016-01-13T00:00:00+00:00
title: Google Chat
author: josmo
tags: [  notifications, chat  ]
logo: gtalk.svg
repo: josmo/drone-google-chat
image: peloton/drone-google-chat
---

The Google chat plugin posts build status messages to your company google chat. The below pipeline configuration demonstrates simple usage:

This plugin is currently experimental since the full apis for google chat haven't been released

```yaml
pipeline:
  notify:
    image: peloton/drone-google-chat
    webook: https://dynamite.sandbox.googleapis.com/v1/rooms/roomid
    key: mykey
    token: mytoken  
```

Example configuration with a conversation key to group notifications together in a channel

```yaml
pipeline:
  notify:
    image: peloton/drone-google-chat
    webook: https://dynamite.sandbox.googleapis.com/v1/rooms/roomid
    key: mykey
    token: mytoken  
+   conversation_key: build_information
```

Example configuration with token as secret

```yaml
pipeline:
  notify:
    image: peloton/drone-google-chat
    webook: https://dynamite.sandbox.googleapis.com/v1/rooms/roomid
    key: mykey
+   secrets: [ GOOGLE_CHAT_TOKEN ] 
```

Example configuration with a custom message template:

```yaml
pipeline:
  notify:
    image: peloton/drone-google-chat
    webhook: https://dynamite.sandbox.googleapis.com/v1/rooms/roomid
    key: mykey
    token: mytoken 
+   template: >
+     {{#success build.status}}
+       build {{build.number}} succeeded. Good job.
+     {{else}}
+       build {{build.number}} failed. Fix me please.
+     {{/success}}
```

# Parameter Reference

webhook
: incomming webhook in the Bots section of google chat

key
: key for the webook

token
: secret token to allow messages to be posted

conversation_key
: arbitrary key to group messages together

template
: overwrite the default message template

# Template Reference

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

build.created
: unix timestamp for build creation

build.started
: unix timestamp for build started

# Template Function Reference

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
