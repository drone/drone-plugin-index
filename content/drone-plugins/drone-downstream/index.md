---
date: 2016-01-01T00:00:00+00:00
title: Downstream Build
author: drone-plugins
tags: [ infrastructure, trigger, drone ]
logo: drone.svg
repo: drone-plugins/drone-downstream
image: plugins/downstream
---

Use this plugin to trigger builds for a list of downstream repositories. This
is useful when updates to a repository have downstream impacts that should also
be tested.

```yaml
kind: pipeline
name: default

steps:
- name: trigger  
  image: plugins/downstream
  settings:
    server: https://drone.example.com
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    fork: true
    repositories:
      - octocat/Hello-World
      - octocat/Spoon-Knife
```

Example target specific branches:

```yaml
kind: pipeline
name: default

steps:
- name: trigger  
  image: plugins/downstream
  settings:
    server: https://drone.example.com
    token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    fork: true
    repositories:
      - octocat/Hello-World@develop
      - octocat/Spoon-Knife@master
```

# Passing Env Vars

This plugin supports passing env vars to downstream builds. This is useful to trigger specific integration tests on downstream builds.

```yaml
validate:
  image: plugins/downstream
  server: https://drone.example.com
  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  params:
    - SOURCE_HASH=${DRONE_COMMIT_HASH}
    - FOO=bar
    - /path/to/godotenv/file
  repositories:
    - octocat/Hello-World
```

# Secret Reference

This plugins supports sourcing sensitive parameters from the secret store. Example configuration sources the token from the secret store:

```yaml
kind: pipeline
name: default

steps:
- name: trigger  
  image: plugins/downstream
  settings:
    server: https://drone.example.com
    token:
      from_secret: drone_token
    fork: true
    repositories:
      - octocat/Hello-World
      - octocat/Spoon-Knife
```

# Parameter Reference

token
: drone server auth token

server
: drone server url

repositories
: trigger builds for the repository list

fork
: trigger new build numbers if true, else rebuild

wait
: wait for any currently running builds to finish if true, else fails

timeout
: how long to wait on any currently running builds defaults to 60 seconds

params
: supports params in KEY=value format as well as loading of params from godotenv files.
