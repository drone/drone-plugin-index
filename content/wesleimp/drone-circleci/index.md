---
date: 2020-03-05T00:00:00+00:00
title: Circle-ci
author: wesleimp
tags: [ infrastructure, trigger, circleci ]
logo: circleci.svg
repo: wesleimp/drone-circleci
image: wesleimp/drone-circleci
---

The Circle-ci plugin allows you to trigger builds automatically. The below pipeline configuration demonstrates simple usage:

```yaml
- name: trigger circle-ci builds
  image: wesleimp/drone-circleci
  settings:
    token: xxxxxxxxxx
    user: octocat
    repo: hello-world
    branch: master
```

## Parameter Reference

token
: circle-ci user token

user
: repository user

repo
: repository name

branch
: branch name (default is master)
