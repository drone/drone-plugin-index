---
date: 2018-06-21T00:00:00+00:00
title: GPG Sign
author: drone-plugins
tags: [ artifact, gpg, sign ]
logo: gnupg.svg
repo: drone-plugins/drone-gpgsign
image: plugins/gpgsign
---

This plugin can sign your artifacts and build results with [GnuPG](https://www.gnupg.org/). The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: sign  
  image: plugins/gpgsign
  settings:
    key: your-base64-encoded-private-key
    passphrase: p455w0rd
    files:
      - dist/*
```

Exclude specific patterns:

```yaml
kind: pipeline
name: default

steps:
- name: sign  
  image: plugins/gpgsign
  settings:
    key: your-base64-encoded-private-key
    passphrase: p455w0rd
    files:
      - dist/*
    excludes:
      - dist/*.sha256
```

Generate detach-sign signature:

```yaml
kind: pipeline
name: default

steps:
- name: sign  
  image: plugins/gpgsign
  settings:
    key: your-base64-encoded-private-key
    passphrase: p455w0rd
    files:
      - dist/*
    detach_sign: true
```

Generate clear-sign signature:

```yaml
kind: pipeline
name: default

steps:
- name: sign  
  image: plugins/gpgsign
  settings:
    key: your-base64-encoded-private-key
    passphrase: p455w0rd
    files:
      - dist/*
    clear_sign: true
```

Example configuration using secrets:

```yaml
kind: pipeline
name: default

steps:
- name: sign  
  image: plugins/gpgsign
  settings:
    key:
      from_secret: your-base64-encoded-private-key
    passphrase:
      from_secret: your-passphrase
    files:
      - dist/*
```

# Parameter Reference

key
: Private GnuPG key, optionally base64 encoded

passphrase
: Passphrase to unlock private key

detach_sign
: Generate a detach-sign signature

clear_sign
: Generate a clear-sign signature

files, file
: List of globs to match files

excludes, exclude
: List of patterns to exclude files
