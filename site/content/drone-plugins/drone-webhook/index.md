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
steps:
- name: send
  image: plugins/webhook
  settings:
    urls: https://your.webhook/...
```

Example configuration with multiple URLs:

```yaml
steps:
- name: send
  image: plugins/webhook
  settings:
    urls:
      - https://your.webhook/...
      - https://your.other.webhook/...
```

Example configuration with Basic Authentication:

```yaml
steps:
- name: send
  image: plugins/webhook
  settings:
    username: myusername
    password: mypassword
    urls: https://your.webhook/...
```

Example configuration using secrets:
(Note: tokens can be passed as passwords like this)

```yaml
steps:
- name: send
  image: plugins/webhook
  settings:
    username:
      from_secret: myusername
    password:
      from_secret: mypassword
    urls: https://your.webhook/...
```

Example configuration with custom body:

```yaml
steps:
- name: send
  image: plugins/webhook
  settings:
    username: myusername
    password: mypassword
    urls: https://your.webhook/...
    content_type: application/json
    template: |
      {
        "owner": "{{ repo.owner }}",
        "repo": "{{ repo.name }}",
        "status": "{{ build.status }}",
      }
```

Example configuration to debug response:

```yaml
steps:
- name: send
  image: plugins/webhook
  settings:
    username: myusername
    password: mypassword
    urls: https://your.webhook/...
    debug: true
```

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
: Content type, defaults to application/json

template
: Custom template for webhook

headers
: Map of custom headers

skip_verify
: Skip SSL verification

debug
: Enable debug information
