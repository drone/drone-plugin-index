---
date: 2020-04-24T00:00:00+00:00
title: Github Comment
author: codehimanshu
tags: [ infrastructure, github, drone, comment, buildstatus ]
logo: github.svg
repo: gradeup/drone-github-comment
image: codehimanshu/gitdrone
---

Use this plugin to update build status on Github Pull Request. This is useful when the complete team does not want to open drone dashboard for each build message.

```yaml
steps:
- name: update-status-to-github
  image: codehimanshu/gitdrone:1.7
  settings:
    drone_access_token:
      from_secret: drone_access_token
    github_installation_id:
      from_secret: github_installation_id
    github_app_id: 38899
    private_key:
      from_secret: private_key
  when:
    status: [ success, failure ]
    event: tag
```

Example reference to use for pull request

```yaml
steps:
- name: update-status-to-github
  image: codehimanshu/gitdrone:1.7
  environment:
    drone_access_token:
      from_secret: drone_access_token
    github_installation_id:
      from_secret: github_installation_id
    github_app_id: 38899
    private_key:
      from_secret: private_key
  when:
    status: [ failure ]
    event: pull_request
```

Github App to post comments on your Pull Request: https://github.com/apps/dronegitbot

# Parameter Reference

drone_access_token
: drone server auth token

github_installation_id
: installation id of github app for drone

github_app_id
: your app id for drone on github, defaults to 38899

private_key
: from github app installation