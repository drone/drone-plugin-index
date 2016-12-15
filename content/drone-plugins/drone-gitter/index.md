---
date: 2016-01-01T00:00:00+00:00
title: Gitter
author: drone-plugins
tags: [ notifications, chat ]
repo: drone-plugins/drone-gitter
logo: gitter.svg
image: plugins/gitter
---

The Gitter plugin posts build events to your Gitter room's activity feed. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  gitter:
    image: plugins/gitter
    webhook: https://webhooks.gitter.im/e/a91e06797227ae5dbe6ec
```

Example configuration posting to multiple rooms:

```diff
pipeline:
  gitter:
    image: plugins/gitter
+   webhook:
+     - https://webhooks.gitter.im/e/a91e06797227ae5dbe6ec
+     - https://webhooks.gitter.im/e/a27a2e6ece5db91e06797
```

# Secrets

The Gitter plugin supports reading credentials from the Drone secret store. This is strongly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  gitter:
    image: plugins/gitter
-   webhook: https://webhooks.gitter.im/e/a91e06797227ae5dbe6ec
```

The webhook Yaml attribute can be replaced with the `GITTER_WEBHOOK` secret environment variable. Please see the Drone documentation to learn more about secrets.
