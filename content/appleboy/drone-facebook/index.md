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
pipeline:
  facebook:
    image: appleboy/drone-facebook
    fb_page_token: xxxxxxxxxx
    fb_verify_token: xxxxxxxxxx
    to: facebook_user_id
```

Example configuration with image message:

```diff
pipeline:
  facebook:
    image: appleboy/drone-facebook
    fb_page_token: xxxxxxxxxx
    fb_verify_token: xxxxxxxxxx
    to: facebook_user_id
+   images:
+     - https://example.com/1.png
+     - https://example.com/2.png
```

Example configuration with video message:

```diff
pipeline:
  facebook:
    image: appleboy/drone-facebook
    fb_page_token: xxxxxxxxxx
    fb_verify_token: xxxxxxxxxx
    to: facebook_user_id
+   videos:
+     - https://example.com/1.mp4
+     - https://example.com/2.mp4
```

Example configuration with audio message:

```diff
pipeline:
  facebook:
    image: appleboy/drone-facebook
    fb_page_token: xxxxxxxxxx
    fb_verify_token: xxxxxxxxxx
    to: facebook_user_id
+   audios:
+     - https://example.com/1.mp3
+     - https://example.com/2.mp3
```

Example configuration with file message:

```diff
pipeline:
  facebook:
    image: appleboy/drone-facebook
    fb_page_token: xxxxxxxxxx
    fb_verify_token: xxxxxxxxxx
    to: facebook_user_id
+   files:
+     - https://example.com/1.pdf
+     - https://example.com/2.pdf
```

Example configuration for success and failure messages:

```diff
pipeline:
  facebook:
    image: appleboy/drone-facebook
    fb_page_token: xxxxxxxxxx
    fb_verify_token: xxxxxxxxxx
    to: facebook_user_id
+   when:
+     status: [ success, failure ]
```

Example configuration with a custom message template:

```diff
pipeline:
  facebook:
    image: appleboy/drone-facebook
    fb_page_token: xxxxxxxxxx
    fb_verify_token: xxxxxxxxxx
    to: facebook_user_id
+   template: |
+     {{ #success build.status }}
+       build {{ build.number }} succeeded. Good job.
+     {{ else }}
+       build {{ build.number }} failed. Fix me please.
+     {{ /success }}
```

# Secrets

The Facebook plugin supports reading credentials from the Drone secret store. This is strongly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  facebook:
    image: appleboy/drone-facebook
-   fb_page_token: xxxxxxxxxx
-   fb_verify_token: xxxxxxxxxx
    to: facebook_user_id
```

The `fb_page_token` or `fb_verify_token` attributes can be replaced with the below secret environment variables. Please see the Drone documentation to learn more about secrets.

PLUGIN_FB_PAGE_TOKEN
: facebook page token

PLUGIN_FB_VERIFY_TOKEN
: facebook verify token

# Parameter Reference

fb_page_token
: facebook page token from [facebook developer center](https://developers.facebook.com/)

fb_verify_token
: facebook verify token from [facebook developer center](https://developers.facebook.com/)

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
