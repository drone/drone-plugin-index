---
date: 2020-09-11:00:00+00:00 
title: Load and store
author: allgreed
tags: [ publish, docker ]
logo: docker.svg
repo: allgreed/drone-load-and-store
image: allgreed/drone-load-and-store
---

This plugin can be used to load and publish images to the Docker registry. It can come in handy when the [default Docker plugin](http://plugins.drone.io/drone-plugins/drone-docker/) cannot be used. A good example usecase is [building Docker images with nix](https://nix.dev/tutorials/building-and-running-docker-images.html) which produces a Docker image archive.

The following pipeline configuration pushes an image archive under `./docker-image.tar.gz` to `docker.io/username/repository:latest` and `docker.io/username/repository:5.2.4` with credentials acquired from Drone secrets:

```yaml
steps:
- name: prepare-tags
  image: busybox
  commands:
    - echo -n "latest,5.2.4" > .tags

- name: push-docker-image
  image: allgreed/drone-load-and-store
  settings:
    archive: docker-image.tar.gz
    repo: username/repository
    username:
      from_secret: docker_username
    password:
      from_secret: docker_password
```

The `.tags` file is mandatory.

# Parameter Reference

archive
: location of the docker image archive

registry
: authenticates to this registry (default: docker.io)

username
: authenticates with this username

password
: authenticates with this password

repo
: repository name for the image

debug
: enable verbose logging
