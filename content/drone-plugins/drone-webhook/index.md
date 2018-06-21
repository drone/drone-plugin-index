---
date: 2018-04-19T00:00:00+00:00
title: Webhook
author: drone-plugins
tags: [ notifications, trigger, webhook ]
logo: webhook.svg
repo: drone-plugins/drone-webhook
image: plugins/webhook
---

Use the Webhook plugin to notify services via Webhook when a build completes. You will need to supply Drone with outgoing Webhook URLs. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  webhook:
    image: plugins/webhook
    urls: https://your.webhook/...
```

Example configuration with multiple URLs:

```diff
pipeline:
  webhook:
    image: plugins/webhook
-   urls: https://your.webhook/...
+   urls:
+     - https://your.webhook/...
+     - https://your.other.webhook/...
```

Example configuration with Basic Authentication:

```diff
pipeline:
  webhook:
    image: plugins/webhook
    username: myusername
    password: mypassword
    urls: https://your.webhook/...
```

Example configuration using secrets:
(Note: tokens can be passed as passwords like this)

```diff
pipeline:
  webhook:
    image: plugins/webhook
+   secrets:
+     - source: my_token
+       target: webhook_password
    username: myusername
-   password: mypassword
    urls: https://your.webhook/...
```

Example configuration with custom body:

```diff
pipeline:
  webhook:
    image: plugins/webhook
    username: myusername
    password: mypassword
    urls: https://your.webhook/...
+   content_type: application/json
+   template: |
+     {
+       "owner": "{{ repo.owner }}",
+       "repo": "{{ repo.name }}",
+       "status": "{{ build.status }}",
+     }
```

Example configuration to debug response:

```diff
pipeline:
  webhook:
    image: plugins/webhook
    username: myusername
    password: mypassword
    urls: https://your.webhook/...
+   debug: true
```

# Secret Reference

webhook_urls
: Payload gets sent to this list of URLs

webhook_username
: Username for basic auth

webhook_password
: Password for basic auth

# Parameter Reference

urls
: Payload gets sent to this list of URLs

username
: Username for basic auth

password
: Password for basic auth

method
: HTTP submission method, defaults to POST

content_type
: Sontent type, defaults to application/json

template
: Custom template for webhook

headers
: Map of custom headers

skip_verify
: Skip SSL verification

debug
: Enable debug information
