---
version: '0.8'
date: 2017-07-19T00:00:00+00:00
title: Codecov
author: robertstettner
tags: [ publish, codecov, test, coverage, reporting ]
logo: codecov.svg
repo: robertstettner/drone-codecov
image: robertstettner/drone-codecov
---

This plugin allows for pushing test coverage results to Codecov. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  codecov:
    image: robertstettner/drone-codecov
    token: 00cb6d2b-debc-46c8-b5e4-43c728511247
```

Example configuration using credentials from secrets:

```diff
pipeline:
  codecov:
    image: robertstettner/drone-codecov
-   token: 00cb6d2b-debc-46c8-b5e4-43c728511247
+   secrets: [ codecov_token ]
```

Example configuration for Unit and component tests:

```diff
pipeline:
  unit_codecov:
    image: robertstettner/drone-codecov
    secrets: [ codecov_token ]
+   files: 
+     - app1/coverage/unit/lcov.info
+     - app2/coverage/unit/lcov.info
+   flags:
+     - unit
      
  component_codecov:
    image: robertstettner/drone-codecov
    secrets: [ codecov_token ]
+   files: 
+     - app1/coverage/component/lcov.info
+     - app2/coverage/component/lcov.info
+   flags:
+     - component
```

# Secret Reference

codecov_token
: authenticates with this token

# Parameter Reference

token
: set the private repository token. Required.

files
: list of target files to upload. Optional.

flags
: flag the upload to group coverage metrics. Optional.

debug
: debug mode, defaults to `false`.
