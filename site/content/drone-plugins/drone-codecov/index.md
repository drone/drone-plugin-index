---
date: 2018-06-21T00:00:00+00:00
title: Codecov
description: This plugin can upload coverage reports to [Codecov](https://codecov.io/).
author: drone-plugins
tags: [ coverage ]
logo: codecov.svg
repo: drone-plugins/drone-codecov
image: plugins/codecov
featured: true
position: 3
backgroundColor: '#fee1ea'
---

The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: coverage
  image: plugins/codecov
  settings:
    token: your-codecov-token
    files:
     - *.xml
```

Custom base path to coverage reports:

```yaml
steps:
- name: coverage
  image: plugins/codecov
  settings:
    token: your-codecov-token
    files:
     - *.xml
    paths:
      - tests/output/coverage
```

Error on failed coverage upload:

```yaml
steps:
- name: coverage
  image: plugins/codecov
  settings:
    token: my-codecov-token
    required: true
```

Example configuration using secrets:

```yaml
steps:
- name: coverage
  image: plugins/codecov
  settings:
    token:
      from_secret: my-codecov-token
```

## Parameter Reference

token
: Token for Codecov authentication

name
: Name for coverage upload

paths
: List of paths to search for coverage reports

files
: List of files for the coverage upload

flags
: List of flags for the coverage upload

env
: List of environment to inject

dump
: Dump result instead of upload, defaults to `false`

verbose
: Print verbose output, defaults to `false`

required
: Errors on failed upload, defaults to `false`
