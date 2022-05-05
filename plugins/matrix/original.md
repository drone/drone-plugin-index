---
date: 2018-04-19T00:00:00+00:00
title: Matrix
author: drone-plugins
tags: [ notifications, chat, matrix ]
logo: matrix.svg
repo: drone-plugins/drone-matrix
image: plugins/matrix
---

This plugin can be used to send build success or failure messages to a Matrix room. The below pipeline configuration demonstrates simple usage:

```yaml
steps:
- name: notify
  image: plugins/matrix
  settings:
    homeserver: https://matrix.org
    roomid: abcdefghijklmnopqrstuvwxyz:matrix.org
    username: octocat
    password: p455w0rd
```

Example configuration using named secrets:

```yaml
steps:
- name: notify
  image: plugins/matrix
  settings:
    homeserver: https://matrix.org
    roomid: abcdefghijklmnopqrstuvwxyz:matrix.org
    username:
      from_secret: matrix_username
    password:
      from_secret: matrix_password
```

# Parameter Reference

username
: Username on homeserver

password
: Password on homeserver (use with username)

userid
: Matrix user ID (@user:homeserver.tld)

accesstoken
: Matrix access token (use with userid)

homeserver
: Matrix homeserver URL, defaults to https://matrix.org

roomid
: Room ID to send messages (not alias, but ID, and you can skip the `!`)

template
: Template for the message