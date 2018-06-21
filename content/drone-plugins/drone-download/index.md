---
date: 2018-06-21T00:00:00+00:00
title: Download
author: drone-plugins
tags: [ artifact, download ]
logo: download.svg
repo: drone-plugins/drone-download
image: plugins/download
---

This plugin can be used to download files through HTTP or HTTPS including an optional checksum verification. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  gpgsign:
    image: plugins/download
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
    sha256: a16f709bc5402727366ca91ba85bba07c0f084a33ce9ab7fe03b8093c4027314
```

Use basic authentication for a download:

```diff
pipeline:
  gpgsign:
    image: plugins/download
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
    sha256: a16f709bc5402727366ca91ba85bba07c0f084a33ce9ab7fe03b8093c4027314
+   username: octocat
+   password: p455w0rd
```

Customize the resulting file:

```diff
pipeline:
  gpgsign:
    image: plugins/download
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
    sha256: a16f709bc5402727366ca91ba85bba07c0f084a33ce9ab7fe03b8093c4027314
+   destination: drone.tar.gz
```

Example configuration using secrets:

```diff
pipeline:
  gpgsign:
    image: plugins/download
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
    sha256: a16f709bc5402727366ca91ba85bba07c0f084a33ce9ab7fe03b8093c4027314
-   username: octocat
-   password: p455w0rd
+   secrets: [ download_username, download_password ]
```

# Secret Reference

download_username
: Username for basic authentication

download_password
: Password for basic authentication

# Parameter Reference

username
: Username for basic authentication

password
: Password for basic authentication

source
: Source URL for the download

destination
: Destination for the download, defaults to source basename

skip_verify
: Skip SSL verification, defaults to `false`

md5
: Checksum in MD5 format, optional

sha256
: Checksum in SHA256 format, optional
