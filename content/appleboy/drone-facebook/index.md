---
date: 2017-01-07T00:00:00+00:00
title: Facebook
author: appleboy
tags: [ notifications, chat ]
repo: appleboy/drone-facebook
logo: facebook.svg
image: appleboy/drone-facebook
---

The Facebook plugin posts build status messages to your account. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: notify
  image: appleboy/drone-facebook
  settings:
    fb_page_token: xxxxxxxxxx
    fb_verify_token: xxxxxxxxxx
    app_secret: xxxxxxxxxx
    to: facebook_user_id
```

Example configuration using credentials from secrets:

```yaml
steps:
- name: notify
  image: appleboy/drone-facebook
  settings:
    fb_page_token:
      from_secret: fb_page_token
    fb_verify_token:
      from_secret: fb_verify_token
    app_secret:
      from_secret: app_secret
    to: facebook_user_id
```

Example configuration with image message:

```yaml
steps:
- name: notify
  image: appleboy/drone-facebook
  settings:
    fb_page_token:
      from_secret: fb_page_token
    fb_verify_token:
      from_secret: fb_verify_token
    app_secret:
      from_secret: app_secret
    to: facebook_user_id
    images:
      - https://example.com/1.png
      - https://example.com/2.png
```

Example configuration with video message:

```yaml
steps:
- name: notify
  image: appleboy/drone-facebook
  settings:
    fb_page_token:
      from_secret: fb_page_token
    fb_verify_token:
      from_secret: fb_verify_token
    app_secret:
      from_secret: app_secret
    to: facebook_user_id
    videos:
      - https://example.com/1.mp4
      - https://example.com/2.mp4
```

Example configuration with audio message:

```yaml
steps:
- name: notify
  image: appleboy/drone-facebook
  settings:
    fb_page_token:
      from_secret: fb_page_token
    fb_verify_token:
      from_secret: fb_verify_token
    app_secret:
      from_secret: app_secret
    to: facebook_user_id
    audios:
      - https://example.com/1.mp3
      - https://example.com/2.mp3
```

Example configuration with file message:

```yaml
steps:
- name: notify
  image: appleboy/drone-facebook
  settings:
    fb_page_token:
      from_secret: fb_page_token
    fb_verify_token:
      from_secret: fb_verify_token
    app_secret:
      from_secret: app_secret
    to: facebook_user_id
    files:
      - https://example.com/1.pdf
      - https://example.com/2.pdf
```

Example configuration with a custom message template:

```yaml
steps:
- name: notify
  image: appleboy/drone-facebook
  settings:
    fb_page_token:
      from_secret: fb_page_token
    fb_verify_token:
      from_secret: fb_verify_token
    app_secret:
      from_secret: app_secret
    to: facebook_user_id
    message: >
      {{#success build.status}}
        build {{build.number}} succeeded. Good job.
      {{else}}
        build {{build.number}} failed. Fix me please.
      {{/success}}
```

# Parameter Reference

page_token
: facebook page token from [facebook developer center](https://developers.facebook.com/)

verify_token
: facebook verify token from [facebook developer center](https://developers.facebook.com/)

app_secret
: The app secret from the facebook developer portal

to
: facebook user id

message
: overwrite the default message template

images
: a valid URL to an image message

videos
: a valid URL to a video message

audios
: a valid URL to an audio message

files
: a valid URL to a file message
