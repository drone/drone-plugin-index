---
date: 2017-08-15T00:00:00+00:00
title: Mercurial
author: drone-plugins
tags: [ clone, hg ]
logo: mercurial.svg
repo: drone-plugins/drone-hg
image: plugins/hg
---

The mercurial plugin is used to clone a mercurial repository. In the below example we disable the default git clone and clone the repository using the mercurial plugin.

```yaml
kind: pipeline
name: default

clone:
  disable: true

steps:
- name: checkout
  image: plugins/hg
```
