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

Example configuration using custom registry:

```yaml
- name: update-fandogh-deployment
  image: amirbagh75/fandogh-drone:latest
  settings:
    username: 
      from_secret: fandogh_username
    password: 
      from_secret: fandogh_password
    version: ${DRONE_COMMIT}
    registry: myregistry.com:5000
    manifest_path: ./fandogh.yml
```
Example fandogh manifest (with custom registry url):

```yaml
kind: InternalService
name: example
spec:
  image: ${REGISTRY}/image:${VERSION} ## ${VERSION} & ${REGISTRY} must exist in your fandogh.yml file!
  image_pull_policy: IfNotPresent
  replicas: 1
  port_mapping:
  - port: 50052
    target_port: 50052
    protocol: tcp
  env:
  - name: GO_ENV
    value: "production"
```



More info : [https://github.com/amirbagh75/fandogh-drone](https://github.com/amirbagh75/fandogh-drone)

# Parameter Reference

username
: fandogh account username

password
: fandogh account password

version
: new docker image tag. In this example, I considered the commit ID as a new docker image tag.

manifest_path
: fandogh manifest file address. I considered in the root directory of project. (read more [here](https://docs.fandogh.cloud/docs/service-manifest.html).)

registry (optional)
: if you have custom docker registry use this parameter. (example: "myregistry.com:5000")
