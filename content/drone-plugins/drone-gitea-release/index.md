---
date: 2018-04-08T00:00:00+00:00
title: Gitea Release
author: drone-plugins
tags: [ publish, gitea ]
logo: gitea.svg
repo: drone-plugins/drone-gitea-release
image: plugins/gitea-release
---

The gitea-release plugin is used to publish files and artifacts to Gitea Release.

The following configuration uses the gitea-release plugin to publish binaries to Gitea Release:

```yaml
kind: pipeline:
name: default

steps:
- name: gitea_release
  image: plugins/gitea-release
  settings:
    api_key: xxxxxxxx
    base_url: https://your.gitea.tld
    files: dist/*
    when:
      event: tag
```

An example for generating checksums and uploading additional files:

```yaml
steps:
- name: gitea_release
  image: plugins/gitea-release
  settings:
    api_key: xxxxxxxx
    base_url: https://your.gitea.tld
    files:
      - dist/*
      - bin/binary.exe
   checksum:
      - md5
      - sha1
      - sha256
      - sha512
      - adler32
      - crc32
    when:
      event: tag
```

Example with title and notes:

```yaml
steps:
- name: gitea_release
  image: plugins/gitea-release
  settings:
    api_key: xxxxxxxx
    base_url: https://your.gitea.tld
    files:
      - dist/*
    title: 0.0.1
    note: CHANGELOG.md
    when:
      event: tag
```


Example configuration using credentials from secrets:

```yaml
steps:
- name: gitea_release
  image: plugins/gitea-release
  settings:
    base_url: https://your.gitea.tld
    api_key:
      from_secret: gitea_token
    files: dist/*
    when:
      event: tag
```

# Parameter Reference

api_key
: Gitea application token

base_url
: Base URL of the Gitea instance

files
: files to upload to Gitea Release, globs are allowed

file_exists
: what to do if an file asset already exists, supported values: overwrite (default), skip and fail

checksum
: checksum takes hash methods to include in your Gitea release for the files specified.
Supported hash methods include: md5, sha1, sha256, sha512, adler32, and crc32.

draft
: create a draft release if set to true

prerelease
: set the release as prerelease if set to true

note:
: file or string with notes for the release

title
: file or string for the title shown in the gitea release

insecure
: visit base_url via insecure https protocol (default: false)
