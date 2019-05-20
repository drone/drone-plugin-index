---
version: '0.1'
date: 2019-20-05T14:54:23-07:00
title: Kubernetes Deployment Plugin
author: danielgormly
tags: [ deploy, publish, kubernetes ]
logo: kubernetes.svg
repo: danielgormly/drone-plugin-kube
image: danielgormly/drone-plugin-kube
---

A simple Drone plugin for managing Kubernetes deployments. Follows from [vallard/drone-kube](https://github.com/vallard/drone-kube) but with dependency management, up-to-date client-go, docs updated to Drone 1.x syntax, examples and a different structure.

# Usage

Add the following [build step](https://docs.drone.io/user-guide/pipeline/steps/) to your drone pipeline definition. Currently this plugin only updates deployments, it does not create them. I can add this behaviour or I will accept pull requests to introduce it.

# drone.yaml partial example
```yml
- name: Deploy app
  image: danielgormly/drone-plugin-kube
  settings:
    template: path/to/deployment.yaml # within repo
    ca: LS0tLS1... # BASE64 encoded string of the K8s CA cert
    server: https://10.0.0.20:6443 # K8s master node address
    token:
      from_secret: kubernetes_token # Service account token to a service account that can manage deployments
    namespace: custom # [Optional] Kubernetes namespace to use (defaults to `default`)
    [example_custom_key]: string # [Optional, example] Any additional values you label here will be available for template interpolation (lower case key names only!)
```

# Deployment templates

Deployment config files are first interpreted by **aymerick/raymond** ([handlebarsjs](http://handlebarsjs.com/) equivalent). You can use all available raymond expressions and anything you put in settings prefixed with the PLUGIN_* environment variables e.g. `{{PLUGIN.NAMESPACE}}`. See [example/deployment.template.yaml](https://github.com/danielgormly/drone-plugin-kube/blob/master/example/deployment.template.yaml) for a complete example.

# Adding a service account to Kubernetes that can manage deployments

See [example/Role.yaml](https://github.com/danielgormly/drone-plugin-kube/blob/master/example/Role.yaml), [example/ServiceAccount.yaml](https://github.com/danielgormly/drone-plugin-kube/blob/master/example/ServiceAccount.yaml), [example/RoleBinding.yaml](https://github.com/danielgormly/drone-plugin-kube/blob/master/example/RoleBinding.yaml).
