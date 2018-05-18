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
pipeline:
  docker:
    image: plugins/docker
    username: kevinbacon
    password: pa55word
    repo: foo/bar
    tags: latest
```

Example configuration using multiple tags:

```diff
pipeline:
  docker:
    image: plugins/docker
    repo: foo/bar
-   tags: latest
+   tags:
+     - latest
+     - 1.0.1
+     - 1.0
```

Example configuration using a `.tags` file (a comma separated list of tags):

```diff
pipeline:
  build:
    image: golang:1.10.0-alpine
    commands:
      - [...]
+     - echo -n "5.2.6,5.2.4" > .tags
  docker:
    image: plugins/docker
    repo: foo/bar
-   tags: latest
```

Example configuration using build arguments:

```diff
pipeline:
  docker:
    image: plugins/docker
    repo: foo/bar
+   build_args:
+     - HTTP_PROXY=http://yourproxy.com
```

Example configuration using alternate Dockerfile:

```diff
pipeline:
  docker:
    image: plugins/docker
    repo: foo/bar
-   dockerfile: Dockerfile
+   dockerfile: path/to/Dockerfile
```

Example configuration using a custom registry:

```diff
pipeline:
  docker:
    image: plugins/docker
-   repo: foo/bar
+   repo: index.company.com/foo/bar
+   registry: index.company.com
```

Example configuration using inline credentials:

```diff
pipeline:
  docker:
    image: plugins/docker
+   username: kevinbacon
+   password: pa55word
    repo: foo/bar
```

Example configuration using credentials from secrets:

```diff
pipeline:
  docker:
    image: plugins/docker
-   username: kevinbacon
-   password: pa55word
    repo: foo/bar
+   secrets: [ docker_username, docker_password ]
```

# Autotag

The Docker plugin can be configured to automatically tag your images. When this feature is enabled and the event type is tag, the plugin will automatically tag the image using the standard major, minor, release convention. For example:

* `1.0.0` produces docker tags `1`, `1.0`, `1.0.0`
* `1.0.0-rc.1` produces docker tags `1.0.0-rc.1`

When the event type is push and the target branch is your default branch (e.g. master) the plugin will automatically tag the image as `latest`. All other event types and branches are ignored.

Example configuration:

```diff
pipeline:
  docker:
    image: plugins/docker
    repo: foo/bar
+   auto_tag: true
    secrets: [ docker_username, docker_password ]
```

Example configuration with tag suffix:

```diff
pipeline:
  docker:
    image: plugins/docker
    repo: foo/bar
+   auto_tag: true
+   auto_tag_suffix: linux-amd64
    secrets: [ docker_username, docker_password ]
```

Please note that auto-tagging is intentionally simple and opinionated. We are not accepting pull requests at this time to further customize the logic.

# Secret Reference

docker_username
: authenticates with this username

docker_password
: authenticates with this password

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

auto_tag=false
: generate tag names automatically based on git branch and git tag

auto_tag_suffix
: generate tag names with this suffix

debug, launch_debug
: launch the docker daemon in verbose debug mode
