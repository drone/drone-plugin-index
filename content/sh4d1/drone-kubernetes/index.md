---
date: 2018-07-24T00:00:00+00:00
title: Drone Kubernetes
author: sh4d1
tags: [ deploy, kubernetes, docker ]
logo: kubernetes.svg
repo: sh4d1/drone-kubernetes
image: sh4d1/drone-kubernetes
---

Drone plugin to create/update Kubernetes resources.

It uses the latest k8s go api, so it is intened to use on Kubernetes 1.9+. I can't guarantee it will work for previous versions.

You can directly pull the image from [sh4d1/drone-kubernetes](https://hub.docker.com/r/sh4d1/drone-kubernetes/)

# Usage

Here is how you can use this plugin:

```
pipeline:
  deploy:
    image: sh4d1/drone-kubernetes
    kubernetes_template: deployment.yml
    kubernetes_namespace: default
    secrets: [kubernetes_server, kubernetes_cert, kubernetes_token]
```

# Supported resources

Currently, this plugin supports:

- apps/v1
  - DaemonSet
  - Deployment
  - ReplicaSet
  - StatefulSet
- apps/v1beta1
  - Deployment
  - StatefulSet
- apps/v1beta2
  - DaemonSet
  - Deployment
  - ReplicaSet
  - StatefulSet
- v1
  - ConfigMap
  - PersistentVolume
  - PersistentVolumeClaim
  - Pod
  - ReplicationController
  - Service
- extensions/v1beta1
  - DaemonSet
  - Deployment
  - Ingress
  - ReplicaSet

# Inspiration

It is inspired by [vallard](https://github.com/vallard) and his plugin [drone-kube](https://github.com/vallard/drone-kube).

# Secrets

You need to define these secrets before. You can use UI or cli:

```
$ drone secret add --image=sh4d1/drone-kubernetes -repository <your-repo> -name KUBERNETES_SERVER -value <your API server>
```

```
$ drone secret add --image=sh4d1/drone-kubernetes -repository <your repo> -name KUBERNETES_CERT -value <your base64 encoded cert>
```

```
$ drone secret add --image=sh4d1/drone-kubernetes -repository <your repo> -name KUBERNETES_TOKEN -value <your token>
```

# How to get values of `KUBERNETES_CERT` and `KUBERNETES_TOKEN`

List secrets of `default` namespace

```
$ kubectl get -n <namespace of secret> default secret
```

Show the `ca.crt` and `token` from secret

```
$ kubectl get secret -n <namespace of secret> <name of your drone secret> -o yaml | egrep 'ca.crt:|token:'
```

You can copy/paste the encoded certificate to the `KUBERNETES_CERT` value.
For the `KUBERNETES_TOKEN`, you need to decode it:

- `echo "<encoded token>" | base64 -d`
- `kubectl describe secret -n <your namespace> <drone secret name> | grep 'token:'`
