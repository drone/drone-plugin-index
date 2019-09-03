---
date: 2019-09-27T00:00:00+00:00
title: Kubernetes
author: danielgormly
tags: [ kubernetes, deployment, configmap ]
repo: danielgormly/drone-plugin-kube
logo: kubernetes.svg
image: danielgormly/drone-plugin-kube
---

Updates Kubernetes deployments from templates & configMaps from files. This plugin will either create or update existing resources dependent on their presence. It will wait for deployments before it progresses. Additional

Create or update deployment

```yaml
pipeline:
- name: Deploy app
  image: danielgormly/drone-plugin-kube:0.0.1
  settings:
    template: path/to/deployment.yaml # relative to repo root
    ca: LS0tLS1... # BASE64 encoded string of the K8s CA cert
    server: https://10.0.0.20:6443 # K8s master node address
    token:
      from_secret: kubernetes_token # Service account token to a service account that can manage deployments
```

Create or update config-map from a single file

```diff
pipeline:
- name: Deploy app
  image: danielgormly/drone-plugin-kube:0.0.1
  settings:
-    template: path/to/deployment.yaml
+    template: path/to/config-map.yaml
+    configmap_file: path/to/config-data.yaml
    ca: LS0tLS1...
    server: https://10.0.0.20:6443
    token:
      from_secret: kubernetes_token
```

# Parameter Reference

ca
: Base-64 encoded string of the K8s CA cert

server
: https://10.0.0.20:6443

kubernetes_token
: Kubernetes service account token (Not base64 encoded)

template
: Path to Kubernetes yaml based definition file (Configmap or Deployment)

configmap_file
: path to file containing data to inject in configmap (They configmap key that contains the data will be the filename)

`*`
: Other parameters will be made available for interpolation within yaml templates (upper-case will be converted to lower-case)
