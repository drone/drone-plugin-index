---
date: 2020-22-10T00:00:00+00:00
title: Dron8s 
author: bh90210
tags: [ kubernetes, apply ]
repo: bh90210/dron8s
logo: kubernetes.svg
image: bh90210/dron8s
---
Yet another Kubernetes plugin for Drone using [dynamic](https://pkg.go.dev/k8s.io/client-go@v0.19.2/dynamic) [Server Side Apply](https://kubernetes.io/docs/reference/using-api/api-concepts/#server-side-apply) to achieve `kubectl apply -f multi-configs.yaml` parity for your CI-CD pipelines.

For extented documentation please check the [github repository](https://github.com/bh90210/dron8s).

Example configuration using in-cluster Kubernetes Runner:
```yaml
kind: pipeline
type: kubernetes
name: dron8s-in-cluster-example

steps:
- name: dron8s
  image: ghcr.io/bh90210/dron8s:latest
  settings:
    yaml: ./config.yaml
```

Before use you need to manually create a `clusterrolebinding` resource [to allow cluster edit access](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) for Drone.

Assuming you installed Drone/Kubernetes Runner using [Drone provided Helm charts](https://github.com/drone/charts/tree/master/charts) run:
```bash
$ kubectl create clusterrolebinding dron8s --clusterrole=edit --serviceaccount=drone:default --namespace=drone
```
<br />

Example configuration using out-of-cluster Docker Runner with secret:
```yaml
kind: pipeline
type: docker
name: dron8s-out-of-cluster-example

steps:
- name: dron8s
  image: ghcr.io/bh90210/dron8s:latest
  settings:
    yaml: ./config.yaml
    kubeconfig:
        from_secret: kubeconfig
```

Example configuration using in-cluster Kubernetes Runner with variables:
```yaml
kind: pipeline
type: kubernetes
name: dron8s-in-cluster-example

steps:
- name: dron8s
  image: ghcr.io/bh90210/dron8s:latest
  settings:
    yaml: ./config.yaml
    # variables. Must be lowercase, Usage: {{.service_name}}
    service_name: myservice
```
And in your Kuebernetes config:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: {{.service_name}}
spec:
...
```

# Parameter Reference

yaml
: Yaml containing configs (required).

kubeconfig
: Needed for out-of-cluster use. If not present plugin will default to in-cluster configuration. You can find kubeconfig under `~/.kube/config`.
