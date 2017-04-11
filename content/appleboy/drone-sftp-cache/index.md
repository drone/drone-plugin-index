---
date: 2017-04-11T00:00:00+00:00
title: SFTP Cache
author: appleboy
tags: [ publish, ssh, sftp, cache ]
repo: appleboy/drone-sftp-cache
logo: sftp_cache.svg
image: appleboy/drone-sftp-cache
---

Use this plugin for caching build artifacts to speed up your build times. This plugin can create and restore caches of any folders.

```yaml
pipeline:
  restore_cache:
    image: applebot/drone-sftp-cache
    server: ${SFTP_CACHE_SERVER}
    port: ${SFTP_CACHE_PORT}
    username: ${SFTP_CACHE_USERNAME}
    password: ${SFTP_CACHE_PASSWORD}
    path: /var/cache/drone
    restore: true
    mount:
      - node_modules

  build:
    image: node:latest
    commands:
      - npm install

  rebuild_cache:
    image: applebot/drone-sftp-cache
    server: ${SFTP_CACHE_SERVER}
    port: ${SFTP_CACHE_PORT}
    username: ${SFTP_CACHE_USERNAME}
    password: ${SFTP_CACHE_PASSWORD}
    path: /var/cache/drone
    rebuild: true
    mount:
      - node_modules
```

Example configuration for login with user private key:

```diff
pipeline:
  rebuild_cache:
    image: applebot/drone-sftp-cache
    server: ${SFTP_CACHE_SERVER}
    port: ${SFTP_CACHE_PORT}
    username: ${SFTP_CACHE_USERNAME}
-   password: ${SFTP_CACHE_PASSWORD}
+   key: ${SFTP_CACHE_PRIVATE_KEY}
    path: /var/cache/drone
    rebuild: true
    mount:
      - node_modules
```

Example configuration for ignoring creates a hash file name based on branch name:

```diff
pipeline:
  rebuild_cache:
    image: applebot/drone-sftp-cache
    server: ${SFTP_CACHE_SERVER}
    port: ${SFTP_CACHE_PORT}
    username: ${SFTP_CACHE_USERNAME}
    password: ${SFTP_CACHE_PASSWORD}
+   ignore_branch: true
    path: /var/cache/drone
    rebuild: true
    mount:
      - node_modules
```

Example configuration for success build:

```diff
pipeline:
  rebuild_cache:
    image: applebot/drone-sftp-cache
    path: /var/cache/drone
    rebuild: true
    mount:
      - node_modules
+   when:
+     status: success
```

Example configuration for tag event:

```diff
pipeline:
  rebuild_cache:
    image: applebot/drone-sftp-cache
    path: /var/cache/drone
    rebuild: true
    mount:
      - node_modules
+   when:
+     status: success
+     event: tag
```

# Parameter Reference

server
: target hostname or IP

port
: ssh port of target host

username
: account for target host user

password
: password for target host user

key
: plain text of user private key

rebuild
: boolean flag to trigger a rebuild

restore
: boolean flag to trigger a restore

ignore_branch
: boolean flag to ignore commit branch name on hash value
