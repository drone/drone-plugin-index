---
date: 2018-05-10T00:00:00+00:00
title: Github Search Downstream
author: gboddin
tags: [ infrastructure, trigger, drone, github ]
logo: github.svg
repo: gboddin/drone-github-search-downstream
image: gboo/github-search-downstream
---

Use this plugin to trigger builds for a list of downstream repositories fetched
from a Github repository search. This is useful when updates to a repository 
have downstream impacts that should also be tested, and those repository are
searchable on Github.

This plugin is heavily based on the original Downstream plugin.

```yaml
pipeline:
  trigger:
    image: gboo/github-search-downsream
    github_query: "org:drone-plugins topic:drone-plugin"
    drone_server: https://drone.example.com
    drone_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    fork: true
```

Example target specific branches:

```diff
pipeline:
  trigger:
    image: gboo/github-search-downsream
    github_query: "org:drone-plugins topic:drone-plugin"
    drone_server: https://drone.example.com
    drone_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    fork: true
+   branch: develop
```

Example with Github authentication:

```diff
pipeline:
  trigger:
    image: gboo/github-search-downsream
    github_query: "org:drone-plugins topic:drone-plugin"
+   github_token: d8e8fca2dc0f896fd7cb4cb0031ba249
    drone_server: https://drone.example.com
    drone_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    fork: true
```

This plugins also supports sourcing sensitive parameters from the secret store. Example configuration sources the token from the secret store:

```diff
pipeline:
  trigger:
    image: gboo/github-search-downsream
    github_query: "org:drone-plugins topic:drone-plugin"
-   github_token: d8e8fca2dc0f896fd7cb4cb0031ba249
    drone_server: https://drone.example.com
-   drone_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    fork: true
+   secrets: [ drone_token, github_token ]
```

# Secret Reference

drone_token
: drone server auth token

drone_server
: drone server url

github_token
: Github authentication token

# Parameter Reference

drone_token
: drone server auth token

drone_server
: drone server url

fork
: trigger new build numbers if true, else rebuild

ignore_missing
: continue triggering if build is not found

wait
: wait for any currently running builds to finish if true, else fails

timeout
: how long to wait on any currently running builds defaults to 60 seconds
