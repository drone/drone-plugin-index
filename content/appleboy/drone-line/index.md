---
date: 2017-01-06T00:00:00+00:00
title: Line
author: appleboy
tags: [ notifications, chat ]
repo: appleboy/drone-line
logo: line.svg
image: appleboy/drone-line
---

The Line plugin posts build status messages to your channel. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
    to: line_user_id
```

Example configuration with image message:

```diff
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
    to: line_user_id
+   images:
+     - https://example.com/1.png
+     - https://example.com/2.png
```

Example configuration with video message:

```diff
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
    to: line_user_id
+   videos:
+     - https://example.com/1.mp4
+     - https://example.com/2.mp4
```

Example configuration with audio message:

format: `audio_url::audio_length`

```diff
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
    to: line_user_id
+   audios:
+     - https://example.com/1.mp3::300
+     - https://example.com/2.mp3::400
```

Example configuration with sticker message:

```diff
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
    to: line_user_id
+   stickers:
+     - 1::1
+     - 1::2
```

Example configuration with location message:

format: `title::address::latitude::longitude`

```diff
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
    to: line_user_id
+   locations:
+     - title1::address1::latitude1::longitude1
+     - title2::address2::latitude2::longitude2
```

Example configuration for success and failure messages:

```diff
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
    to: line_user_id
+   when:
+     status: [ success, failure ]
```

Example configuration with a custom message template:

```diff
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
    to: line_user_id
+   message: |
+     {{ #success build.status }}
+       build {{ build.number }} succeeded. Good job.
+     {{ else }}
+       build {{ build.number }} failed. Fix me please.
+     {{ /success }}
```

# Parameter Reference

channel_secret
: line channel secret from [line developer center](https://developers.line.me)

channel_token
: line channel token from [line developer center](https://developers.line.me)

to
: line user id

message
: overwrite the default message template

images
: a valid URL to an image message

videos
: a valid URL to a video message

audios
: a valid URL to an audio message

locations
: a valid latitude and longitude value to a location message

stickers
: a vaild sticker format

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
