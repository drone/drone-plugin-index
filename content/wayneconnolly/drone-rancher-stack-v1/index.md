---
date: 2018-07-02T00:00:00+00:00
title: Rancher Stack v1
author: wayneconnolly
tags: [ deploy, rancher, stack, v1, docker ]
logo: rancher.svg
repo: wayneconnolly/drone-rancher-stack-v1
image: dubc/drone-rancher-stack-v1
---

A drone.io Rancher Stack plugin to deploy/update an entire Rancher stack (not just a single service) to [Rancher v1.6](https://rancher.com/docs/rancher/v1.6/en/). See [Docker Hub](https://hub.docker.com/r/dubc/drone-rancher-stack-v1/) for more information.

```diff
pipeline:
  compile-javascript:
    image: node:8.9.4
    commands:
      - yarn
      - yarn build
      - git clone 'https://github.com/USERNAME/app-rancher-stack.git' rancher

  docker-registry-push:
    image: plugins/docker
    repo: registry.domain.com:5000/app
    registry: registry.domain.com:5000
    username: REGISTRY_USERNAME
    password: REGISTRY_PASSWORD
    insecure: true
    pull: true

  rancher-v1-staging-upgrade:
    image: dubc/drone-rancher-stack-v1
    url: rancher.domain.com
    stack: app-staging        
-   accesskey: RANCHER_ACCESS_KEY
-   secretkey: RANCHER_SECRET_KEY
+   secrets: [ rancher_accesskey, rancher_secretkey ]
    pull: true
```

# Secret Reference
Optional secrets

rancher_accesskey
: Your Rancher environment Access_Key

rancher_secretkey
: Your Rancher environment Secret_Key

# Parameter Reference

url
: The url where your rancher resides. E.g rancher.domain.com

stack
: This stack must already exist in your rancher environment. E.g app-staging

accesskey
: Your Rancher environment Access_Key

secretkey
: Your Rancher environment Secret_Key

pull
: true. Makes sure you get the latest plugin version
