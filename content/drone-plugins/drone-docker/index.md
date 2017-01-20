---
date: 2016-01-01T00:00:00+00:00
title: Docker
author: drone-plugins
tags: [ publish, docker ]
repo: drone-plugins/drone-docker
logo: docker.svg
image: plugins/drone
---

The Docker plugin can be used to build and publish images to the Docker registry. The following pipeline configuration uses the Docker plugin to build and publish Docker images:

```yaml
pipeline:
  docker:
    image: plugins/docker
    username: kevinbacon
    password: pa55word
    email: kevin.bacon@mail.com
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

Example configuration using build arguments:

```diff
publish:
  docker:
    image: plugins/docker
    repo: foo/bar
+   build_args:
+     - HTTP_PROXY=http://yourproxy.com
```

Example configuration using alternate Dockerfile:

```diff
publish:
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

# Parameter Reference

registry
: authenticates to this registry

username
: authenticates with this username

password
: authenticates with this password

email
: authenticates with this email

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

dns
: set custom dns servers for the container

storage_driver
: supports `aufs`, `overlay` or `vfs` drivers

build_args
: custom arguments passed to docker build
