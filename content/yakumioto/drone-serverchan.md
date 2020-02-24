---
date: 2019-04-22T00:00:00+08:00
title: ServerChan(Server酱)
author: yakumioto
tags: [ serverchan, Server酱 ]
logo: serverchan.svg
repo: yakumioto/drone-serverchan
image: yakumioto/drone-serverchan
---

The ServerChan plugin posts build status messages to your account. The below pipeline configuration demonstrates simple usage:

```yaml
---
kind: pipeline
name: default

steps:
  - name: send-wechat
    image: yakumioto/drone-serverchan
    settings:
      key: SCU48558T164ff96a3316d8a22cacea21d66b5caed80baa044
      text: hello world
      desp: Send by ServerChan
```

# Parameter Reference

key
: The ServerChan(Server酱) key, get key by <http://sc.ftqq.com>

text
: Notification title

desp
: Notification body message, support markdown