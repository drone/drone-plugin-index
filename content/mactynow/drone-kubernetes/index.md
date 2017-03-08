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
            tag: ${DRONE_COMMIT_SHA:8}

Deploying containers across several deployments, eg in a scheduler-worker setup. Make sure your container `name` in your manifest is the same for each pod.

    pipeline:
        deploy:
            image: quay.io/honestbee/drone-kubernetes
            deployment: [server-deploy, worker-deploy]
            repo: myorg/myrepo
            container: my-container
            tag: ${DRONE_COMMIT_SHA:8}

Deploying multiple containers within the same deployment.

    pipeline:
        deploy:
            image: quay.io/honestbee/drone-kubernetes
            deployment: my-deployment
            repo: myorg/myrepo
            container: [container1, container2]
            tag: ${DRONE_COMMIT_SHA:8}

**NOTE**: Combining multi container deployments across multiple deployments is not recommended

This more complex example demonstrates how to deploy to several environments based on the branch, in a `app` namespace

    pipeline:
        deploy-staging:
            image: quay.io/honestbee/drone-kubernetes
            kubernetes_server: ${KUBERNETES_SERVER_STAGING}
            kubernetes_cert: ${KUBERNETES_CERT_STAGING}
            kubernetes_token: ${KUBERNETES_TOKEN_STAGING}
            deployment: my-deployment
            repo: myorg/myrepo
            container: my-container
            namespace: app
            tag: ${DRONE_COMMIT_SHA:8}
            when:
                branch: [ staging ]

        deploy-prod:
            image: quay.io/honestbee/drone-kubernetes
            kubernetes_server: ${KUBERNETES_SERVER_PROD}
            kubernetes_token: ${KUBERNETES_TOKEN_PROD}
            # notice: no tls verification will be done, warning will is printed
            deployment: my-deployment
            repo: myorg/myrepo
            container: my-container
            namespace: app
            tag: ${DRONE_COMMIT_SHA:8}
            when:
                branch: [ master ]

## Required secrets

    drone secret add --image=honestbee/drone-kubernetes \
        your-user/your-repo KUBERNETES_SERVER https://mykubernetesapiserver

    drone secret add --image=honestbee/drone-kubernetes \
        your-user/your-repo KUBERNETES_CERT <base64 encoded CA.crt>

    drone secret add --image=honestbee/drone-kubernetes \
        your-user/your-repo KUBERNETES_TOKEN eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJ...

When using TLS Verification, ensure Server Certificate used by kubernetes API server
is signed for SERVER url ( could be a reason for failures if using aliases of kubernetes cluster )

### Special thanks

Inspired by [drone-helm](https://github.com/ipedrazas/drone-helm).
