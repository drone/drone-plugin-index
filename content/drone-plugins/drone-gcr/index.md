---
date: 2016-01-01T00:00:00+00:00
title: Google Container Registry
author: drone-plugins
tags: [ publish, docker, google ]
repo: drone-plugins/drone-gcr
logo: google_gcr.svg
image: plugins/gcr
---

{{% alert info %}}
The GCR plugin is an extension around the Docker plugin. Please see the documentation for the [Docker plugin]({{< relref "drone-plugins/drone-docker/index.md" >}}) for other configuration options.
{{% /alert %}}

The GCR plugin can be used to build and publish images to the Google Container Registry. The following pipeline configuration uses the GCR plugin to build and publish Docker images:

```yaml
pipeline:
  gcr:
    image: plugins/gcr
    repo: project/foo
    tags: latest
    secrets: [google_credentials]
```

Example configuration using a different GCR registry:

```diff
pipeline:
  gcr:
    image: plugins/gcr
+   registry: us.gcr.io
    repo: project/foo
    tags: latest
    secrets: [google_credentials]
```

Example configuration using inline credentials:

```diff
pipeline:
  gcr:
    image: plugins/gcr
    repo: project/foo
    tags: latest
-   secrets: [google_credentials]
+   json_key: >
+     {
+       "type": "service_account",
+       "project_id": "xxx",
+       "private_key_id": "xxx",
+       "private_key": "xxx",
+       "client_email": "xxx",
+       "client_id": "xxx",
+       "auth_uri": "https://accounts.google.com/o/oauth2/auth",
+       "token_uri": "https://accounts.google.com/o/oauth2/token",
+       "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
+       "client_x509_cert_url": "xxx"
+     }
```

Example configuration using inline base64 encoded credentials:

```diff
pipeline:
  gcr:
    image: plugins/gcr
    repo: project/foo
    tags: latest
-   secrets: [google_credentials]
+   json_key: ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAieHh4IiwKICAicHJpdmF0ZV9rZXlfaWQiOiAieHh4IiwKICAicHJpdmF0ZV9rZXkiOiAieHh4IiwKICAiY2xpZW50X2VtYWlsIjogInh4eCIsCiAgImNsaWVudF9pZCI6ICJ4eHgiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdG9rZW4iLAogICJhdXRoX3Byb3ZpZGVyX3g1MDlfY2VydF91cmwiOiAiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIiwKICAiY2xpZW50X3g1MDlfY2VydF91cmwiOiAieHh4Igp9Cg==
```

# Secret Reference

plugin_json_key, gcr_json_key, google_credentials, token
: authenticates with this GCP service account JSON credential, can be base64 encoded

plugin_registry
: GCP registry, defaults to `gcr.io`
