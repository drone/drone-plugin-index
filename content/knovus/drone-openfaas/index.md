---
date: 2020-04-19T21:21:00-04:00
title: OpenFaaS
author: knovus
logo: openfaas.svg
tags: [ publish, openfaas, serverless, functions ]
repo: knovus/drone-openfaas
image: knovus/drone-openfaas
---

This plugin [knovus/drone-openfaas] can be used to build (generate Dockerfile and stuff) and Deploy functions to the OpenFaaS Gateway, and for the Docker image build & publish step, you can use the plugin for Kaniko [banzaicloud/drone-kaniko] or you favorite plugin.

The plugin use a plugin-wrapper on top of faas-cli tool.  Please see OpenFaaS CLI documentation for more info [https://github.com/openfaas/faas-cli].

The following pipeline configuration uses OpenFaaS plugin to Generate files, then use the Kaniko plugin to build and
publish Docker images, and finally, uses OpenFaaS plugin again to Deploy the function to OpenFaaS Gateway.

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
