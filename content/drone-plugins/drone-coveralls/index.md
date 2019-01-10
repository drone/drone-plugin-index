---
date: 2018-12-09T00:00:00+00:00
title: Coveralls
author: lizheming
tags: [ coverage, test, reporting, coveralls ]
repo: lizheming/drone-coveralls
logo: coveralls.svg
image: lizheming/drone-coveralls
---

This plugin can upload coverage reports to [Coveralls](https://coveralls.io). The below pipeline configuration demonstrates simple usage:

```yaml
steps:
- name: test
  image: node:alpine
  commands:
  - npm install
  - npm run test -- --reporter=text-lcov > ./lcov.info

- name: coveralls
  image: lizheming/drone-coveralls
  settings:
    token:
      from_secret: coveralls_token
    files:
    - ./lcov.info
```

# Parameter Reference

files
: list of target files to upload. Required.

token
: if you have not set environment `COVERALLS_REPO_TOKEN`, you should set the private repository token.

debug
: debug mode, defaults to false.