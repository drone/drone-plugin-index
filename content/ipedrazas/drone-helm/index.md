---
date: 2017-02-08T00:00:00+00:00
title: Helm
author: ipedrazas
tags: [ kubernetes, docker, helm ]
repo: ipedrazas/drone-helm
logo: kubernetes.svg
image: ipedrazas/drone-helm
---

This plugin allows you to run Kubernetes Helm as part of your pipeline.

```nohighlight
helm init
helm upgrade --install RELEASE CHART
```

The plugin initialises helm first, then it issues the install/upgrade command. There are a few settings that
map to the equivalent `helm` command.

Basic example:

```yaml
pipeline:
    helm_deploy:
        image: quay.io/ipedrazas/drone-helm
        skip_tls_verify: true
        chart: ./charts/my-chart
        release: ${DRONE_BRANCH}
        values: secret.password=${SECRET_PASSWORD},image.tag=${TAG}
        prefix: STAGING
        namespace: development
```

This block will execute the following command:

```
helm upgrade --install ${DRONE_BRANCH} ./charts/my-chart --namespace development --set secret.password=${SECRET_PASSWORD},image.tag=${TAG}
```

The plugin expects two secrets defined to connect to the kubernetes cluster:

```
drone secret add --image=quay.io/ipedrazas/drone-helm \
        your-user/your-repo STAGING_API_SERVER https://mykubernetesapiserver

drone secret add --image=quay.io/ipedrazas/drone-helm \
        your-user/your-repo STAGING_KUBERNETES_TOKEN eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJ...
```

There are a few parameters that will help you to manage your deployment the way you want, like enabling debug output or specifying the namespace where you want to initiaise tiller.

```diff
pipeline:
    helm_deploy:
        image: quay.io/ipedrazas/drone-helm
+       skip_tls_verify: true
        chart: ./charts/my-chart
        release: ${DRONE_BRANCH}
+       values: secret.password=${SECRET_PASSWORD},image.tag=${TAG}
+       prefix: STAGING
+       namespace: development
+       debug: true
+       tiller_ns: system
```

# Parameter Reference

namespace
: namespace where you want to install your chart. If you don't specify this parameter, `default` namespace will be used.

chart
: chart that you want to install

release
: name used in the helm command to specify the release. If you don't specify the release, helm will generate a random name and you will not be able to upgrade that release.

values
: values injected in helm command. These are the values you want to overwrite.

prefix
: defines the prefix of all the secrets used in the plugin. If prefix is `DEV` and your secret should be named `DEV_PASSWORD` and the values would be `${PASSWORD}`. If `prefix` is `PROD` the secret should be defined as `PROD_PASSWORD`. This allows you to define different secrets for different

tiller_ns
: namespace where `tiller` will be installed. By default, `tiller` is installed in `kube-system`

debug
: very verbose output. it will display all the ENVVARS passed to the container. Very handy when debugging secrets.

skip_tls_verify
: if you create your own SSL certificates, youi will need this flag to be true to avoid having connectivity issues.

# Secret Reference

There are a few secrets that the plugin expects to be able to connect to a kubernetes cluster

: API_SERVER url to connect to the Kubernetes api server

: KUBERNETES_TOKEN Kubernetes token used to connect to the api server.
