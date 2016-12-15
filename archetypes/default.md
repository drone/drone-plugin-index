---
date: 2016-01-01T00:00:00+00:00
title: ""
author: ""
tags: [ "", "" ]
repo: ""
logo: ""
image: ""
url: ""
---

The PLUGIN_NAME can be used to DO_SOMETHING. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  replace_me:
    image: replace_me
    param1: replace_me
```

Example configuration using param2:

```diff
pipeline:
  replace_me:
    image: replace/me
+   param2: replaceme
```

Example configuration using param3:

```diff
pipeline:
  replace_me:
    image: replace/me
    param2: replace_me
+   param3: replace_me
```

# Secret Reference

FOO_SECRET1
: description of secret1

FOO_SECRET1
: description of secret2

FOO_SECRET3
: description of secret3

# Parameter Reference

param1
: description of param1 in yaml

param2
: description of param2 in yaml

param3
: description of param3 in yaml
