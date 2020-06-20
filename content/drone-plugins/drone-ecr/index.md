---
date: 2016-01-01T00:00:00+00:00
title: AWS ECR
author: drone-plugins
tags: [ publish, amazon, aws, ecr, docker ]
logo: amazon_ecr.svg
repo: drone-plugins/drone-ecr
image: plugins/ecr
---

The ECR plugin can be used to build and publish images to the Amazon ECR registry. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: publish  
  image: plugins/ecr
  settings:
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    repo: bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
```

Example configuration using multiple tags:

```yaml
steps:
- name: publish  
  image: plugins/ecr
  settings:
    create_repository: true
    repo: bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
    tags:
      - latest
      - 1.0.1
      - 1.0
```

Override the default region:

```yaml
steps:
- name: publish  
  image: plugins/ecr
  settings:
    create_repository: true
    repo: bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
    region: us-east-1
```

Override the default Dockerfile path:

```yaml
steps:
- name: publish  
  image: plugins/ecr
  settings:
    create_repository: true
    repo: bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
    dockerfile: path/to/Dockerfile
```

Example configuration using build arguments:

```yaml
steps:
- name: publish  
  image: plugins/ecr
  settings:
    create_repository: true
    repo: bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
    build_args:
      - HTTP_PROXY=http://yourproxy.com
```

Example configuration using credentials from secrets:

```yaml
steps:
- name: publish  
  image: plugins/ecr
  settings:
    access_key:
      from_secret: aws_access_key_id
    secret_key:
      from_secret: aws_secret_access_key
    repo: bar
    registry: <account_id>.dkr.ecr.us-east-1.amazonaws.com
```

# Parameter Reference

access_key
: amazon access key

secret_key
: amazon secret access key

create_repository
: boolean of whether to create repository if it does not exist, defaults to `false`

region
: amazon region, defaults to `us-east-1`

repo
: repository name for the image

lifecycle_policy
: filename of ecr lifecycle json policy

repository_policy
: filename of ecr repository json policy

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

custom_dns
: set custom dns servers for the container

storage_driver
: supports `aufs`, `overlay` or `vfs` drivers

build_args
: custom arguments passed to docker build
