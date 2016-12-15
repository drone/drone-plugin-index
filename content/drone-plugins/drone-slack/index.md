---
date: 2016-01-01T00:00:00+00:00
title: Slack
author: drone-plugins
tags: [ notifications, chat ]
repo: drone-plugins/drone-slack
logo: slack.svg
image: plugins/slack
---

The Slack plugin posts build status messages to your channel. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  slack:
    image: plugins/slack
    webhook: https://hooks.slack.com/services/...
    channel: dev
```

Example configuration with custom username:

```diff
pipeline:
  slack:
    image: plugins/slack
    webhook: https://hooks.slack.com/services/...
    channel: dev
+   username: drone
```

Example configuration with custom avatar:

```diff
pipeline:
  slack:
    image: plugins/slack
    webhook: https://hooks.slack.com/services/...
    channel: dev
+   icon_url: https://unsplash.it/256/256/?random
```

Example configuration with image attachment:

```diff
pipeline:
  slack:
    image: plugins/slack
    webhook: https://hooks.slack.com/services/...
    channel: dev
+   image_url: https://unsplash.it/256/256/?random
```

Example configuration with a custom message template:

```diff
pipeline:
  slack:
    image: plugins/slack
    webhook: https://hooks.slack.com/services/...
    channel: dev
+   template: |
+     {{ #success build.status }}
+       build {{ build.number }} succeeded. Good job.
+     {{ else }}
+       build {{ build.number }} failed. Fix me please.
+     {{ /success }}
```

# Secrets

The Slack plugin supports reading credentials from the Drone secret store. This is strongly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  slack:
    image: plugins/slack
-   webhook: https://hooks.slack.com/services/...
```

The above webhook Yaml attribute can be replaced with the `SLACK_WEBHOOK` secret environment variable. Please see the Drone documentation to learn more about secrets.

# Parameter Reference

webhook
: incoming [webhook url](https://my.slack.com/services/new/incoming-webhook) for posting to a channel

channel
: messages sent to the above webhook are posted here

recipient
: alternatively you can send it to a specific user

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
