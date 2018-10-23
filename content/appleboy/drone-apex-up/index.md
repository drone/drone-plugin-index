---
date: 2018-10-24T00:00:00+00:00
title: Apex-up
author: appleboy
tags: [ up, apex ]
logo: apex-up.svg
repo: appleboy/drone-apex-up
image: appleboy/drone-apex-up
---

This plugin can deploy infinitely scalable serverless apps, apis, and sites in seconds to AWS using [apex/up](https://github.com/apex/up) tool. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  up:
    image: appleboy/drone-apex-up
    pull: true
    secrets: [aws_secret_access_key, aws_access_key_id]
    stage: staging
    when:
      event: push
      branch: master
```

deploy to production stage.

```diff
pipeline:
  up:
    image: appleboy/drone-apex-up
    pull: true
    secrets: [aws_secret_access_key, aws_access_key_id]
-   stage: staging
+   stage: production
    when:
      event: tag
```

Change working directory.

```diff
pipeline:
  up:
    image: appleboy/drone-apex-up
    pull: true
    secrets: [aws_secret_access_key, aws_access_key_id]
    stage: production
+   directory: ./example23-deploy-go-application-with-up
    when:
      event: tag
```

Disable verbose log output.

```diff
pipeline:
  up:
    image: appleboy/drone-apex-up
    pull: true
    secrets: [aws_secret_access_key, aws_access_key_id]
    stage: production
+   verbose: false
    when:
      event: tag
```

Deploy to both staging and production stage.

validate or build only the specified builds

```diff
pipeline:
  up:
    image: appleboy/drone-apex-up
    pull: true
    secrets: [aws_secret_access_key, aws_access_key_id]
-   stage: production
+   stage:
+     - staging
+     - production
    when:
      event: tag
```

# Secret Reference

aws_secret_access_key
: amazon access key

aws_access_key_id
: amazon secret access key

# Parameter Reference

directory
: Change working directory

stage
: Target stage name: `staging` or `production`

verbose
: Enable verbose log output, default as `true`
