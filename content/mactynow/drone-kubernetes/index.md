---
date: 2017-01-31T00:00:00+00:00
title: Drone-Kubernetes
author: mactynow
tags: [ kubernetes, docker ]
repo: honestbee/drone-kubernetes
logo: kubernetes.svg
image: quay.io/honestbee/drone-kubernetes
---

This plugin is a wrapper around kubectl to upgrade a Kubernetes deployment with a new version of the running container, like:

```nohighlight
kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1
```

{{% alert %}}
Please ensure the deployment is already created. This plugin will not automatically create the deployment and will error if it does not exist.
{{% /alert %}}

## Usage

This pipeline will update the `my-deployment` deployment with the image tagged `DRONE_COMMIT_SHA:8`

    pipeline:
        deploy:
            image: quay.io/honestbee/drone-kubernetes
            deployment: my-deployment
            repo: myorg/myrepo
            container: my-container
            tag: mytag

Deploying containers across several deployments, eg in a scheduler-worker setup. Make sure your container `name` in your manifest is the same for each pod.

    pipeline:
        deploy:
            image: quay.io/honestbee/drone-kubernetes
            deployment: [server-deploy, worker-deploy]
            repo: myorg/myrepo
            container: my-container
            tag: mytag

Deploying multiple containers within the same deployment.

    pipeline:
        deploy:
            image: quay.io/honestbee/drone-kubernetes
            deployment: my-deployment
            repo: myorg/myrepo
            container: [container1, container2]
            tag: mytag

**NOTE**: Combining multi container deployments across multiple deployments is not recommended

This more complex example demonstrates how to deploy to several environments based on the branch, in a `app` namespace

    pipeline:
        deploy-staging:
            image: quay.io/honestbee/drone-kubernetes
            kubernetes_server: https://kubernetes.company.org
            kubernetes_token: CXHVLJSDKJFS...
            deployment: my-deployment
            repo: myorg/myrepo
            container: my-container
            namespace: app
            tag: mytag
            when:
                branch: [ staging ]

        deploy-prod:
            image: quay.io/honestbee/drone-kubernetes
            kubernetes_server: https://kubernetes.company.org
            kubernetes_token: CXHVLJSDKJFS...
            deployment: my-deployment
            repo: myorg/myrepo
            container: my-container
            namespace: app
            tag: mytag
            when:
                branch: [ master ]

## Secrets

Do not include sensitive information in your `.drone.yml`. Instead, define them as secret and access them as environment variables.

## Parameter reference 

`container`
Container name (setup with the `name` option in the kubernetes manifest).

`deployment`
Deployment name.

`kubernetes_server`
Kubernetes API server URL.

`kubernetes_token`
Kubernetes service account token.

`namespace`
Kubernetes namespace.

`repo`
Image to update full name (with registry path).

`tag`
Image tag.

### Special thanks

Inspired by [drone-helm](https://github.com/ipedrazas/drone-helm).
