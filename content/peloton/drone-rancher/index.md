---
date: 2016-01-13T00:00:00+00:00
title: Rancher
author: josmo
tags: [ publish, rancher ]
repo: josmo/drone-rancher
logo: rancher.svg
image: peloton/drone-rancher
---

The Docker plugin can be used to build and publish images to the Docker registry. The following pipeline configuration uses the Docker plugin to build and publish Docker images:

```yaml
pipeline:
  rancher:
    image: peloton/drone-rancher
    url: http://awesomehost:awesomeport
    access_key: superaccesskey
    secret_key: supersecretkey
    service: huh/service1
    docker_image: huh/hello
```

Example configuration with not starting the container first and confirming the upgrade with a longer timeout

```diff
pipeline:
  rancher:
    image: peloton/drone-rancher
    url: http://awesomehost:awesomeport
    access_key: superaccesskey
    secret_key: supersecretkey
    service: huh/service1
    docker_image: huh/hello
+   start_first: false
+   confirm: true
+   timeout: 180
```


# Secrets

The Rancher plugin supports reading credentials from the Drone secret store. This is strongly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  rancher:
    image: peloton/drone-rancher
-   access_key: test
-   secret_key: pa55word
    service: huh/service1
    docker_image: huh/hello
```

Use the command line utility to add secrets to the store:

```nohighlight
drone secret add --image=peloton/rancher \
    octocat/hello-world RANCHER_ACCESS_KEY kevinbacon

drone secret add --image=peloton/rancher \
    octocat/hello-world RANCHER_SECRET_KEY pa55word
```

Don't forget to sign the Yaml after making changes:

```nohighlight
drone sign octocat/hello-world
```

# Secret Reference

RANCHER_ACCESS_KEY
: rancher environment access key 

RANCHER_SECRET_KEY
: rancher environment secret key

# Parameter Reference

url
: rancher server host url

access_key
: rancher environment access key

secret_key
: rancher environment secret key

service
: rancher service on that environment to upgrade

start_first
: start new container before stopping old one, default to true

confirm
: auto confirm the service upgrade if successful, defaults to false

timeout
: the maximum wait time in seconds for the service to upgrade, default to 30

docker_image
: docker image to use to upgrade the environment


