---
date: 2018-06-21T00:00:00+00:00
title: Codacy
author: drone-plugins
tags: [ coverage ]
logo: codacy.svg
repo: drone-plugins/drone-codacy
image: plugins/codacy
---

This plugin can upload coverage reports to [Codacy](https://www.codacy.com/), currently it's limited to Golang coverage reports. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  codacy:
    image: plugins/codacy
    token: your-codacy-token

```

Override the default pattern:

```diff
pipeline:
  codacy:
    image: plugins/codacy
    token: your-codacy-token
+   pattern: pkg/foo/bar/*.out
```

Example configuration using secrets:

```diff
pipeline:
  codacy:
    image: plugins/codacy
-   token: your-codacy-token
+   secrets: [ codacy_token ]
```

# Secret Reference

codacy_token
: Token for Codacy authentication

# Parameter Reference

token
: Token for Codacy authentication

pattern
: Coverage search pattern, defaults to `**/*.out`
