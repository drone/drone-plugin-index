---
version: '0.8'
date: 2016-01-13T00:00:00+00:00
title: Rancher
author: josmo
tags: [ deploy, rancher, docker ]
logo: rancher.svg
repo: josmo/drone-rancher
image: pelotech/drone-rancher
---

The Rancher plugin can be used to deploy a Docker image to a Rancher environment. The following pipeline configuration uses the Rancher plugin to deploy a Docker image to a Rancher service:

```yaml
kind: pipeline
type: docker
name: default

steps:
- name: publish
  image: pelotech/drone-rancher
  settings:
    url: http://awesomehost:awesomeport
    access_key: superaccesskey
    secret_key: supersecretkey
    service: huh/service1
    docker_image: huh/hello
```

Example configuration with not starting the container first and confirming the upgrade with a longer timeout:

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: publish
    image: pelotech/drone-rancher
    settings:
      url: http://awesomehost:awesomeport
      access_key: superaccesskey
      secret_key: supersecretkey
      service: huh/service1
      docker_image: huh/hello
+     start_first: false
+     confirm: true
+     timeout: 180
```


Example configuration with a batch size of 5:

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: publish
    image: pelotech/drone-rancher
    settings:
      url: http://awesomehost:awesomeport
      access_key: superaccesskey
      secret_key: supersecretkey
      service: huh/service1
      docker_image: huh/hello
+     batch_size: 5
```

# Parameter Reference

url
: rancher server host url

access_key
: rancher environment access key

secret_key
: rancher environment secret key

service
: rancher service on that environment to upgrade

start_first
: start new container before stopping old one, default to true

confirm
: auto confirm the service upgrade if successful, defaults to false

timeout
: the maximum wait time in seconds for the service to upgrade, default to 30

docker_image
: docker image to use to upgrade the environment

interval_millis
: interval in milliseconds between upgrades of the containers

batch_size
: batch size for the service upgrade

