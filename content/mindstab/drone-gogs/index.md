---
date: 2018-07-07T00:00:00+00:00
title: Gogs
author: mindstab
tags: [ notifications ]
logo: gogs.svg
repo: dballard/drone-gogs
image: mindstab/drone-gogs
---

Drone plugin for posting to Gogs PRs comments about build results.

Create a user on Gogs for posting build notifications (like 'buildbot') and generate a token for it. Insert the token as a drone secret. (Replace $VALUE with the actual token)

    drone secret add dan/gogs-notify-test --name gogs_account_token --value $VALUE --event pull_request


Use in .drone.yml:

    notify-gogs:
      image: mindstab/drone-gogs
      when:
        event: pull_request
      secrets: [gogs_account_token]
      gogs_url: https://git.yourdomain.com


- gogs_url should not end in '/'. Example with path: https://git.yourdomain.com/gogs


