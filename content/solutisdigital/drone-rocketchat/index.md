---
date: 2018-10-30T00:00:00+00:00
title: Rocket.Chat
author: solutisdigital
tags: [ notifications, chat ]
logo: rocketchat.svg
repo: alexgamas/drone-rocketchat
image: alexgamas/drone-rocketchat
---

The Rocket.Chat plugin posts build status messages to your channel. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  rocketchat:
    image: plugins/rocketchat
    url: https://my.rocketchat.com/
    channel: ci
```

Example configuration with custom username:

```diff
pipeline:
  rocketchat:
    image: plugins/rocketchat
    url: https://my.rocketchat.com/
    channel: ci
+   username: drone
```

Example configuration with custom avatar:

```diff
pipeline:
  rocketchat:
    image: plugins/rocketchat
    url: https://my.rocketchat.com/
    channel: ci
+   icon_url: https://unsplash.it/256/256/?random
```

Example configuration with image attachment:

```diff
pipeline:
  rocketchat:
    image: plugins/rocketchat
    url: https://my.rocketchat.com/
    channel: ci
+   image_url: https://unsplash.it/256/256/?random
```

Example configuration for success and failure messages:

```diff
pipeline:
  rocketchat:
    image: plugins/rocketchat
    url: https://my.rocketchat.com/
    channel: ci
+   when:
+     status: [ success, failure ]
```

Example configuration with a custom message template:

```diff
pipeline:
  rocketchat:
    image: plugins/rocketchat
    url: https://my.rocketchat.com/
    channel: ci
+   template: >
+     {{#success build.status}}
+       build {{build.number}} succeeded. Good job.
+     {{else}}
+       build {{build.number}} failed. Fix me please.
+     {{/success}}
```

Example configuration with a custom message template linking usernames and channels:

```diff
pipeline:
  rocketchat:
    image: plugins/rocketchat
    url: https://my.rocketchat.com/
    channel: ci
+   template: >
+     {{#success build.status}}
+       build {{build.number}} succeeded. Good job. <@john.doe>
+     {{else}}
+       build {{build.number}} failed. Fix me please. <@channelname> <@someone>
+     {{/success}}
```
# Parameter Reference

url
: incoming [url](https://my.rocketchat.com/) for posting to a channel

channel
: messages sent to the above url are posted here

username
: choose the username this integration will post as

template
: overwrite the default message template

image_url
: a valid URL to an image file that will be displayed inside a message attachment

icon_url
: a valid URL that displays a image to the left of the username

icon_emoji
: displays a emoji to the left of the username

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

build.pull
: pull request number (empty string if not a pull request)

build.deployTo
: env that the build was deployed to.

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
