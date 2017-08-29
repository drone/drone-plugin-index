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
The GCR plugin is an extension around the Docker plugin. Please see the documentation for the Docker plugin for other configuration options.
{{% /alert %}}

The GCR plugin can be used to build and publish images to the Google Container Registry. The following pipeline configuration uses the GCR plugin to build and publish Docker images:

```yaml
pipeline:
  gcr:
    image: plugins/gcr
    repo: project/foo
    tags: latest
    secrets: [json_key]
```

Example configuration using a different GCR registry:

```diff
pipeline:
  gcr:
    image: plugins/gcr
+   registry: us.gcr.io
    repo: project/foo
    tags: latest
    secrets: [json_key]
```

Example configuration using inline credentials:

```diff
pipeline:
  gcr:
    image: plugins/gcr
    repo: project/foo
    tags: latest
-   secrets: [json_key]
+   password: >
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

# Secret Reference

plugin_json_key, gcr_json_key, google_credentials, google_application_credentials
: authenticates with this service account JSON credential
