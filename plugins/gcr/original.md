---
date: 2016-01-01T00:00:00+00:00
title: Google Container Registry
author: drone-plugins
tags: [ publish, google, gcp, gcr, docker ]
logo: google_gcr.svg
repo: drone-plugins/drone-gcr
image: plugins/gcr
---

{{% alert info %}}
The GCR plugin is an extension around the Docker plugin. Please see the documentation for the [Docker plugin](/drone-plugins/drone-docker/) for other configuration options.
{{% /alert %}}

The GCR plugin can be used to build and publish images to the Google Container Registry. The following pipeline configuration uses the GCR plugin to build and publish Docker images:

```yaml
kind: pipeline
name: default

steps:
- name: publish  
  image: plugins/gcr
  settings:
    repo: project/foo
    tags: latest
    json_key:
      from_secret: google_credentials
```

Example configuration using a different GCR registry:

```yaml
steps:
- name: publish  
  image: plugins/gcr
  settings:
    registry: us.gcr.io
    repo: project/foo
    tags: latest
    json_key:
      from_secret: google_credentials
```

Example configuration using inline credentials:

```yaml
steps:
- name: publish  
  image: plugins/gcr
  settings:
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
  image: plugins/gcr
  settings:
    repo: project/foo
    tags: latest
    json_key: ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAieHh4IiwKICAicHJpdmF0ZV9rZXlfaWQiOiAieHh4IiwKICAicHJpdmF0ZV9rZXkiOiAieHh4IiwKICAiY2xpZW50X2VtYWlsIjogInh4eCIsCiAgImNsaWVudF9pZCI6ICJ4eHgiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW4iLAogICJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIiwKICAiY2xpZW50X3g1MDlfY2VydF91cmwiOiAieHh4Igp9Cg==
```

Example configuration using a workload identity:

```yaml
steps:
- name: publish  
  image: plugins/gcr
  settings:
    registry: us.gcr.io
    repo: project/foo
    tags: latest
    json_key:
      from_secret: google_credentials
    workload_identity: true
```
