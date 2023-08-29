---
date: 2023-08-30T00:00:00+08:00
title: Lark(feishu)
author: sanmu-ya
tags: [ lark, feishu, Bot, Chat]
repo: sanmu-ya/drone-plugin-lark
logo: lark.png
image: sanmuya/drone-plugin-lark
---

The Lark can be used to send a message by Lark group robot.  The below pipeline configuration demonstrates simple usage:

```yaml
steps:
  - name: lark
    image: sanmuya/drone-plugin-lark:latest
    settings:
      webhook: https://open.feishu.cn/open-apis/bot/v2/hook/f1ac0a3e-4555-420f-99a9-338cf39600f2
      secret: jFBPontJBY3p7P0yLtkNoe
      message:
        - ========== drone message ==========
        - REPO: ${DRONE_REPO}
        - AUTHOR: ${DRONE_COMMIT_AUTHOR_NAME}
        - COMMIT_BRANCH: ${DRONE_COMMIT_BRANCH}
        - COMMIT_MESSAGE: ${DRONE_COMMIT_MESSAGE}
```

Example configuration using secret from secrets:

```yaml
steps:
  - name: lark
    image: sanmuya/drone-plugin-lark:latest
    settings:
      webhook: https://open.feishu.cn/open-apis/bot/v2/hook/f1ac0a3e-4555-420f-99a9-338cf39600f2
      secret:
        from_secret: lark-secret
      message:
        - ========== drone message ==========
        - REPO: ${DRONE_REPO}
        - AUTHOR: ${DRONE_COMMIT_AUTHOR_NAME}
        - COMMIT_BRANCH: ${DRONE_COMMIT_BRANCH}
        - COMMIT_MESSAGE: ${DRONE_COMMIT_MESSAGE}
```


# Parameter Reference

webhook
: This is a required parameter for the webhook of the lark group chat robot

secret
: This is a required parameter, please turn on the lark group chat robot signature verification

message
: This is the text that needs to be sent. You can fill in multiple lines of text as in the example. See the [README.md](https://github.com/sanmu-ya/drone-plugin-lark) for the effect
