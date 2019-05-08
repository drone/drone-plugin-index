---
date: 2018-04-19T00:00:00+00:00
title: Slack Blame
author: drone-plugins
tags: [ notifications, chat ]
logo: slack.svg
repo: drone-plugins/drone-slack-blame
image: plugins/slack-blame
---

Use the Slack Blame plugin to send a message to a Slack channel or through direct message when a build completes. You will need to supply Drone with an access token to the Slack API. You can create a new access token at [https://api.slack.com/web](https://api.slack.com/web). The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: notify
  image: plugins/slack-blame
  settings:
    token: your-secret-token
    channel: dev
    success_template: |
      The build is fixed! Thanks @{{slack.name}}
    success_image_attachments:
      - "http://i.imgur.com/TP4PIxc.jpg"
    failure_template: |
      The build is broken! Blame {{slack.name}}
    failure_image_attachments:
      - "http://cdn.meme.am/instances/51000361.jpg"
```

Example configuration with custom username:

```yaml
steps:
- name: notify
  image: plugins/slack-blame
  settings:
    token: your-secret-token
    channel: dev
    success_template: |
      The build is fixed! Thanks @{{slack.name}}
    success_image_attachments:
      - "http://i.imgur.com/TP4PIxc.jpg"
    success_username: successbot
    failure_template: |
      The build is broken! Blame {{slack.name}}
    failure_image_attachments:
      - "http://cdn.meme.am/instances/51000361.jpg"
    failure_username: failurebot
```

Example configuration using a secret:

```yaml
steps:
- name: notify
  image: plugins/slack-blame
  settings:
    token:
      from_secret: your-secret-token
    channel: dev
    success_template: |
      The build is fixed! Thanks @{{slack.name}}
    success_image_attachments:
      - "http://i.imgur.com/TP4PIxc.jpg"
    failure_template: |
      The build is broken! Blame {{slack.name}}
    failure_image_attachments:
      - "http://cdn.meme.am/instances/51000361.jpg"
```

# Parameter Reference

token
: Slack access token

channel
: Slack channel

mapping
: Mapping of authors to Slack users

success_username
: Username for successful builds

success_icon
: Icon for successful builds

success_template
: Template for successful builds

success_image_attachments
: List of image attachments for successful builds

failure_username
: Username for failed builds

failure_icon
: Icon for failed builds

failure_template
: Template for failed builds

failure_image_attachments
: List of image attachments for failed builds
