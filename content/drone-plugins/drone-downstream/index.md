---
date: 2016-01-01T00:00:00+00:00
title: Downstream Build
author: drone-plugins
tags: [ drone ]
repo: drone-plugins/drone-downstream
logo: drone.svg
image: plugins/downstream
---

Use this plugin to trigger builds for a list of downstream repositories. This
is useful when updates to a repository have downstream impacts that should also
be tested.

```yaml
pipeline:
  trigger:
    image: plugins/downstream
    server: https://drone.example.com
    fork: true
    repositories:
      - octocat/Hello-World
      - octocat/Spoon-Knife
```

Example target specific branches:

```diff
pipeline:
  trigger:
    image: plugins/downstream
    server: https://drone.example.com
    fork: true
    repositories:
+     - octocat/Hello-World@develop
+     - octocat/Spoon-Knife@master
```

# Secret Reference

downstream_token
: drone server auth token

# Parameter Reference

token
: drone server auth token

server
: drone server url

repositories
: trigger builds for the repository list

fork:
: trigger new build numbers if true, else rebuild
