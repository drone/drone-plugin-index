---
author: "drillster"
date: 2016-12-15T15:57:35-05:00
image: "drillster/drone-volume-cache"
repo: "drillster/drone-volume-cache"
logo: volume_cache.svg
tags:
- "cache"
title: Volume Cache
---

{{% alert error %}}
This plugin requires Volume configuration. This means your repository Trusted flag must be enabled. This should not be enabled in untrusted environments.
{{% /alert %}}

The volume cache plugin can be used to preserve files and directories between builds. The below pipeline configuration demonstrates simple usage.

```yaml
pipeline:
  restore-cache:
    image: drillster/drone-volume-cache
    restore: true
    mount:
      - ./node_modules
    volumes:
      - /tmp/cache:/cache

  build:
    image: node
    commands:
      - npm install

  rebuild-cache:
    image: drillster/drone-volume-cache
    rebuild: true
    mount:
      - ./node_modules
    volumes:
      - /tmp/cache:/cache
```

The mount attribute defines a list of files or directories that should be cached and restored.

{{% alert warn %}}
The cached files or directories must be located in your build workspace. It is not possible to cache files outside of your build workspace.
{{% /alert %}}

```diff
pipeline:
  restore-cache:
    image: drillster/drone-volume-cache
    restore: true
+   mount:
+     - node_modules
    volumes:
      - /tmp/cache:/cache
```

The `rebuild` flag instructs the plugin to copy files from the build environment to the host machine. This should be declared at the end of your pipeline.

```diff
pipeline:
  rebuild-cache:
    image: drillster/drone-volume-cache
+   rebuild: true
    mount:
      - node_modules
    volumes:
      - /tmp/cache:/cache
```

The `restore` flag instructs the plugin to copy files from the host machine to your build environment. This should be declared at the beginning of your pipeline, before your build steps.

```diff
pipeline:
  restore-cache:
    image: drillster/drone-volume-cache
+   restore: true
    mount:
      - node_modules
    volumes:
      - /tmp/cache:/cache
```

The volume attribute defines the path on the host machine where the cache is stored. The host machine volume must be mounted into container path `/cache`.

```diff
pipeline:
  restore-cache:
    image: drillster/drone-volume-cache
    restore: true
    mount:
      - node_modules
+   volumes:
+     - /tmp/cache:/cache
```

# Parameter Reference

restore
: instruct plugin to restore cache, can be true or false

rebuild
: instruct plugin to rebuild cache, can be true or false

mount
: list of folders to cache
