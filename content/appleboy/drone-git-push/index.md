---
date: 2019-11-23T00:00:00+00:00
title: Git Push
author: appleboy
tags: [ deploy, publish, git-push ]
repo: appleboy/drone-git-push
logo: git.svg
repo: appleboy/drone-git-push
image: appleboy/drone-git-push
---

Use this plugin for deploying an application via `git push`. You will need to
supply Drone with a private SSH key or use the same credentials as the cloned
repo to being able to push changes.

```yaml
- name: push commit
  image: appleboy/drone-git-push
  settings:
    branch: master
    remote: git@git.heroku.com:falling-wind-1624.git
    force: false
    commit: true
```

An example of pushing a branch back to the current repository:

```yaml
- name: push commit
  image: appleboy/drone-git-push
  settings:
    remote_name: origin
    branch: gh-pages
    local_ref: gh-pages
```

An example of specifying the path to a repo:

```yaml
- name: push commit
  image: appleboy/drone-git-push
  settings:
    remote_name: origin
    branch: gh-pages
    local_ref: gh-pages
    path: path/to/repo
```

## Parameter Reference

key
: private SSH key for the remote machine

remote
: target remote repository (if blank, assume exists)

remote_name
: name of the remote to use locally (default "deploy")

branch
: target remote branch, defaults to master

local_branch
: local branch or ref to push (default "HEAD")

path
: path to git repo (if blank, assume current directory)

force
: force push using the `--force` flag, defaults to false

skip_verify
: skip verification of HTTPS certs, defaults to false

commit
: add and commit the contents of the repo before pushing, defaults to false

commit_message
: add a custom message for commit, if it is omitted, it will be `[skip ci] Commit dirty state`

empty_commit
: if you only want generate an empty commit, you can do it using this option

author_name
: the name to use for the author of the commit (if blank, assume push commiter name)

author_email
: the email address to use for the author of the commit (if blank, assume push commiter name)

followtags
: push with --follow-tags option
