---
author: 'Paul Tötterman'
date: 2017-12-01
image: 'ptman/drone-plugin-matrix'
repo: 'ptman/drone-plugin-matrix'
tags: [ notifications, chat, matrix ]
title: Matrix
---

This plugin can be used to send notices into a Matrix room.

Example configuration:

```yaml
pipeline:
  notify:
    image: ptman/drone-plugin-matrix
    homeserver: https://matrix.org
    roomid: '!abcdefghijklmnopqrstuvwxyz:matrix.org'
    secrets:
      - matrix_username
      - matrix_password
```

# Parameter Reference

homeserver
: Matrix homeserver URL. Defaults to https://matrix.org

roomid
: Matrix room ID (not alias, but ID starting with '!')

message
: Override default message

username
: Username on homeserver

password
: Password on homeserver (use with username)

userid
: Matrix userID (@user:homeserver.tld)

accesstoken
: Matrix access token (use with userid)
