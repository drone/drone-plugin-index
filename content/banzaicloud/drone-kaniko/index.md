---
date: 2019-01-08T07:27:08-05:00
title: Kaniko
author: banzaicloud
logo: term.svg
tags: [ publish, docker ]
repo: banzaicloud/drone-kaniko
image: banzaicloud/drone-kaniko
---

This plugin can be used to build and publish images to the Docker registry,
using the [Kaniko](https://github.com/GoogleContainerTools/kaniko) image
builder.  Unlike the [Docker plugin](../../drone-plugins/drone-docker) you
are not required you to run your agent in privileged mode.

The following pipeline configuration uses the Kaniko plugin to build and
publish Docker images:

```yaml
kind: pipeline
name: default

steps:
- name: kaniko
  image: banzaicloud/drone-kaniko
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
    tags: latest
```

Example configuration using multiple tags:

```yaml
steps:
- name: kaniko
  image: banzaicloud/drone-kaniko
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
    tags:
      - latest
      - '1.0.1'
      - '1.0'
```

Example configuration using build arguments:

```yaml
steps:
- name: kaniko
  image: banzaicloud/drone-kaniko
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
    build_args:
      - HTTP_PROXY=http://yourproxy.com
```

Example configuration using alternate Dockerfile:

```yaml
steps:
- name: kaniko
  image: banzaicloud/drone-kaniko
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
    dockerfile: path/to/Dockerfile
```

Example configuration using a custom registry:

```yaml
steps:
- name: kaniko
  image: banzaicloud/drone-kaniko
  settings:
    username: kevinbacon
    password: pa55word
    repo: index.company.com/foo/bar
    registry: index.company.com
```

Example configuration using inline credentials:

```yaml
steps:
- name: kaniko
  image: plugins/docker
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
```

Example configuration using credentials from secrets:

```yaml
steps:
- name: kaniko
  image: banzaicloud/drone-kaniko
  settings:
    repo: foo/bar
    username:
      from_secret: docker_username
    password:
      from_secret: docker_password
```

# Parameter Reference

registry
: authenticates to this registry

username
: authenticates with this username

password
: authenticates with this password

repo
: repository name for the image

tags
: repository tag for the image

dockerfile
: dockerfile to be used, defaults to Dockerfile

context
: the context path to use, defaults to root of the git repo

target
: the build target to use, must be defined in the docker file

build_args
: custom arguments passed to docker build
