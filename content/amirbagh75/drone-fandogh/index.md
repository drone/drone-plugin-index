---
date: 2020-04-16T00:00:00+00:00
title: Fandogh
author: amirbagh75
tags: [ paas, fandogh ]
repo: amirbagh75/fandogh-drone
logo: fandogh.svg
image: amirbagh75/fandogh-drone
---

This plugin can help you to easy delivery your new docker images to [fandogh PaaS](https://www.fandogh.cloud/). The below pipeline configuration demonstrates simple usage:

```yaml
- name: update-fandogh-deployment
  image: amirbagh75/fandogh-drone:latest
  settings:
    username: amirbagh75
    password: 123456789
    version: ${DRONE_COMMIT}
    manifest_path: ./fandogh.yml
```

Example configuration using secrets:

```yaml
- name: update-fandogh-deployment
  image: amirbagh75/fandogh-drone:latest
  settings:
    username: 
      from_secret: fandogh_username
    password: 
      from_secret: fandogh_password
    version: ${DRONE_COMMIT}
    manifest_path: ./fandogh.yml
```

# Parameter Reference

username
: fandogh account username

password
: fandogh password username

version
: new docker image tag. In this example, I considered the commit ID as a new docker image tag.

manifest_path
: fandogh manifest file address. I considered in the root directory of project. (read more [here](https://docs.fandogh.cloud/docs/service-manifest.html).)