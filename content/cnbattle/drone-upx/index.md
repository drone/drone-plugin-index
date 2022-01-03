---
date: 2016-01-01T00:00:00+00:00
title: UPX
author: cnbattle
tags: [ "upx" ]
repo: "cnbattle/drone-upx"
logo: "upx.svg"
image: "cnbattle/drone-upx"
---

The UPX plugin can be used to pack executables. The below pipeline configuration demonstrates simple usage:

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
: Compression level, a value between 1 and 9, the bigger the better.

original_file
: An original file to be processed.

save_file
: Save the path and file name of the compressed file.
