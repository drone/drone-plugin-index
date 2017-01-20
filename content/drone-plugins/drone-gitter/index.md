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
