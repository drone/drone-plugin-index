---
date: 2016-01-01T00:00:00+00:00
title: Gitter
author: drone-plugins
tags: [ notifications, chat ]
logo: gitter.svg
repo: drone-plugins/drone-gitter
image: plugins/gitter
---

The Gitter plugin posts build events to your Gitter room's activity feed. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: notify  
  image: plugins/gitter
  settings:
    webhook: https://webhooks.gitter.im/e/a91e06797227ae5dbe6ec
```

Example configuring sources the webhook from a named secret:

```yaml
kind: pipeline
name: default

steps:
- name: notify  
  image: plugins/gitter
  settings:
    webhook:
      from_secret: gitter_webhok
```