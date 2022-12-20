---
version: '1.0.37'
date: 2022-31151T00:00:00+00:00
title: Kubevious
author: kubevious
tags: [ kubernetes, k8s, validation, inting, security, compliance, best practices, misconfigurations ]
logo: kubevious.svg
repo: https://github.com/kubevious/cli
image: kubevious/cli
---
 
The Kubevious plugin detects and prevents errors(typos, misconfigurations, conflicts, inconsistencies) and violations of best practices for Kubernetes applications and clusters.

Example pipeline configuration:

```yaml
kind: pipeline
name: default
steps:
- name: deploy
  image: kubevious/cli
  settings:
    helm_repo_url: https://charts.konghq.com
    helm_repo_name: kong
    helm_chart: kong
    helm_namespace: kong-system
    helm_include_crds: true
    helm_override: overrides/overrides-dev.yaml
    manifests: additional-manifests/
    crds: additional-crds/
    mocks: additional-mock-manifests/
    k8s_version: 1.20
    live_k8s: false
    ignore_unknown: false
    ignore_non_k8s: false
    detailed_output: false
    json_output: false
```