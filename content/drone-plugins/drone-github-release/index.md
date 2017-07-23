---
date: 2016-01-01T00:00:00+00:00
title: Github Release
author: drone-plugins
tags: [ publish, github ]
repo: drone-plugins/drone-github-release
logo: github.svg
image: plugins/github-release
---

The github-release plugin is used to publish files and artifacts to GitHub Release.

The following configuration uses the github-release plugin to publish binaries to Github Release:

```yaml
pipeline:
  github_release:
    image: plugins/github-release
    api_key: xxxxxxxx
    files: dist/*
    when:
      event: tag
```

An example for generating checksums and uploading additional files:

```diff
pipeline:
  github_release:
    image: plugins/github-release
    api_key: xxxxxxxx
    files:
      - dist/*
+     - bin/binary.exe
+  checksum:
+     - md5
+     - sha1
+     - sha256
+     - sha512
+     - adler32
+     - crc32
    when:
      event: tag
```

Example configuration using credentials from secrets:

```diff
pipeline:
  github_release:
    image: plugins/github-release
-   api_key: xxxxxxxx
+   secrets: [ github_token ]
    files: dist/*
    when:
      event: tag
```
# Secret Reference

github_token
: GitHub oauth token with public_repo or repo permission

# Parameter Reference

api_key
: GitHub oauth token with public_repo or repo permission

files
: files to upload to GitHub Release, globs are allowed

file_exists
: what to do if an file asset already exists, supported values: overwrite (default), skip and fail

checksum
: checksum takes hash methods to include in your GitHub release for the files specified.
Supported hash methods include: md5, sha1, sha256, sha512, adler32, and crc32.

draft
: create a draft release if set to true

prerelease
: set the release as prerelease if set to true

base_url
: GitHub base URL, only required for GHE

upload_url
: GitHub upload URL, only required for GHE
