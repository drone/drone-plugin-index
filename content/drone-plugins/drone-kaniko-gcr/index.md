---
date: 2022-01-01T00:00:00+00:00
title: Kaniko GCR
author: drone-plugins
tags: [ publish, google, gcp, gcr, docker ]
logo: google_gcr.svg
repo: drone/drone-kaniko
image: plugins/kaniko-gcr
---

Drone kaniko plugin uses [Kaniko](https://github.com/GoogleContainerTools/kaniko) to build and publish images to the Google Container Registry. Kaniko does not require docker daemon to build images. Hence, it is idle for building images on kubernetes cluster. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: publish  
  image: plugins/kaniko-gcr
  settings:
    repo: project/foo
    registry: us.gcr.io/project-id
    tags: latest
    json_key:
      from_secret: google_credentials
```

Example configuration using a different GCR registry:

```yaml
steps:
- name: publish  
  image: plugins/kaniko-gcr
  settings:
    registry: gcr.io/project-id
    repo: project/foo
    tags: latest
    json_key:
      from_secret: google_credentials
```

Example configuration using inline credentials:

```yaml
steps:
- name: publish  
  image: plugins/kaniko-gcr
  settings:
    registry: gcr.io/project-id
    repo: project/foo
    tags: latest
    json_key: >
      {
        "type": "service_account",
        "project_id": "xxx",
        "private_key_id": "xxx",
        "private_key": "xxx",
        "client_email": "xxx",
        "client_id": "xxx",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "xxx"
      }
```

Example configuration using inline base64 encoded credentials:

```yaml
steps:
- name: publish  
  image: plugins/kaniko-gcr
  settings:
    registry: gcr.io/project-id
    repo: project/foo
    tags: latest
    json_key: ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAieHh4IiwKICAicHJpdmF0ZV9rZXlfaWQiOiAieHh4IiwKICAicHJpdmF0ZV9rZXkiOiAieHh4IiwKICAiY2xpZW50X2VtYWlsIjogInh4eCIsCiAgImNsaWVudF9pZCI6ICJ4eHgiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW4iLAogICJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIiwKICAiY2xpZW50X3g1MDlfY2VydF91cmwiOiAieHh4Igp9Cg==
```

# Parameter Reference

registry
: Registry url with value as `<gcp-region>.gcr.io/<project-id>`

json_key
: GCP credentials json key

repo
: repository name for the image

tags
: repository tag for the image

dockerfile
: dockerfile to be used, defaults to Dockerfile

context
: the context path to use, defaults to root of the git repo

[snapshot_mode](https://github.com/GoogleContainerTools/kaniko#--snapshotmode)
: mode used by kaniko to snapshot the filesystem. Use redo mode for faster builds 

no_push=false
: boolean if the docker image should be pushed at the end

[enable_cache](https://github.com/GoogleContainerTools/kaniko#--cache)=false
: boolean to opt into caching with kaniko

[cache_repo](https://github.com/GoogleContainerTools/kaniko#--cache-repo)
: remote docker repository that will be used to store cached layers. enable_cache needs to be set to use this flag

[cache_ttl](https://github.com/GoogleContainerTools/kaniko#--cache-ttl-duration)
: cache timeout in hours

[skip_tls_verify](https://github.com/GoogleContainerTools/kaniko#--skip-tls-verify)
: skips TLS certificate validation when pushing to a registry

target
: the build target to use, must be defined in the docker file

build_args
: pass custom arguments to docker build

auto_tag=false
: generate tag names automatically based on git branch and git tag

auto_tag_suffix
: generate tag names with this suffix

custom_labels
: additional k=v labels

[registry_mirrors](https://github.com/GoogleContainerTools/kaniko#--registry-mirror)
: use a mirror registry instead of pulling images directly from the central Hub

[platform](https://github.com/GoogleContainerTools/kaniko#--customPlatform)
: allows to build with another default platform than the host, similarly to docker build --platform

[verbosity](https://github.com/GoogleContainerTools/kaniko#--verbosity)
: Logging level with value as oneof `panic|fatal|error|warn|info|debug|trace` 