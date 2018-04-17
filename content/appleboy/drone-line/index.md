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
    to_room: line_room_id
    to_group: line_group_id
```

<!-- https://github.com/appleboy/drone-line/issues/72#issuecomment-323929502 -->
Example to multiple line ids:

```diff
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
-   to: line_user_id
+   to:
+     - user id 1
+     - user id 2
```

Example to use drone secret

```diff
pipeline:
  line:
    image: appleboy/drone-line
-   channel_secret: xxxxxxxxxx
-   channel_token: xxxxxxxxxx
+   secrets: [ line_channel_secret, line_channel_token ]
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

Example configuration with a custom message template:

```diff
pipeline:
  line:
    image: appleboy/drone-line
    channel_secret: xxxxxxxxxx
    channel_token: xxxxxxxxxx
    to: line_user_id
+   message: >
+     {{#success build.status}}
+       build {{build.number}} succeeded. Good job.
+     {{else}}
+       build {{build.number}} failed. Fix me please.
+     {{/success}}
```

# Secret Reference

channel_secret
: line channel secret from [line developer center](https://developers.line.me)

channel_token
: line channel token from [line developer center](https://developers.line.me)

# Parameter Reference

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
