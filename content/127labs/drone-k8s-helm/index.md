---
date: 2017-06-10T00:00:00+00:00
title: Kubernetes Helm
author: 127labs
tags: [ kubernetes, helm, docker ]
repo: 127labs/drone-k8s-helm
logo: helm.svg
image: 127labs/drone-k8s-helm
---

This Kubernetes plugin can be included into your pipelines to allow deployment with Helm.

Example configuration:

```yaml
pipeline:
  ship:
    image: 127labs/drone-k8s-helm
    chart: stable/dokuwiki
    master: https://127.0.0.1:8001
    token: super-long-token
    release: wiki
    skip_tls: true
    clean_before_release: true
    values:
      dokuwikiEmail: $${DOKUWIKI_EMAIL}
      dokuwikiPassword: $${DOKUWIKI_PASSWORD}
    secrets: [dokuwiki_email, dokuwiki_password]
```

# Secret Reference

Values are capable of accessing secrets by interpolating them with the `$${SECRET}` syntax. The plugin will
automatically access the values set in secrets.

# Parameter Reference

chart
: kubernetes chart

master
: kubernetes master server IP

token
: drone secret token

release
: helm release name

skip_tls
: sets the `insecure-skip-tls-verify` value

clean_before_release
: allows helm to clean up before deploying a release
