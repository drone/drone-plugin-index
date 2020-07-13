---
date: 2016-01-01T00:00:00+00:00
title: Docker
author: drone-plugins
tags: [ publish, docker ]
logo: docker.svg
repo: drone-plugins/drone-docker
image: plugins/drone
---

The Docker plugin can be used to build and publish images to the Docker registry. The following pipeline configuration uses the Docker plugin to build and publish Docker images:

```yaml
kind: pipeline
name: default

steps:
- name: docker  
  image: plugins/docker
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
    tags: latest
```

Example configuration using multiple tags:

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
    tags:
      - latest
      - '1.0.1'
      - '1.0'
```

Example configuration using a `.tags` file (a comma separated list of tags):

```yaml
steps:
- name: build
  image: golang
  commands:
    - go build
    - go test
    - echo -n "5.2.6,5.2.4" > .tags

- name: docker  
  image: plugins/docker
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
```

Example configuration using build arguments:

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
    build_args:
      - HTTP_PROXY=http://yourproxy.com
```

Example configuration passing secrets as build arguments:

```yaml
steps:
  - name: build-image
    image: plugins/docker
    environment:
      TOKEN:
        from_secret: one_of_the_tokens
    settings:
      username: kevinbacon
      password: pa55word
      repo: foo/bar
      build_args_from_env:
        - TOKEN
```

Example configuration using alternate Dockerfile:

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
    dockerfile: path/to/Dockerfile
```

Example configuration using a custom registry:

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    username: kevinbacon
    password: pa55word
    repo: index.company.com/foo/bar
    registry: index.company.com
```

Example configuration using inline credentials:

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    username: kevinbacon
    password: pa55word
    repo: foo/bar
```

Example configuration using credentials from secrets:

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    repo: foo/bar
    username:
      from_secret: docker_username
    password:
      from_secret: docker_password
```

# Autotag

The Docker plugin can be configured to automatically tag your images. When this feature is enabled and the event type is tag, the plugin will automatically tag the image using the standard major, minor, release convention. For example:

* `1.0.0` produces docker tags `1`, `1.0`, `1.0.0`
* `1.0.0-rc.1` produces docker tags `1.0.0-rc.1`

When the event type is push and the target branch is your default branch (e.g. master) the plugin will automatically tag the image as `latest`. All other event types and branches are ignored.

Example configuration:

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    repo: foo/bar
    auto_tag: true
    username: kevinbacon
    password: pa55word
```

Example configuration with tag suffix:

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    repo: foo/bar
    auto_tag: true
    auto_tag_suffix: linux-amd64
    username: kevinbacon
    password: pa55word
```

Please note that auto-tagging is intentionally simple and opinionated. We are not accepting pull requests at this time to further customize the logic.

# Multi-stage builds

The Docker plugin allow to stop build at a specific stage defined in `Dockerfile` as described in the [official docs](https://docs.docker.com/develop/develop-images/multistage-build/#name-your-build-stages).
If the `target` attribute is not defined, the Docker plugin will not stop at any stage and build the full docker image.

Using a `Dockerfile` like:

```
FROM golang as builder
WORKSPACE /go/src/github.com/foo/bar
RUN CGO_ENABLED=0 GOOS=linux go build -o demo main.go

FROM scratch as production
COPY --from=builder /go/src/github.com/foo/bar/demo .
CMD ["./demo"]

FROM alpine as debug
COPY --from=builder /go/src/github.com/foo/bar/demo .
CMD ["./demo"]
```

Example configuration that allow build a docker image for production:

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    repo: foo/bar
    target: production
    username: kevinbacon
    password: pa55word
```

and this one will build debug docker image

```yaml
steps:
- name: docker  
  image: plugins/docker
  settings:
    repo: foo/bar
    target: debug
    username: kevinbacon
    password: pa55word
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

<!--
auth
: auth token for the registry
-->

dry_run
: boolean if the docker image should be pushed at the end

purge
: boolean if cleanup of the docker image should be done at the end

context
: the context path to use, defaults to root of the git repo

target
: the build target to use, must be defined in the docker file

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

custom_dns_search
: docker daemon dns search domains

storage_driver
: supports `aufs`, `overlay` or `vfs` drivers

storage_path
: docker daemon storage path

build_args
: pass custom arguments to docker build

build_args_from_env
: pass the envvars as custom arguments to docker build

auto_tag=false
: generate tag names automatically based on git branch and git tag

auto_tag_suffix
: generate tag names with this suffix

debug, launch_debug
: launch the docker daemon in verbose debug mode

mtu
: docker daemon custom mtu setting

ipv6
: docker daemon IPv6 networking

experimental
: docker daemon Experimental mode

daemon_off
: don't start the docker daemon

cache_from
: images to consider as cache sources

squash
: squash the layers at build time

pull_image
: force pull base image at build time

compress
: compress the build context using gzip

custom_labels
: additional k=v labels

label_schema
: label-schema labels

email
: docker email

no_cache
: do not use cached intermediate containers

add_host
: additional host:IP mapping
