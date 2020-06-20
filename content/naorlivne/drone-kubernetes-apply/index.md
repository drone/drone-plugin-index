---
date: 2019-08-27T00:00:00+00:00
title: Kubernetes
author: naorlivne
tags: [ deploy, kubernetes, docker ]
logo: kubernetes.svg
repo: naorlivne/drone-kubernetes-apply
image: naorlivne/drone-kubernetes-apply
---

This plugin can be used to deploy applications to a Kubernetes cluster, it will create\update the given kubernetes deployments/cron jobs/pods/etc as needed.

Main difference between this plugin and other kubernetes Drone plugin is that it uses kubectl under the hood to allow multiple resources to be declared in a single YAML file and supports all resources types provided by Kubernetes. 

The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
type: docker
name: default

steps:
- name: kubernetes_deploy
  image: naorlivne/drone-kubernetes-apply
  settings:
    kubernetes_token: my...vary...long...kube...token
    kubernetes_api_host: https://mykubecluster.example.com
    kubernetes_yaml_file: injected_deployment.yaml
```

# Kubernetes YAML File

{{% alert info %}}
In addition to the `.drone.yml` file you will need to create a `injected_deployment.yaml` file that contains the kubernetes resources you want to deploy/update.
{{% /alert %}}

# Value substitution

Example configuration with values substitution:
```yaml
kind: pipeline
type: docker
name: default

steps:
- name: kubernetes_deploy
  image: naorlivne/drone-kubernetes-apply
  settings:
    kubernetes_token: my...vary...long...kube...token
    kubernetes_api_host: https://mykubecluster.example.com
    kubernetes_yaml_file: injected_deployment.yaml
    my_image_tag: my_dynamic_image
```

In the `injected_deployment.yaml` file (please note the $ before the PLUGIN_MY_IMAGE_TAG key):

```json
{
  ...
  "image": "myrepo/myimage:$PLUGIN_MY_IMAGE_TAG",
  ...
}
```

will result in:

```json
{
  ...
  "image": "myrepo/myimage:my_dynamic_image",
  ...
}
```

# Parameter Reference

kubernetes_api_host
: The kubernetes API server URL (no trailing slash should be used)

kubernetes_token
: The token used to auth against the kubernetes API

kubernetes_yaml_file
: The kubernetes deployment configuration file location relative to the root folder of the repo, defaults to `injected_deployment.yaml` in the repo root
