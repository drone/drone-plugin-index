---
version: 2023.2
date: 2023-08-03T00:00:00+00:00
title: Qodana JVM Community Drone plugin
author: 2martens
tags: [ Qodana, Analysis, report ]
repo: 2martens/qodana-jvm-community-drone-plugin
image: plugins/pypi
---

This plugin allows you to run the Qodana JVM Community linter in Drone and publish the results
to Qodana Cloud. The Community license is enough.

Basic example:

```yaml
steps:
- name: code-analysis
  image: 2martens/qodana-jvm-community-drone-plugin
  settings:
    qodana_token: yourSecretTokenFromQodanaCloud
    args: 
```

You can also specify a baseline that should be taken into account:

```diff
steps:
- name: code-analysis
  image: 2martens/qodana-jvm-community-drone-plugin
  settings:
    qodana_token: yourSecretTokenFromQodanaCloud
-   args: 
+   args: --baseline qodana.sarif.json
```

You can also specify a failure threshold that should be taken into account:

```diff
steps:
- name: code-analysis
  image: 2martens/qodana-jvm-community-drone-plugin
  settings:
    qodana_token: yourSecretTokenFromQodanaCloud
-   args: 
+   args: --failure-threshold anyPositiveNumberOrZero
```

The plugin supports any arguments that Qodana supports. For a full list of options, refer to the
official documentation: https://www.jetbrains.com/help/qodana/docker-image-configuration.html

Example configuration using token from secrets:

```diff
steps:
- name: code-analysis
  image: 2martens/qodana-jvm-community-drone-plugin
  settings:
-   qodana_token: yourSecretTokenFromQodanaCloud
+   qodana_token:
+     from_secret: qodana_token 
    args:
```

# Parameter Reference

qodana_token
: Qodana token used to publish analysis results to Qodana cloud.

args
: Arguments passed to Qodana command. For example --baseline or --failure-threshold
