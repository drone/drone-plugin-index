---
date: 2020-04-19T21:21:00-04:00
title: OpenFaaS
author: knovus
logo: openfaas.svg
tags: [ publish, openfaas, serverless, functions ]
repo: knovus/drone-openfaas
image: knovus/drone-openfaas
---

This plugin [knovus/drone-openfaas] can be used to build (generate Dockerfile and stuff) and Deploy functions to the OpenFaaS Gateway,
and for the Docker image build & publish step, you can use the plugin for Kaniko [banzaicloud/drone-kaniko] or you favorite plugin.

The plugin use a plugin-wrapper on top of faas-cli tool.  Please see OpenFaaS CLI documentation for more info [https://github.com/openfaas/faas-cli].

The following pipeline configuration uses OpenFaaS plugin to Generate files, then use the Kaniko plugin to build and
publish Docker images, and finally, uses OpenFaaS plugin again to Deploy the function to OpenFaaS Gateway.

## Basic example using Git PUSH trigger event:

Example .drone.yml for Drone >=1.0 (pushing OpenFaaS Function to Private Docker Registry)

```yaml
kind: pipeline
name: default

steps:
- name: generate
  image: knovus/drone-openfaas
  settings:
    yaml: my_function.yml
- name: build #Example Docker build & publish with Kaniko plugin
  image: banzaicloud/drone-kaniko
  settings:
    repo: ${DRONE_REPO_NAME}
    tags: latest
    context: ./build/${DRONE_REPO_NAME}/
    dockerfile: ./build/${DRONE_REPO_NAME}/Dockerfile
    registry:
        from_secret: docker_registry
    username:
        from_secret: docker_registry_user
    password:
        from_secret: docker_registry_pass
- name: deploy
  image: knovus/drone-openfaas
  settings:
    deploy: true
    yaml: my_function.yml
    image_name: ${DRONE_REPO_NAME}
    url: https://my.openfaas.com
    password:
      from_secret: openfaas_password
    registry:
      from_secret: docker_registry
```

Example .drone.yml for Drone <1.0 (pushing OpenFaaS Function to Private Docker Registry)

```yaml
  pipeline:
    generate:
      image: knovus/drone-openfaas
      yaml: my_function.yml
    build: #Example Docker build & publish with Kaniko plugin
      image: banzaicloud/drone-kaniko
      secrets:
      - source: docker_registry
        target: plugin_registry
      - source: docker_registry_user
        target: plugin_username
      - source: docker_registry_pass
        target: plugin_password
      repo: ${DRONE_REPO_NAME}
      tags: latest
      context: ./build/${DRONE_REPO_NAME}/
      dockerfile: ./build/${DRONE_REPO_NAME}/Dockerfile
    deploy:
      image: knovus/drone-openfaas
      secrets:
      - source: docker_registry
        target: plugin_registry
      - source: openfaas_password
        target: plugin_password
      deploy: true
      yaml: my_function.yml
      image_name: ${DRONE_REPO_NAME}
      url: https://my.openfaas.com
```

## Advanced example using Git TAG trigger event:

Example .drone.yml for Drone >=1.0 (pushing OpenFaaS Function to Private Docker Registry)

```yaml
kind: pipeline
name: default
clone: # Optional, only needed if you want to use TAG parameter in OpenFaaS deploy.  This enable tags fetch.
  git:
    image: plugins/git
    tags: true
steps:
- name: generate
  image: knovus/drone-openfaas
  settings:
    yaml: my_function.yml
- name: build #Example Docker build & publish with Kaniko plugin
  image: banzaicloud/drone-kaniko
  settings:
    repo: ${DRONE_REPO_NAME}
    tags: latest-${DRONE_TAG}
    context: ./build/${DRONE_REPO_NAME}/
    dockerfile: ./build/${DRONE_REPO_NAME}/Dockerfile
    registry:
        from_secret: docker_registry
    username:
        from_secret: docker_registry_user
    password:
        from_secret: docker_registry_pass
- name: deploy
  image: knovus/drone-openfaas
  settings:
    deploy: true
    yaml: my_function.yml
    image_name: ${DRONE_REPO_NAME}
    tag: describe
    url: https://my.openfaas.com
    tls_no_verify: true
    username:
      from_secret: openfaas_username
    password:
      from_secret: openfaas_password
    registry:
      from_secret: docker_registry
```

Example .drone.yml for Drone <1.0 (pushing OpenFaaS Function to Private Docker Registry)

```yaml
  pipeline:
    clone:  # Optional, only needed if you want to use TAG parameter in OpenFaaS deploy.  This enable tags fetch.
      image: plugins/git
      tags: true
    generate:
      image: knovus/drone-openfaas
      yaml: my_function.yml
    build: #Example Docker build & publish with Kaniko plugin
      image: banzaicloud/drone-kaniko
      secrets:
      - source: docker_registry
        target: plugin_registry
      - source: docker_registry_user
        target: plugin_username
      - source: docker_registry_pass
        target: plugin_password
      repo: ${DRONE_REPO_NAME}
      tags: latest-${DRONE_TAG}
      context: ./build/${DRONE_REPO_NAME}/
      dockerfile: ./build/${DRONE_REPO_NAME}/Dockerfile
    deploy:
      image: knovus/drone-openfaas
      secrets:
      - source: docker_registry
        target: plugin_registry
      - source: openfaas_username
        target: plugin_username
      - source: openfaas_password
        target: plugin_password
      deploy: true
      yaml: my_function.yml
      image_name: ${DRONE_REPO_NAME}
      tag: describe
      url: https://my.openfaas.com
      tls_no_verify: true
```


# Parameter Reference

image_name
: the docker image name published.  If isn't included, reads the parameter from yaml file.

registry
: the registry where the Docker image is published.

url
: authenticates and deploys to this OpenFaaS Gateway.

tls_no_verify
: set to true if you setup don't have a valid tls certificate.

username
: authenticates with this username to OpenFaaS Gateway.

password
: authenticates with this password to OpenFaaS Gateway.

deploy
: set to true if the step is for deploy the a function.

tag
: repository tag strategy for the function, based on OpenFaaS TAG.  Optional, defaults set latest.

yaml
: OpenFaaS function definition to be used.  Optional, default reads stack.yml file.

template
: Optional, only if you need to pull a OpenFaaS store template to build the function (ex. node10-express).