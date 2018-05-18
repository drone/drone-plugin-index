---
date: 2018-17-05T00:00:00+00:00
title: Github Status
author: gboddin
tags: [ infrastructure, trigger, drone, github, status ]
logo: github.svg
repo: gboddin/drone-github-status
image: gboo/github-status
---

Use this plugin to interact with Github commit status. Commit status
can make sure a pull request can be merged only when selected status
are passing.

# Simple context

```yaml
pipeline:
  # Simple context
  set-commit-status:
    image: gboo/github-status
    secrets: [ github_token ]
    state: success
    context: drone/subtest/functional-test
```

# Multi context

Combining `github-status` with `github-search-downstream` can allow
complexe scenarios where a parent repo must validates against child repos.

The bellow example demonstrate a complex build with children
reporting to a parent repository.

From parent build :

```yaml
pipeline:
  # Parent build, set commit status for X subrepos :
  set-commit-status:
    image: gboo/github-status
    github_query: "org:drone-plugins topic:drone-plugin"
    secrets: [ github_token ]
    state: pending
    context: drone/subtest/{{ .FullName }}
    
  trigger-downstream:
    image: gboo/github-search-downstream
    github_query: "org:drone-plugins topic:drone-plugin"
    branch: master
    secrets: [ github_token, drone_server, drone_token ]
    params:
      - DRONE_PARENT_REPO_OWNER=${DRONE_REPO_OWNER}
      - DRONE_PARENT_REPO_NAME=${DRONE_REPO_NAME}
      - DRONE_PARENT_COMMIT_HASH=${DRONE_COMMIT_HASH}
```

From child build :

```yaml
  # Child build, validate on parent's commit status
  set-parent-commit-status:
    image: gboo/github-status
    secrets: [ github_token ]
    state: success
    context: drone/subtest/${DRONE_REPO}
    repo_owner: ${DRONE_PARENT_REPO_OWNER}
    repo_name: ${DRONE_PARENT_REPO_NAME}
    commit_id: ${DRONE_PARENT_COMMIT_HASH}
```



# Secret Reference

github_token
: Github OAuth authentication token.

# Parameter Reference

context
: Context to set on the commit ( eg: test/functional/dep1 )
The context supports templating, in case you're matching multiple repo.

commit_id
: The commit to set a status for. The current commit is used by default.

state
: The state of the commit. ( One of: `pending`, `failure`, `error`, `success`)

link
: The link to associate with the context. The current build link is used by default.

repo_owner
: The repository owner to interact with. The current repository owner is used by default.

repo_name
: The repository name to interact with. The current repository name is used by default.

# Context template Reference

{{ .FullName }}
: Full name of the repo including organisation name

{{ .Owner.Login }}
: Owner of the repository

{{ .Name }}
: Name of the repository
