---
date: 2018-01-24T00:00:00+00:00
title: Now
author: lucaperret
tags: [ deploy, now ]
repo: lucaperret/drone-now
logo: now.svg
image: lucap/drone-now
---

The Now plugin deploy your build to [now.sh](https://zeit.co/now). The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  now:
    image: lucap/drone-now
    token: xxxxx
    name: deployment-name
```

Example configuration for assigning [Aliases and Domains](https://zeit.co/docs/features/aliases):

```diff
pipeline:
  now:
    image: lucap/drone-now
    token: xxxxx
-   name: deployment-name
+   alias: my-deployment-alias
```

Example deploying [Git repositories](https://zeit.co/docs/features/repositories):

```diff
pipeline:
  now:
    image: lucap/drone-now
    token: xxxxx
-   alias: my-deployment-alias
+   git_repository: username/repository
```

Example configuration with custom [Path Aliases](https://zeit.co/docs/features/path-aliases):

```diff
pipeline:
  now:
    image: lucap/drone-now
    token: xxxxx
-   git_repository: username/repository
+   rules_domain: example.com
+   rules_file: rules.json
```

Example configuration for [Scaling](https://zeit.co/docs/getting-started/scaling):

```diff
pipeline:
  now:
    image: lucap/drone-now
    token: xxxxx
-   rules_domain: example.com
-   rules_file: rules.json
+   scale: 2
```

Example configuration to enforce type (by default, it's detected automatically):

```diff
pipeline:
  now:
    image: lucap/drone-now
    token: xxxxx
-   scale: 2
+   type: npm
```

Example configuration using token from secrets:

```diff
pipeline:
  now:
    image: lucap/drone-now
-   token: xxxxx
+   secrets: [ now_token ]
```

# Secret Reference

now_token
: Now token

# Parameter Reference

token
: Now token

name
: Set the name of the deployment

alias
: Target Now.sh subdomain or domain

git_repository
: Git repository of your choice

rules_domain
: Your domain

rules_file
: File that contain set of rules

scale
: Min and Max scaling values

type
: Deployment type (docker, npm, static)