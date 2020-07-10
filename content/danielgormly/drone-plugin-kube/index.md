---
date: 2019-09-27T00:00:00+00:00
title: Kubernetes
author: danielgormly
tags: [ kubernetes, deployment, configmap ]
repo: danielgormly/drone-plugin-kube
logo: kubernetes.svg
image: danielgormly/drone-plugin-kube
---

Updates Kubernetes resources (deployments, ingresses, services, configmap - with binary data). This plugin will either create or update existing resources dependent on their presence. It will wait for deployments before it progresses.

Create or update deployment

```yaml
pipeline:
- name: Deploy app
  image: danielgormly/drone-plugin-kube:0.2.0
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
  image: danielgormly/drone-plugin-kube:0.2.0
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

| Value            | Key                                                                                                                          |
|------------------|------------------------------------------------------------------------------------------------------------------------------|
| ca               | Base-64 encoded string of the K8s CA cert                                                                                    |
| server           | https://10.0.0.20:6443                                                                                                       |
| namespace        | Namespace to deploy to                                                                                                       |
| kubernetes_token | Kubernetes service account token (Not base64 encoded)                                                                        |
| template         | Path to Kubernetes yaml based definition file (Configmap or Deployment). Relative to Git basedir.                            |
| configmap_file   | Path to file containing data to inject in configmap (They configmap key that contains the data will be the filename)         |
| *                | Other parameters will be made available for interpolation within yaml templates (upper-case will be converted to lower-case) |

## Template Substitution

You can substitute values in the deployment template files. But first you have to define the variables.

```yaml {4-5}
 - name: Deploy K8s - Workload
    image: danielgormly/drone-plugin-kube:0.0.2
    settings:
      build_number: ${DRONE_BUILD_NUMBER}
      template: deployment.yaml
      ca:
        from_secret: k8s_cert
      server:
        from_secret: k8s_server
      token:
        from_secret: k8s_token
```

You can substitute the following values between ```{{ }}``` in your deployment template.  
Example `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: wiki
  labels:
    app: wiki
  name: wiki
spec:
  replicas: 1
  selector:
    matchLabels:
      app: wiki
  template:
    metadata:
      labels:
        app: wiki
    spec:
      containers:
        - image: registry.example.com/wiki:{{ build_number }}
          imagePullPolicy: Always
          name: wiki
```

### Template Reference

| Key           | Value                                                                            |
|---------------|----------------------------------------------------------------------------------|
| repo.owner    | repository owner                                                                 |
| repo.name     | repository name                                                                  |
| build.status  | build status type enumeration, either `success` or `failure`                     |100  5107  100  5107    0     0  11199      0 --:--:-- --:--:-- --:--:-- 11199

| build.event   | build event type enumeration, one of `push`, `pull_request`, `tag`, `deployment` |
| build.number  | build number                                                                     |
| build.commit  | git sha for current commit                                                       |
| build.branch  | git branch for current commit                                                    |
| build.tag     | git tag for current commit                                                       |
| build.ref     | git ref for current commit                                                       |
| build.author  | git author for current commit                                                    |
| build.link    | link the the build results in drone                                              |
| build.created | unix timestamp for build creation                                                |
| build.started | unix timestamp for build started                                                 |
