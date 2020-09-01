---
date: 2020-09-01T00:00:00+00:00
title: Kubernetes
author: jlehtimaki
tags: [ kubernetes, deployment, eks, baremetal ]
repo: jlehtimaki/drone-kubernetes
logo: kubernetes.svg
image: jlehtimaki/drone-kubernetes
---

# drone-kubernetes
Drone plugin for different Kubernetes deployments. 
This plugin enables easy deployments to do Kubernetes in your EKS clusters and Baremetal clusters.

# Supported types of Kubernetes
| Architecture  | Type      | Kustomize | Other notes   |
| ------------  |:----:     |:---------:|:-----------:  |
| AMD64         | EKS       | Yes       | --            |
| ARMv8         | EKS       | No        | --            |
| AMD64         | Baremetal | Yes       | --            |
| ARMv8         | Baremetal | No        | Can use just plain kubectl commands due to ARM restrictions, will be fixed in the future| 

# Parameters
| Paramenter            | Description                   |Required       | Default Value | Allowed Values |
| -------------         |:-------------:                |:-------------:|:-------------:|:-------------: |
| AWS_ACCESS_KEY        | AWS Access key                | YES           | -             | -              |
| AWS_SECRET_KEY        | AWS Access key secret         | YES           | -             | -              |
| AWS_REGION            | AWS Region                    | NO            | eu-west-1     | -              |
| PLUGIN_ASSUME_ROLE    | AWS Assume role               | NO            | -             | Role ARN       |
| PLUGIN_ACTIONS        | AWS Client command to be run  | YES           | test          | apply/delete/diff|
| PLUGIN_KUBECTL_VERSION| Kubectl version to be installed| NO           | v1.8.3        | -              |
| PLUGIN_NAMESPACE      | Kubernetes namespace          | NO            | default       | -              |
| PLUGIN_CLUSTER_NAME   | EKS Cluster name              | NO            | EKS-Cluster   | -              |
| PLUGIN_MANIFEST_DIR   | Directory holding the manifests| NO           | ./            | -              |
| PLUGIN_KUSTOMIZE      | Use Kustomize                 | NO            | false         | true / false   |
| PLUGIN_VERSION        | Version to deploy             | NO            | -             | -              |
| PLUGIN_IMAGE          | Image name of the deployment. Used with Kustomize | NO | -    | -              |
| PLUGIN_TYPE           | Type of Kubernetes deployment | NO            | Baremetal     | EKS / Baremetal|
| PLUGIN_TOKEN          | Kubernetes authentication token| NO           | -             | -              |
| PLUGIN_CA             | Kubernetes CA certificate     | NO            | -             | -              |
| PLUGIN_K8S_SERVER     | Kubernetes server address     | NO            | -             | -              |
| PLUGIN_K8S_USER       | Kubernetes authentication username | NO       | default       | -              |

# Examples
## Drone pipeline with AWS
```yaml
kind: pipeline
type: kubernetes
name: Drone example pipeline

steps:
  - name: Deploy test app
    image: lehtux/drone-kubernetes
    environment:
      AWS_REGION: "eu-west-1"
      AWS_ACCESS_KEY_ID:
        from_secret: access_key
      AWS_SECRET_ACCESS_KEY:
        from_secret: access_key_secret
    settings:
      type: EKS
      assume_role: arn:aws:iam::xxxxxx:role/EKS
      actions: ["apply"]
      namespace: default
      kubectl_version: v1.18.3
      manifest_dir: deployments/deployment.yml

```

## Drone pipeline with Baremetal
```yaml
kind: pipeline
type: kubernetes
name: Drone example pipeline

steps:
  - name: Deploy test app
    image: lehtux/drone-kubernetes
    settings:
      type: Baremetal
      token:
        from_secret: token
      ca:
        from_secret: ca
      k8s_server: https://1.2.3.4:6666
      k8s_user: kubernetes-admin
      actions: ["apply"]
      namespace: default
      kubectl_version: v1.18.3
      manifest_dir: deployments/deployment.yml
```