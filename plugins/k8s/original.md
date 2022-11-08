---
date: 2019-09-27T00:00:00+00:00
title: Kubernetes
author: zc2638
tags: [ k8s, kubernetes, resources ]
repo: zc2638/drone-k8s-plugin
logo: kubernetes.svg
image: zc2638/drone-k8s-plugin
---

Drone CI plugin for creating & updating K8s Resources.  
This plugin supports all Kubernetes resources and also supports creating/updating Configmaps from config files.

Create or update Kubernetes resources

```yaml
kind: pipeline
type: docker
name: drone-k8s-plugin-test

steps:
- name: deploy
  image: zc2638/drone-k8s-plugin
  pull: if-not-exists
  settings:
    k8s_server: https://localhost:6443
    k8s_token:
      from_secret: k8s_token
    k8s_ca_crt:
      from_secret: k8s_ca_crt
    k8s_skip_tls: false
    namespace: default
    config_files:
      - default:test-config:testdata/config.yaml
      - default:test-config:testdata/config.yaml:a.yaml
    templates:
      - testdata/deployment.yaml
      - testdata/service.yaml
    app_name: ${DRONE_REPO_NAME}
```

# Parameter Reference

kubernetes_server
: The address and port of the Kubernetes API server.

kubernetes_token
: Token from ServiceAccount for authentication to the API server.

kubernetes_ca_crt
: Certificate from ServiceAccount for authentication to the API server.

kubernetes_skip_tls
: If true, the server's certificate will not be checked for validity. This will make your HTTPS connections insecure.

init_templates
: Path to Kubernetes Resource yaml based definition file (e.g. ConfigMap, Deployment or others), used to initialize some resources.

templates
: Path to Kubernetes Resource yaml based definition file (e.g. ConfigMap, Deployment or others).

config_files
: Config file paths for automatic creation/update of ConfigMap.The syntax is expressed as `namespace:name:file_path:file_name` or `namespace:name:file_path`, when file_name is not specified, it will default to the file name of file_path.

namespace
: Default namespace to use when namespace is not set.

debug
: Used to enable debug level logging.

`*`
: Other parameters will be made available for interpolation within yaml templates (upper-case will be converted to lower-case)
