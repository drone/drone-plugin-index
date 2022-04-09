---
date: 2022-01-01T00:00:00+00:00
title: Kaniko Docker
author: drone-plugins
tags: [ publish, docker ]
logo: docker.svg
repo: drone/drone-kaniko
image: plugins/kaniko
---

Drone kaniko plugin uses [Kaniko](https://github.com/GoogleContainerTools/kaniko) to build and publish Docker images to a container registry. Kaniko does not require docker daemon to build images. Hence, it is idle for building images on kubernetes cluster.


The following pipeline configuration uses the plugin to build and publish Docker images:

```yaml
kind: pipeline
name: default

steps:
- name: docker
  image: plugins/kaniko
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
  image: plugins/kaniko
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
- name: docker
  image: plugins/kaniko
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
- name: docker
  image: plugins/kaniko
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
  image: plugins/kaniko
  settings:
    username: kevinbacon
    password: pa55word
    repo: index.company.com/foo/bar
    registry: index.company.com
```

Example configuration using credentials from secrets:

```yaml
steps:
- name: dockerq
  image: plugins/kaniko
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
  image: plugins/kaniko
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
  image: plugins/kaniko
  settings:
    repo: foo/bar
    auto_tag: true
    auto_tag_suffix: linux-amd64
    username: kevinbacon
    password: pa55word
```

# Multi-stage builds

The plugin allows to stop build at a specific stage defined in `Dockerfile` as described in the [official docs](https://docs.docker.com/develop/develop-images/multistage-build/#name-your-build-stages).
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
  image: plugins/kaniko
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
  image: plugins/kaniko
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