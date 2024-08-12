---
version: "1.0"
date: 2024-08-12T00:00:00+00:00
title: Github Pull Request Sizer
author: parraletz
tags: [pull_request, github]
logo: github.svg
repo: parraletz/pr-sizer
image: parraletz/pr-sizer
---

This plugin is used to label the pull request opened acording to the modified, deleted of the modified code.

```yaml
kind: pipeline
type: docker
name: default

steps:
  - name: label-pr-size
    image: parraletz/pr-sizer
    settings:
      github_token: xxxxxxxx
      pr_number: 11
      owner: parraletz
      repo: pr-sizer
    when:
      event: pull_request
      action: opened
```

# Parameter Reference

github_token
: GitHub oauth token with public_repo or repo permission. If you create your token, ensure you select the correct scope. For private repositories you have to select repo while public repositories only requires public_repo.

pr_number
: the pull request number to label

owner
: the owner of the repository where the pull request is located

repo
: the repository where the pull request is located
