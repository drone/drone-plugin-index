---
date: 2016-01-01T00:00:00+00:00
title: UPX
author: cnbattle
tags: [ "upx" ]
repo: "cnbattle/drone-upx"
logo: "drone.svg"
image: "cnbattle/drone-upx"
---

The Drone Upx can be used to packer for eXecutables. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: drone-upx
    image: cnbattle/drone-upx
    settings:
      save_file: ./executable_upx_file
      original_file: ./executable_original_file
```

Compression level:

```diff
steps:
- name: drone-upx
    image: cnbattle/drone-upx
    settings:
      save_file: ./executable_upx_file
      original_file: ./executable_original_file
+     level: 9
```

# Parameter Reference

level
: Compression level, 1-9,The bigger the better.

original_file
: Original documents to be processed.

save_file
: Processed files
