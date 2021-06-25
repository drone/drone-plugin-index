---
date: 2016-01-01T00:00:00+00:00
title: Slack
author: drone-plugins
tags: [ notifications, chat ]
logo: slack.svg
repo: drone-plugins/drone-slack
image: plugins/slack
---

The Slack plugin posts build status messages to your channel. The below pipeline configuration demonstrates simple usage:

```yaml
steps:
- name: slack
  image: plugins/slack
  settings:
    webhook: https://hooks.slack.com/services/...
    channel: dev
```

Example configuration with webhook sourced from a secret:

```yaml
steps:
- name: slack
  image: plugins/slack
  settings:
    webhook:
      from_secret: slack_webhook
    channel: dev
```

Example configuration with custom username:

```
steps:
- name: slack
  image: plugins/slack
  settings:
    webhook: https://hooks.slack.com/services/...
    channel: dev
    username: drone
```

Example configuration with custom avatar:

```
steps:
- name: slack
  image: plugins/slack
  settings:
    webhook: https://hooks.slack.com/services/...
    channel: dev
    icon_url: https://unsplash.it/256/256/?random
```

Example configuration with image attachment:

```
steps:
- name: slack
  image: plugins/slack
  settings:
    webhook: https://hooks.slack.com/services/...
    channel: dev
    image_url: https://unsplash.it/256/256/?random
```

Example configuration for success and failure messages:

```
steps:
- name: slack
  image: plugins/slack
  settings:
    webhook: https://hooks.slack.com/services/...
    channel: dev
  when:
    status: [ success, failure ]
```

Example configuration with a custom message template:

```
steps:
- name: slack
  image: plugins/slack
  settings:
    webhook: https://hooks.slack.com/services/...
    channel: dev
    template: >
      {{#success build.status}}
        build {{build.number}} succeeded. Good job.
      {{else}}
        build {{build.number}} failed. Fix me please.
      {{/success}}
```

Example configuration with a custom message template linking usernames and channels:

```diff
steps:
- name: slack
  image: plugins/slack
  settings:
    webhook: https://hooks.slack.com/services/...
    channel: dev
    link_names: true
    template: >
      {{#success build.status}}
        build {{build.number}} succeeded. Good job. <@john.doe>
      {{else}}
        build {{build.number}} failed. Fix me please. <@channelname> <@someone>
      {{/success}}
```

# Parameter Reference

webhook
: incoming [webhook url](https://api.slack.com/messaging/webhooks#getting-started) for posting to a channel

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

link_names
: links usernames and channels in the message

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
