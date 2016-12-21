---
date: 2016-01-01T00:00:00+00:00
title: Drone-Kube
author: vallard
tags: [ kubernetes, docker ]
repo: vallard/drone-kube
logo: kubernetes.svg
image: vallard/drone-kube
---

This drone kubernetes plugin does the equivalent of:

```nohighlight
kubectl apply -f deployment.yaml
```

{{% alert %}}
It is assumed the deployment is already created as it simply runs an update.  No error checking is there to see if it exists yet, so make sure it already exists.
{{% /alert %}}

The advantages of this plugin is that the ```deployment.yaml``` file can be a template file.  We are able to substitute values like ```{{ build.number }}``` inside the file so you can update docker image names.

Basic example:

```yaml
pipeline:
  deploy:
     image: vallard/drone-kube
     template: deployment.yaml
```

Example configuration with non-default namespace:

```diff
pipeline:
  kube:
    image: vallard/drone-kube
    template: deployment.yaml
+   namespace: mynamespace
```

You can also specify the server in the configuration as well.  It could alternatively be specified as an environment variable as shown in the next section.

```diff
pipeline:
  kubernetes:
    image: vallard/drone-kube
    template: deployment.yaml
+   namespace: mynamespace
+   server: https://10.93.234.28:6433
```

# Secrets

The kube plugin supports reading credentials from the Drone secret store.  This is strongly recommended instead of storing credentials in the pipeline configuration in plain text. The following secrets should be set:

__KUBE_TOKEN__
: this plugin has one authentication method and that is to use the token to authorize the user.

__KUBE_CA__
: This should be the base64 encoding of your certificate authority.  You can get this string by running the command:  

```nohighlight
export KUBE_CA=$(cat ca.pem | base64)
```

__KUBE_SERVER__
: This is the server url for your kubernetes cluster.  e.g: `https://10.99.2.1:6443`


# Template Reference

You can substitute the following values between ```{{ }}``` in your deployment template

repo.owner
: repository owner

repo.name
: repository name

build.status
: build status type enumeration, either `success` or `failure`

build.event
: build event type enumeration, one of `push`, `pull_request`, `tag`, `deployment`

build.number
: build number

build.commit
: git sha for current commit

build.branch
: git branch for current commit

build.tag
: git tag for current commit

build.ref
: git ref for current commit

build.author
: git author for current commit

build.link
: link the the build results in drone

build.created
: unix timestamp for build creation

build.started
: unix timestamp for build started

# Template Function Reference

uppercasefirst
: converts the first letter of a string to uppercase

uppercase
: converts a string to uppercase

lowercase
: converts a string to lowercase. Example `{{lowercase build.author}}`

datetime
: converts a unix timestamp to a date time string. Example `{{datetime build.started}}`

success
: returns true if the build is successful

failure
: returns true if the build is failed

truncate
: returns a truncated string to n characters. Example `{{truncate build.sha 8}}`

urlencode
: returns a url encoded string

since
: returns a duration string between now and the given timestamp. Example `{{since build.started}}`
