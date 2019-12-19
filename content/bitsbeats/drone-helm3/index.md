---
date: 2019-12-19T00:00:00+00:00
title: Helm3
author: foosinn
tags: [ helm, helm3, kubernetes ]
repo: bitsbeats/drone-helm3
logo: kubernetes.svg
image: bitsbeats/drone-helm3
---

The `drone-helm3` plugin can be used to run helm deployments with helm3. The below pipeline configuration demonstrates simple usage:

```yaml
steps:
  - name deploy
    image: bitsbeats/drone-helm3
    settings:
      kube_api_server: https://api.kube.example.com
      kube_token:
        from_secret: kube_token
      chart: ./helm/myapp
      release: myapp-staging
      wait: true
      force: true
```


# Parameter Reference

## Kubernetes

kube_skip
: skip creation of kubeconfig (**optional**, **default**:`false`)

kube_config
: path to kubeconfig (**optional**, **default**:`/root/.kube/config`)

kube_api_server
: kubernetes api server (**required**)

kube_token
: kubernetes token (**required**)

kube_certificate
: kubernetes http ca (**optional**)

kube_skip_tls
: disable kubernetes tls verify (**optional**, **default**:`false`)

## Helm

chart
: the helm chart to be deployed (**required**)

release
: helm release name (**required**)

namespace
: kubernets and helm namespace (**required**)

lint
: helm lint option (**optional**, **default**:`true`)

atomic
: helm atomic option (**optional**, **default**:`true`)

wait
: helm wait option (**optional**, **default**:`true`)

force
: helm force option (**optional**, **default**:`false`)

cleanup_on_fail
: helm cleanup option (**optional**, **default**:`false`)

dry_run
: helm dryrun option (**optional**, **default**:`false`)

helm_repos
: additonal helm repos (**optional**)

update_dependencies
: helm update dependencies option (**optional**, **default**:`false`)

values
: additional --set options (**optional**)

vaules_yaml
: additonal values files (**optional**)

## General

timeout
: timeout for helm command (**optional**, **default**:`15m`)
