---
date: 2016-01-01T00:00:00+00:00
title: Git
author: drone-plugins
tags: [ clone, git ]
logo: git.svg
repo: drone-plugins/drone-git
image: plugins/git
---

The git plugin is used to clone a git repository. Note that Drone uses the git plugin by default for all repositories, without any configuration required.

```yaml
clone:
  git:
    image: plugins/git
    depth: 50
```

Sample configuration to recursively clone submodules:

```diff
clone:
  git:
    image: plugins/git
+   recursive: true
```

Sample configuration to recursively clone tags:

```diff
clone:
  git:
    image: plugins/git
+   tags: true
```

# Private Submodules

Private submodules may encounter the following error:

```nohighlight
Warning: Permanently added 'github.com,192.30.252.130' (RSA) to the list of known hosts.
ERROR: Repository not found.
fatal: Could not read from remote repository.
```

This happens when a private submodule uses a `git+ssh` url:

```nohighlight
[submodule "hello-world"]
    path = hello-world
    url = git@github.com:octocat/hello-world.git
```

This can be mitigated by overriding the submodule url to use `git+https`:

```diff
clone:
  git:
    image: plugins/git
    recursive: true
+   submodule_override:
+     hello-world: https://github.com/octocat/hello-world.git
```

# Parameter Reference

depth
: creates a shallow clone with truncated history

recursive
: recursively clones git submodules

skip_verify
: disables ssl verification when set to `true`

tags
: fetches tags when set to `true`

submodule_override
: override submodule urls

submodule_update_remote
: pass the `--remote` flag to git submodule update
