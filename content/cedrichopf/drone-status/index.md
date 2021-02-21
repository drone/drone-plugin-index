---
date: 2021-02-21T00:00:00+00:00
title: Status
author: cedrichopf
tags: [github, pull-request, status]
logo: github.svg
repo: cedrichopf/drone-status
image: cedrichopf/drone-status
---

The Status plugin creates/updates a GitHub status for a given repository and commit hash.

The following configuration uses the Status plugin to add a custom status to the pipeline commit:

```yaml
---
kind: pipeline
type: docker
name: github-status

trigger:
  event:
    - pull_request

steps:
  - name: create-status
    image: cedrichopf/drone-status
    settings:
      api_token: 1234567890
      state: success
      context: drone-ci/status-plugin
      description: Build successful
```

# Parameter Reference

api_token
: GitHub API token with `repo` permission.

state
: The state of the status. Can be one of `error`, `failure`, `pending`, or `success`.

context
: A string label to differentiate this status from the status of other systems. This field is case-insensitive.

description
: A short description of the status. E.g. `Build is pending`

repo
: Target repository to set the status, defaults to the pipeline repository.

commit
: Commit hash to set the status, defaults to the commit hash provided by the pipeline.

endpoint
: Endpoint of the GitHub instance (e.g. GitHub Enterprise), defaults to `https://api.github.com`
