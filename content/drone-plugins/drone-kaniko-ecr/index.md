---
date: 2022-01-01T00:00:00+00:00
title: Kaniko ECR
author: drone-plugins
tags: [ publish, amazon, aws, ecr, docker ]
logo: amazon_ecr.svg
repo: drone/drone-kaniko
image: plugins/kaniko-ecr
---

Drone kaniko plugin uses [Kaniko](https://github.com/GoogleContainerTools/kaniko) to build and publish images to the Amazon ECR registry. Kaniko does not require docker daemon to build images. Hence, it is idle for building images on kubernetes cluster. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: publish  
  image: plugins/kaniko-ecr
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
  image: plugins/kaniko-ecr
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
  image: plugins/kaniko-ecr
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
  image: plugins/kaniko-ecr
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
  image: plugins/kaniko-ecr
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
  image: plugins/kaniko-ecr
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

repo
: repository name for the image

tags
: repository tag for the image

dockerfile
: dockerfile to be used, defaults to Dockerfile

context
: the context path to use, defaults to root of the git repo

[snapshot_mode](https://github.com/GoogleContainerTools/kaniko#--snapshotmode)
: mode used by kaniko to snapshot the filesystem. Use redo mode for faster builds 

no_push=false
: boolean if the docker image should be pushed at the end

[enable_cache](https://github.com/GoogleContainerTools/kaniko#--cache)=false
: boolean to opt into caching with kaniko

[cache_repo](https://github.com/GoogleContainerTools/kaniko#--cache-repo)
: remote docker repository that will be used to store cached layers. enable_cache needs to be set to use this flag

[cache_ttl](https://github.com/GoogleContainerTools/kaniko#--cache-ttl-duration)
: cache timeout in hours

[skip_tls_verify](https://github.com/GoogleContainerTools/kaniko#--skip-tls-verify)
: skips TLS certificate validation when pushing to a registry

target
: the build target to use, must be defined in the docker file

build_args
: pass custom arguments to docker build

auto_tag=false
: generate tag names automatically based on git branch and git tag

auto_tag_suffix
: generate tag names with this suffix

custom_labels
: additional k=v labels

[registry_mirrors](https://github.com/GoogleContainerTools/kaniko#--registry-mirror)
: use a mirror registry instead of pulling images directly from the central Hub

[platform](https://github.com/GoogleContainerTools/kaniko#--customPlatform)
: allows to build with another default platform than the host, similarly to docker build --platform

[verbosity](https://github.com/GoogleContainerTools/kaniko#--verbosity)
: Logging level with value as oneof `panic|fatal|error|warn|info|debug|trace` 