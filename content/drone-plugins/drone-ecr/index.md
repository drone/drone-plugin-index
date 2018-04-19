---
date: 2016-01-01T00:00:00+00:00
title: AWS ECR
author: drone-plugins
tags: [ publish, amazon, aws, ecr, docker ]
repo: drone-plugins/drone-ecr
logo: amazon_ecr.svg
image: plugins/ecr
---

The ECR plugin can be used to build and publish images to the Amazon ECR registry. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  ecr:
    image: plugins/ecr
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    repo: <account_id>.dkr.ecr.us-east-1.amazonaws.com/bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
```

Example configuration using multiple tags:

```diff
pipeline:
  ecr:
    image: plugins/ecr
    repo: <account_id>.dkr.ecr.us-east-1.amazonaws.com/bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
-   tags: latest
+   tags:
+     - latest
+     - 1.0.1
+     - 1.0
```

Override the default region:

```diff
publish:
  ecr:
    image: plugins/ecr
    repo: <account_id>.dkr.ecr.us-east-1.amazonaws.com/bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
+   region: us-east-1
```

Override the default Dockerfile path:

```diff
publish:
  ecr:
    image: plugins/ecr
    repo: <account_id>.dkr.ecr.us-east-1.amazonaws.com/bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
-   dockerfile: Dockerfile
+   dockerfile: path/to/Dockerfile
```

Example configuration using build arguments:

```diff
publish:
  ecr:
    image: plugins/ecr
    repo: <account_id>.dkr.ecr.us-east-1.amazonaws.com/bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
+   build_args:
+     - HTTP_PROXY=http://yourproxy.com
```

Example configuration using credentials from secrets:

```diff
pipeline:
  ecr:
    image: plugins/ecr
-   access_key: a50d28f4dd477bc184fbd10b376de753
-   secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    repo: <account_id>.dkr.ecr.us-east-1.amazonaws.com/bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
+   secrets: [ ecr_access_key, ecr_secret_key ]
```

# Secret Reference

ecr_region
: amazon region, defaults to `us-east-1`

ecr_access_key
: amazon access key

ecr_secret_key
: amazon secret access key

# Parameter Reference

access_key
: amazon access key

secret_key
: amazon secret access key

region
: amazon region, defaults to `us-east-1`

repo
: repository name for the image

tags
: repository tag for the image, defaults to `latest`

dockerfile
: dockerfile to be used, defaults to Dockerfile

auth
: auth token for the registry

context
: the context path to use, defaults to root of the git repo

force_tag=false
: replace existing matched image tags

insecure=false
: enable insecure communication to this registry

mirror
: use a mirror registry instead of pulling images directly from the central Hub

bip=false
: use for pass bridge ip

dns
: set custom dns servers for the container

storage_driver
: supports `aufs`, `overlay` or `vfs` drivers

build_args
: custom arguments passed to docker build
