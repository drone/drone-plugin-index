---
date: 2018-07-28T00:00:00+00:00
title: Packer
author: appleboy
tags: [ packer, hashicorp ]
logo: packer.svg
repo: appleboy/drone-packer
image: appleboy/drone-packer
---

This plugin can build automated machine images with [Packer](https://www.packer.io/). The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  packer:
    image: appleboy/drone-packer
    template: aws.json
    actions: build
```

To validate template file before building the machine images

```diff
pipeline:
  packer:
    image: appleboy/drone-packer
    template: aws.json
-   actions: build
+   actions:
+     - validate
+     - build
```

A map of variables to pass to the Packer `build` commands. Each value is passed as a `<key>=<value>` option

```diff
pipeline:
  packer:
    image: appleboy/drone-packer
    template: aws.json
    actions: build
+   vars:
+     aws_region: ap-southeast-1
+     app_version: 1.0.0
```

A list of var files to use. Each value is passed as -var-file=<value>:

```diff
pipeline:
  packer:
    image: appleboy/drone-packer
    template: aws.json
    actions: build
+   var_files:
+     - foo.json
+     - bar.json
```

validate or build all builds other than these

```diff
pipeline:
  packer:
    image: appleboy/drone-packer
    template: aws.json
    actions: build
+   except:
+     - foo
+     - bar
```

validate or build only the specified builds

```diff
pipeline:
  packer:
    image: appleboy/drone-packer
    template: aws.json
    actions: build
+   only:
+     - foo
+     - bar
```

# Parameter Reference

actions
: a list of actions to have packer perform

vars
: a map of variables to pass to the Packer `build` commands. Each value is passed as a `<key>=<value>` option

var_files
: a list of var files to use. Each value is passed as -var-file=<value>

except
: validate or build all builds other than these

only
: validate or build only the specified builds

template
: A json file will execute multiple builds in parallel as defined in the template

syntax_only
: Only check syntax. Do not verify config of the template, defaults to `false`

color
: Disable color output (on by default), defaults to `false`

debug
: Debug mode enabled for builds, defaults to `false`

parallel
: Disable parallelization (on by default), defaults to `false`

force
: Force a build to continue if artifacts exist, deletes existing artifacts, defaults to `false`

readable
: Machine-readable output, defaults to `false`
