---
version: '0.1'
date: 2018-05-28T00:00:00+00:00
title: Rocket.Chat
author: mike1pol
tags: [ notifications, chat ]
logo: rocket.chat.svg
repo: mike1pol/drone-rocket
image: mike1pol/drone-rocket
---
Drone plugin for sending message to Rocket.Chant channel using API.

```yaml
kind: pipeline
type: docker
name: default

steps:
  - name: rocket
    image: mike1pol/drone-rocket
    settings:
      url: xxxxxxxxxx
      user_id: xxxxxxxxxx
      token: xxxxxxxxxx
      channel: xxxxxxxxxx
```

Example configuration with TTS message:

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: rocket
    image: mike1pol/drone-rocket
    settings:
      url: xxxxxxxxxx
      user_id: xxxxxxxxxx
      token: xxxxxxxxxx
      channel: xxxxxxxxxx
+     message: "Test message from drone"
```

Example configuration with override the default avatar image:

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: rocket
    image: mike1pol/drone-rocket
    settings:
      url: xxxxxxxxxx
      user_id: xxxxxxxxxx
      token: xxxxxxxxxx
      channel: xxxxxxxxxx
      message: "Test message from drone"
+     avatar_url: "https://upload.wikimedia.org/wikipedia/commons/6/69/June_odd-eyed-cat_cropped.jpg"
```

Example configuration with a custom message template:

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: rocket
    image: mike1pol/drone-rocket
    settings:
      url: xxxxxxxxxx
      user_id: xxxxxxxxxx
      token: xxxxxxxxxx
      channel: xxxxxxxxxx
+     message: |
+       {{ #success build.status }}
+         build {{ build.number }} succeeded. Good job.
+       {{ else }}
+         build {{ build.number }} failed. Fix me please.
+       {{ /success }}
```

Example configuration using credentials from secrets:

```yaml
kind: pipeline
type: docker
name: default

steps:
  - name: rocket
    image: mike1pol/drone-rocket
    settings:
      url:
        from_secret: rocket_url
      user_id:
        from_secret: rocker_user
      token:
        from_secret: rocket_token
      channel:
        from_secret: rocket_channel
```

# Parameter Reference

url
: Rocket.chat url

user_id
: Rocket.chat user_id

token
: Rocket.chat user token

channel
: Rocket.chat channel

avatar_url
: override the default avatar of the user

message
: the message contents (up to 2000 characters)

# Template Reference

repo.owner
: repository owner

repo.name
: repository name

commit.sha
: git sha for current commit

commit.branch
: git branch for current commit

commit.link
: git commit link in remote

commit.author
: git author for current commit

commit.email
: git author email for current commit

commit.message
: git current commit message

build.status
: build status type enumeration, either `success` or `failure`

build.event
: build event type enumeration, one of `push`, `pull_request`, `tag`, `deployment`

build.number
: build number

build.tag
: git tag for current commit

build.link
: link the the build results in drone

build.started
: unix timestamp for build started

build.finished
: unix timestamp for build finished

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
