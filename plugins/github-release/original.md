---
date: 2016-01-01T00:00:00+00:00
title: Github Release
author: drone-plugins
tags: [ publish, github ]
logo: github.svg
repo: drone-plugins/drone-github-release
image: plugins/github-release
---

The github-release plugin is used to publish files and artifacts to GitHub Release.

The following configuration uses the github-release plugin to publish binaries to Github Release:

```yaml
kind: pipeline
name: default

steps:
- name: publish
  image: plugins/github-release
  settings:
    api_key: xxxxxxxx
    files: dist/*
  when:
    event: tag
```

An example for generating checksums and uploading additional files:

```yaml
steps:
- name: publish
  image: plugins/github-release
  settings:
    api_key: xxxxxxxx
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
- name: publish
  image: plugins/github-release
  settings:
    api_key: xxxxxxxx
    files:
      - dist/*
    title: 0.0.1
    note: CHANGELOG.md
  when:
    event: tag
```

Example configuration using credentials from named secrets:

```yaml
kind: pipeline
name: default

steps:
- name: publish
  image: plugins/github-release
  settings:
    api_key:
      from_secret: github_token
    files: dist/*
  when:
    event: tag
```

# Parameter Reference

api_key
: GitHub oauth token with public_repo or repo permission. If you create your token,
ensure you select the correct scope. For private repositories you have to select `repo`
while public repositories only requires `public_repo`. You can read more about creating a
personal access token [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).

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

note
: file or string with notes for the release

title
: file or string for the title shown in the gitea release

base_url
: GitHub base URL, only required for GHE

upload_url
: GitHub upload URL, only required for GHE

overwrite
: force overwrite existing release informations (only title and note)