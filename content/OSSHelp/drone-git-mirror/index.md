---
version: '0.0.1'
date: 2021-02-06-T00:00:00+00:00
title: Git mirror
author: OSSHelp
tags: [ git, mirror, push ]
logo: git.svg
repo: osshelp/drone-git-mirror
image: osshelp/drone-git-mirror
---

The plugin is for mirroring Git repositories to the external ones.

# Usage examples

``` yaml
steps:
  - name: mirror
    image: osshelp/drone-git-mirror
    settings:
      target_repo: git@github.com:OSSHelp/some-repo.git
      ssh_key:
        from_secret: git-mirror-private-key
```

# Parameter Reference

target_repo
: SSH clone URL of target repo

ssh_key
: Private key with R/W permissions to use for interacting with `target_repo`

git_email
: E-mail that will be used while pushing changes (default: `drone@osshelp`)

git_name
: Name that will be used while pushing changes (default: `Drone CI`)

ignore_errors
: If set to `true` the plugin will try to ignore all occurring errors to prevent build failing because of itself (default: `false`)

mirror_ignore_list
: If this file is found in repo root - it contents will be used as excludement list for mirroring (default `.mirror_ignore`)

# FAQ

## How to exclude unwanted files from sync

By default plugin will try to mirror repository contents to `target_repo` "as is". If you want to exclude some files from mirroring you need to create a file, named `.mirror_ignore` (if not overwritten with `mirror_ignore_list` variable) in repo root. Describe wanted and unwanted files and directories inside as if you are preparing a file for using with `--exclude-from` rsync flag (GNU tar way). For example:

```
.drone.yml
.mirror_ignore
file1.txt
dir1/*
dir2
```

## How to delete excluded files or trash branches from remote repo

Files, excluded with `mirror_ignore_list` will not be automatically removed from remote repo. Neither do branches. No plans of implementing such functionality.


# Links

* [Plugin sources at Github](https://github.com/OSSHelp/drone-git-mirror)
* [Plugin image at DockerHub](https://hub.docker.com/r/osshelp/drone-git-mirror)
