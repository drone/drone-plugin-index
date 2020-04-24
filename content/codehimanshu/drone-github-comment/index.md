---
version: '1.6'
date: 2020-04-24T00:00:00+00:00
title: Drone Github Comment
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
  image: codehimanshu/gitdrone:1.6
  pull: true
  environment:
    DRONE_PULL_REQUEST: ${DRONE_PULL_REQUEST}
    DRONE_REPO_OWNER: ${DRONE_REPO_NAMESPACE}
    DRONE_REPO_NAME: ${DRONE_REPO_NAME}
    DRONE_ACCESS_TOKEN:
      from_secret: DRONE_ACCESS_TOKEN
    DRONE_HOST: ${DRONE_SYSTEM_HOST}
    DRONE_BUILD_NUMBER: ${DRONE_BUILD_NUMBER}
    GITHUB_INSTALLATION_ID:
      from_secret: GITHUB_INSTALLATION_ID
    GITHUB_APP_ID:
      from_secret: GITHUB_APP_ID
    PRIVATE_KEY:
      from_secret: PRIVATE_KEY 
  when:
    status: [ success, failure ]
    event: tag
```

Example reference to use for pull request

```yaml
steps:
- name: update-status-to-github
  image: codehimanshu/gitdrone:1.6
  pull: true
  environment:
    DRONE_PULL_REQUEST: ${DRONE_PULL_REQUEST}
    DRONE_REPO_OWNER: ${DRONE_REPO_NAMESPACE}
    DRONE_REPO_NAME: ${DRONE_REPO_NAME}
    DRONE_ACCESS_TOKEN:
      from_secret: DRONE_ACCESS_TOKEN
    DRONE_HOST: ${DRONE_SYSTEM_HOST}
    DRONE_BUILD_NUMBER: ${DRONE_BUILD_NUMBER}
    GITHUB_INSTALLATION_ID:
      from_secret: GITHUB_INSTALLATION_ID
    GITHUB_APP_ID:
      from_secret: GITHUB_APP_ID
    PRIVATE_KEY:
      from_secret: PRIVATE_KEY
  when:
    status: [ failure ]
	event: pull_request
```

Github App to post comments on your Pull Request : https://github.com/apps/dronegitbot

# Secret Reference

drone_token
: drone server auth token

drone_server
: drone server url

github_token
: Github authentication token

# Parameter Reference

DRONE_ACCESS_TOKEN
: drone server auth token

GITHUB_INSTALLATION_ID
: installation id of github app for drone

GITHUB_APP_ID (38899)
: your app id for drone on github

PRIVATE_KEY
: from github app installation