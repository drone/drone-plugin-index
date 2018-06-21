---
date: 2018-06-21T00:00:00+00:00
title: Codecov
author: drone-plugins
tags: [ coverage ]
logo: codecov.svg
repo: drone-plugins/drone-codecov
image: plugins/codecov
---

This plugin can upload coverage reports to [Codecov](https://codecov.io/). The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  codecov:
    image: plugins/codecov
    token: your-codecov-token
    files:
     - *.xml
```

Custom base path to coverage reports:

```diff
pipeline:
  codecov:
    image: plugins/codecov
    token: your-codecov-token
    files:
     - *.xml
+   paths:
+     - tests/output/coverage
```

Error on failed coverage upload:

```diff
pipeline:
  codecov:
    image: plugins/codecov
    token: your-codecov-token
+   required: true
```

Example configuration using secrets:

```diff
pipeline:
  codecov:
    image: plugins/codecov
-   token: your-codecov-token
+   secrets: [ codecov_token ]
```

# Secret Reference

codecov_token
: Token for Codecov authentication

# Parameter Reference

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
