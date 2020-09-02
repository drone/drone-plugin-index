---
date: 2020-09-02T12:56:18+03:00
title: Kaniko
author: Riscue
logo: kaniko.svg
tags: [ publish, docker ]
repo: riscue/drone-kaniko
image: riscue/drone-kaniko
---

This plugin can be used to build and publish images to the Docker registry,
using the [Kaniko](https://github.com/GoogleContainerTools/kaniko) image
builder. Unlike the [Docker plugin]({{< relLangURL "/drone-plugins/drone-docker" >}}) you
are not required you to run your agent in privileged mode.

The following pipeline configuration uses the Kaniko plugin to build and
publish Docker images:

```yaml
kind: pipeline
name: default

steps:
- name: kaniko
  image: riscue/drone-kaniko
  settings:
    repo: foo/bar
    username: ibrahim
    password: passw0rd
    tags: latest
```

Example configuration using multiple tags:

```yaml
steps:
- name: kaniko
  image: riscue/drone-kaniko
  settings:
    repo: foo/bar
    username: ibrahim
    password: passw0rd
    tags:
      - latest
      - '1.0.1'
      - '1.0'
```

Example configuration using build arguments:

```yaml
steps:
- name: kaniko
  image: riscue/drone-kaniko
  settings:
    repo: foo/bar
    username: ibrahim
    password: passw0rd
    build_args:
      - HTTP_PROXY=http://yourproxy.com
```

Example configuration using alternate Dockerfile:

```yaml
steps:
- name: kaniko
  image: riscue/drone-kaniko
  settings:
    repo: foo/bar
    username: ibrahim
    password: passw0rd
    dockerfile: path/to/Dockerfile
```

Example configuration using a custom registry:

```yaml
steps:
- name: kaniko
  image: riscue/drone-kaniko
  settings:
    registry: index.company.com
    repo: index.company.com/foo/bar
    username: ibrahim
    password: passw0rd
```

Example configuration using auto tagging:

```yaml
steps:
- name: kaniko
  image: riscue/drone-kaniko
  settings:
    registry: index.company.com
    repo: index.company.com/foo/bar
    username: ibrahim
    password: passw0rd
    auto_tag: true
```

Example configuration using inline credentials:

```yaml
steps:
- name: kaniko
  image: riscue/drone-kaniko
  settings:
    repo: foo/bar
    username: ibrahim
    password: passw0rd
```

Example configuration using credentials from secrets:

```yaml
steps:
- name: kaniko
  image: riscue/drone-kaniko
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

repo
: repository name for the image

username
: authenticates with this username

password
: authenticates with this password

auto_tag
: if true auto generate .tags file from `DRONE_TAG` environment variable, supports format Major.Minor.Release or start with `v`

tags
: repository tag for the image

dockerfile
: dockerfile to be used, (default `Dockerfile`)

context
: the context path to use, defaults to root of the git repo

target
: the build target to use, must be defined in the docker file

build_args
: custom arguments passed to docker build

build_args_from_env
: custom arguments read from environment variables and passed to docker build

cache
: Set this flag as `true` to opt into caching with kaniko.

cache_repo
: Set this flag to specify a remote repository that will be used to store cached layers.

cache-ttl
: Cache timeout in hours. Defaults to two weeks. (default `336h0m0s`)

json_key
: key to used as `GOOGLE_APPLICATION_CREDENTIALS`

log
: Log level (`trace`, `debug`, `info`, `warn`, `error`, `fatal`, `panic`) (default `info`)

skip_tls_verify
: Push to insecure registry ignoring TLS verify (default `false`)
