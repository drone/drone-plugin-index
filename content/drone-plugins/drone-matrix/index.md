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
pipeline:
  notify:
    image: plugins/matrix
    homeserver: https://matrix.org
    roomid: '!abcdefghijklmnopqrstuvwxyz:matrix.org'
    username: octocat
    password: p455w0rd
```

Example configuration using a secret:

```diff
pipeline:
  notify:
    image: plugins/matrix
    homeserver: https://matrix.org
    roomid: '!abcdefghijklmnopqrstuvwxyz:matrix.org'
-   username: octocat
-   password: p455w0rd
+   secrets: [ matrix_username, matrix_password ]
```

# Secret Reference

matrix_username
: Username on homeserver

matrix_password
: Password on homeserver (use with username)

matrix_userid, matrix_user_id
: Matrix user ID (@user:homeserver.tld)

matrix_accesstoken, matrix_access_token
: Matrix access token (use with userid)

matrix_homeserver
: Matrix home server, defaults to https://matrix.org

matrix_roomid
: Room ID to send messages (not alias, but ID)

matrix_template
: Template for the message

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
: Room ID to send messages (not alias, but ID). If using this parameter directly in yaml, it must be a string.

template
: Template for the message
