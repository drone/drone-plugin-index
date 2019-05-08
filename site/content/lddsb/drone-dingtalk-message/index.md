---
date: 2019-01-27T00:00:00+00:00
title: "DingTalk"
author: "lddsb"
tags: [ notifications, chat ]
repo: "lddsb/drone-dingtalk-message"
logo: "dingtalk.svg"
image: "lddsb/drone-dingtalk-message"
---

The DingTalk can be used to send a message by DingTalk group robot. The below pipeline configuration demonstrates simple usage:

```yaml
steps:
- name: dingtalk
  image: lddsb/drone-dingtalk-message
  settings:
    token: your-dingtalk-robot-access-token
    type: markdown
```

Example configuration using token from a secret:

```yaml
steps:
- name: dingtalk
  image: lddsb/drone-dingtalk-message
  settings:
    token: 
      from_secret: dingtalk_token
    type: markdown
```

Example configuration using color for title and content:

```diff
steps:
...
  image: lddsb/drone-dingtalk-message
  settings:
    token: your-dingtalk-robot-access-token
    type: markdown
+   message_color: true
```

Example configuration embed a picture into to message:

```diff
steps:
...
  image: lddsb/drone-dingtalk-message
  settings:
    token: your-dingtalk-robot-access-token
    type: markdown
+   message_pic: true
```

Example configuration sha message link to source page:

```diff
steps:
...
  image: lddsb/drone-dingtalk-message
  settings:
    token: your-dingtalk-robot-access-token
    type: markdown
+   sha_link: true
```

# Parameter Reference

token
: you can get the access token when you add a bot in a group

type
: dingtalk message type, markdown is the best type now

message_color
: color the title and content for easier identification

message_pic
: insert a picture into a message to make the content richer

sha_link
: sha as a link to click to the source code page

