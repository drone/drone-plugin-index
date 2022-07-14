---
date: 2022-07-19T00:00:00+00:00
title: Capistrano
author: glaszig
tags: [ capistrano, deploy, ssh, ruby ]
logo: capistrano.png
repo: glaszig/drone-capistrano
image: glaszig/drone-capistrano
---

The Capistrano plugin deploys applications via the Capistrano ruby gem.

Example step configuration:

```yaml
kind: pipeline
name: default

steps:
- name: deploy production
  image: glaszig/drone-capistrano:2.7.4
  settings:
    tasks: production deploy deploy:restart
    private_key:
      from_secret: production_private_key
    public_key:
      from_secret: production_public_key
  environment:
    BUNDLE_PATH: vendor/bundle
  when:
    ref:
      - refs/tags/production-*
```

# Parameter Reference

capistrano_private_key
: Private SSH deploy key

capistrano_public_key
: Public SSH deploy key

tasks
: The Capistrano tasks to run
