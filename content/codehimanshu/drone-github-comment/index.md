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
  pull: true
  environment:
    DRONE_ACCESS_TOKEN:
      from_secret: drone_access_token
    GITHUB_INSTALLATION_ID:
      from_secret: github_installation_id
    GITHUB_APP_ID:
      from_secret: github_app_id
    PRIVATE_KEY:
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
  pull: true
  environment:
    DRONE_ACCESS_TOKEN:
      from_secret: drone_access_token
    GITHUB_INSTALLATION_ID:
      from_secret: github_installation_id
    GITHUB_APP_ID:
      from_secret: github_app_id
    PRIVATE_KEY:
      from_secret: private_key
  when:
    status: [ failure ]
	  event: pull_request
```

Github App to post comments on your Pull Request : https://github.com/apps/dronegitbot

# Parameter Reference

drone_access_token
: drone server auth token

github_installation_id
: installation id of github app for drone

github_app_id (38899)
: your app id for drone on github

private_key
: from github app installation