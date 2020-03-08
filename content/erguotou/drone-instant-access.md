---
date: 2020-03-07T00:00:00+08:00
title: InstantAccess(即时达)
author: erguotou
tags: [ notifications, InstantAccess, 即时达 ]
logo: instant_access.svg
repo: erguotou520/drone-instant-access
image: erguotou/drone-instant-access
---

The InstantAccess plugin posts build status messages to your account. The below pipeline configuration demonstrates simple usage:

```yaml
---
kind: pipeline
name: default

steps:
  - name: send-wechat
    image: erguotou/drone-instant-access
    settings:
      channel: d255d62caef24a3bb66c3465dad70407
      head: hello world
      body: Send by InstantAccess
```

You can also add build status via drone environment:

```yaml
kind: pipeline
name: default

steps:
  - name: send-wechat
    image: erguotou/drone-instant-access
    settings:
      channel:
        from_secret: CHANNEL
      head: hello world
      body: "${DRONE_BUILD_STATUS} at ${DRONE_REPO_BRANCH} branch"
```

# Parameter Reference

channel
: The InstantAccess(即时达) channel key, get key by <http://push.ijingniu.cn/push/channel/>

head
: Notification title

body
: Notification body message, support markdown