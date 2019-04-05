---
version: '1.0'
date: 2016-12-15T15:57:35-05:00
title: Volume Cache
author: drillster
tags: [ cache ]
logo: volume_cache.svg
repo: drillster/drone-volume-cache
image: drillster/drone-volume-cache
---

{{% alert error %}}
This plugin requires Volume configuration. This means your repository Trusted flag must be enabled. This should not be enabled in untrusted environments.
{{% /alert %}}

The volume cache plugin can be used to preserve files and directories between builds. The below pipeline configuration demonstrates simple usage.

```yaml
kind: pipeline
name: default

steps:
- name: restore-cache
  image: drillster/drone-volume-cache
  volumes:
  - name: cache
    path: /cache
  settings:
    restore: true
    mount:
      - ./node_modules

- name: rebuild-cache
  image: drillster/drone-volume-cache
  volumes:
  - name: cache
    path: /cache
  settings:
    rebuild: true
    mount:
      - ./node_modules

volumes:
  - name: cache
    host: 
      path: /tmp/cache
```

The mount attribute defines a list of files or directories that should be cached and restored.

{{% alert warn %}}
The cached files or directories must be located in your build workspace. It is not possible to cache files outside of your build workspace.
{{% /alert %}}

```diff
  - name: restore-cache
    image: drillster/drone-volume-cache
    volumes:
    - name: cache
      path: /cache
    settings:
      restore: true
+     mount:
+      - ./node_modules
```

The `rebuild` flag instructs the plugin to copy files from the build environment to the host machine. This should be declared at the end of your pipeline.

```diff
  - name: rebuild-cache
    image: drillster/drone-volume-cache
    volumes:
    - name: cache
      path: /cache
    settings:
+     rebuild: true
      mount:
        - ./node_modules
```

The `restore` flag instructs the plugin to copy files from the host machine to your build environment. This should be declared at the beginning of your pipeline, before your build steps.

```diff
  - name: restore-cache
    image: drillster/drone-volume-cache
    volumes:
    - name: cache
      path: /cache
    settings:
+     restore: true
      mount:
        - ./node_modules
```

The volume attribute defines the path on the host machine where the cache is stored. The host machine volume must be mounted into container path `/cache`.

```diff
  - name: restore-cache
    image: drillster/drone-volume-cache
+   volumes:
+   - name: cache
      path: /cache
    settings:
      restore: true
      mount:
        - ./node_modules
```

# Parameter Reference

restore
: instruct plugin to restore cache, can be true or false

rebuild
: instruct plugin to rebuild cache, can be true or false

mount
: list of folders or files to cache

# Additional Functionality

The volume cache plugin reacts to special directives in a commit message to provide additional functionality.
Include one of the following directives somewhere in your commit message to trigger their respective actions:

[CLEAR CACHE]
: instruct the plugin to clear the entire cache. This only influences the restoring step, the plugin will still rebuild cache if instructed to do so.

[NO CACHE]
: instruct the plugin not to restore or rebuild cache for this build.

