---
date: 2018-04-23T00:00:00+00:00
title: Download
author: drone-plugins
tags: [ download, tarball, archive, retrieve ]
logo: download.svg
repo: drone-plugins/drone-download
image: plugins/download
---

Use the Download plugin to download archives required for your builds, it also integrates a secure way to inject basic authentication credentials and checking by md5 or sha256 checksums. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: download  
  image: plugins/download
  settings:
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
```

Example configuration with custom destination:

```yaml
kind: pipeline
name: default

steps:
- name: download  
  image: plugins/download
  settings:
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
    destination: drone_linux.tar.gz
```

Example configuration basic auth:

```yaml
steps:
- name: download  
  image: plugins/download
  settings:
    username: octocat
    password: password
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
```

Example configuration using a secret:

```yaml
steps:
- name: download  
  image: plugins/download
  settings:
    username:
     from_secret: username
    password:
      from_secret: password
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
```

Example configuration using MD5 checksum:

```yaml
steps:
- name: download  
  image: plugins/download
  settings:
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
    md5: a0524c59d5c45bf2e924465115836d37
```

Example configuration using SHA256 checksum:

```yaml
steps:
- name: download  
  image: plugins/download
  settings:
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
    sha256: a16f709bc5402727366ca91ba85bba07c0f084a33ce9ab7fe03b8093c4027314
```

# Parameter Reference

source
: Source URL for the download

destination
: Destination for the download

username
: Username for basic auth

password
: Password for basic auth

skip_verify
: Skip SSL verification

md5
: Checksum in MD5 format

sha256
: Checksum in SHA256 format
