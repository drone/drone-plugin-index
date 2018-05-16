---
date: 2018-17-05T00:00:00+00:00
title: Github PR Control
author: gboddin
tags: [ infrastructure, trigger, drone, github ]
logo: github.svg
repo: gboddin/drone-github-pr
image: gboo/github-pr
---

Use this plugin to interact with Github pull requests, it supports 3 modes of operation.

# Comment a pull request

```yaml
pipeline:
  comment-pr:
    image: gboo/github-pr
    github_token: d8e8fca2dc0f896fd7cb4cb0031ba249
    action: comment
    message: "Commenting a PR !"
```

# Close a pull request

```yaml
pipeline:
  close-pr:
    image: gboo/github-pr
    github_token: d8e8fca2dc0f896fd7cb4cb0031ba249
    action: close
    message: "Closing a PR !"
```

# Merge a pull request

Three methods are supported for merging : `merge`, `squash`, `rebase`.

```yaml
pipeline:
  merge-pr:
    image: gboo/github-pr
    github_token: d8e8fca2dc0f896fd7cb4cb0031ba249
    action: merge
    message: "Merging a PR !"
```


# Secret Reference

github_token
: Github OAuth authentication token.

# Parameter Reference

action
: Selects what action to perform on the pull request ( One of `comment`, `close`, `merge`, `rebase`, `squash` ).

message
: The content of the comment left on the pull request, but also the merge commit message. The current commit message is used by default.

number
: The pull request number to interact with. The current PR number is used by default.

repo_owner
: The repository owner to interact with. The current repository owner is used by default.

repo_name
: The repository name to interact with. The current repository name is used by default.