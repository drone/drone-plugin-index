---
date: 2017-01-31T00:00:00+00:00
title: Drone-Kubernetes
author: mactynow
tags: [ kubernetes, docker ]
repo: honestbee/drone-kubernetes
logo: kubernetes.svg
image: quay.io/honestbee/drone-kubernetes
---

The Kubernetes plugin can be used to upgrade a Kubernetes deployment with a newer version of an image. This is equivalent to running the following kubectl command:

```nohighlight
kubectl set image deployment/nginx-deployment nginx=nginx:1.9.1
```

{{% alert %}}
Please ensure the deployment is already created. This plugin will not automatically create the deployment and will error if it does not exist.
{{% /alert %}}

Example pipeline configuration:

```yaml
pipeline:
  deploy:
    image: quay.io/honestbee/drone-kubernetes
    kubernetes_server: https://kubernetes.company.org
    kubernetes_token: CXHVLJSDKJFS...
    namespace: app
    deployment: my-deployment
    repo: myorg/myrepo
    container: my-container
    tag: mytag
```

Deploying containers across several deployments, eg in a scheduler-worker setup. Make sure your container `name` in your manifest is the same for each pod.

```diff
pipeline:
  deploy:
    image: quay.io/honestbee/drone-kubernetes
-   deployment: my-deployment
+   deployment: [ server-deploy, worker-deploy ]
    repo: myorg/myrepo
    container: my-container
    tag: mytag
```

Deploying multiple containers within the same deployment.

```diff
pipeline:
  deploy:
    image: quay.io/honestbee/drone-kubernetes
    deployment: my-deployment
    repo: myorg/myrepo
-   container: my-container
+   container: [ my-container-1, my-container-2 ]
    tag: mytag
```

# Parameter Reference

container
: Container name (setup with the `name` option in the kubernetes manifest).

deployment
: Deployment name.

kubernetes_server
: Kubernetes API server URL.

kubernetes_token
: Kubernetes service account token.

namespace
: Kubernetes namespace.

repo
: Image to update full name (with registry path).

tag
: Image tag.
