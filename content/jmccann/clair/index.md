---
date: 2017-02-09T00:00:00+00:00
title: Clair
author: jmccann
tags: [ docker, security ]
repo: jmccann/drone-clair
logo: clair.svg
image: jmccann/drone-clair
---

The Clair plugin submits your docker image to your [Clair](https://github.com/coreos/clair)
server to scan your docker image for security vulnerabilities.

The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  clair:
    image: jmccann/drone-clair:1
    url: http://clair.company.com
    username: johndoe
    password: mysecret
    scan_image: python:2.7
```

To verify https/ssl connections with a different CA certificate use `ca_cert`

```diff
pipeline:
  clair:
    image: jmccann/drone-clair:1
    url: http://clair.company.com
    username: johndoe
    password: mysecret
    scan_image: python:2.7
+   ca_cert: |
+     -----BEGIN CERTIFICATE-----
+     MII...
+     -----END CERTIFICATE-----
```

# Secrets

The Clair plugin supports reading credentials from the Drone secret store. This is strongly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  clair:
    image: jmccann/drone-clair:1
    url: http://clair.company.com
-   username: johndoe
-   password: mysecret
    scan_image: python:2.7
```

The above `username` and `password` Yaml attributes can be replaced with the `DOCKER_USERNAME` and `DOCKER_PASSWORD` secret environment variables.
Please see the Drone [documentation]({{< secret-link >}}) to learn more about secrets.

# Secret Reference

DOCKER_USERNAME
: paired with `username` - The username to authenticate to the docker registry with

DOCKER_PASSWORD
: paired with `password` - The password to authenticate to the docker registry with

CLAIR_URL
: paired with `url` - Clair server URL

CLAIR_CA_CERT
: paired with `ca_cert` - The CA Cert to verify https with

# Parameter Reference

url
: Clair server URL

username
: Docker Registry username to download the `scan_image` from

password
: Docker Registry password to download the `scan_image` from

scan_image
: The docker image to scan.  Supports Docker Hub or private repos.

ca_cert
: The CA Cert to verify https with
