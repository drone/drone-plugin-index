---
date: 2018-09-23T00:00:00+00:00
title: Manifest
author: drone-plugins
tags: [ docker, manifest, architecture, tag ]
logo: docker.svg
repo: drone-plugins/drone-manifest
image: plugins/manifest
---

This plugin can push manifests for multi-arch Docker images. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: manifest
  image: plugins/manifest
  settings:
    username: kevinbacon
    password: pa55word
    target: foo/bar:v1.0.0
    template: foo/bar:v1.0.0-OS-ARCH
    platforms:
      - linux/amd64
      - linux/arm
      - linux/arm64
```

Manifests from template:

```yaml
steps:
- name: manifest
  image: plugins/manifest
  settings:
    username: kevinbacon
    password: pa55word
    spec: manifest.tmpl
```

Ignore missing images:

```yaml
steps:
- name: manifest
  image: plugins/manifest
  settings:
    username: kevinbacon
    password: pa55word
    target: foo/bar:v1.0.0
    template: foo/bar:v1.0.0-OS-ARCH
    platforms:
      - linux/amd64
      - linux/arm
      - linux/arm64
    ignore_missing: true
```

Example configuration using named secrets:

```yaml
steps:
- name: manifest
  image: plugins/manifest
  settings:
    username:
      from_secret: docker_username
    password:
      from_secret: docker_password
    target: foo/bar:v1.0.0
    template: foo/bar:v1.0.0-OS-ARCH
    platforms:
      - linux/amd64
      - linux/arm
      - linux/arm64
```

# Parameter Reference

username
: Username for DockerHub authentication

password
: Password for DockerHub authentication

insecure
: Enable insecure (not TLS) registry support

platforms
: List of platforms in format OS/ARCH

target
: Target image for manifest

template
: Template for manifest sources, OS and ARCH are replaced

spec
: Path to a manifest specification file

ignore_missing
: Ignore missing source images

tag, tags
: List of tags, only used within `spec`

default_tags, auto_tag
: Use default/auto tags like the Docker plugin, only used within `spec`
