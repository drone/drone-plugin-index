---
date: 2018-04-22T00:00:00+00:00
title: Anynines
author: drone-plugins
tags: [ deploy, anynines, paas ]
logo: anynines.svg
repo: drone-plugins/drone-anynines
image: plugins/anynines
---

This plugin deploys your application on the [Anynines](https://www.anynines.com/) platform. The below pipeline configuration demonstrates simple usage:

```yaml
steps:
- name: anynines
  image: plugins/anynines
  settings:
    username: octocat@github.com
    password: password
    organization: octocat_github_com
```

Override the default space:

```yaml
steps:
- name: anynines
  image: plugins/anynines
  settings:
    username: octocat@github.com
    password: password
    organization: octocat_github_com
    space: development
```

Example configuration using secrets:

```yaml
steps:
- name: anynines
  image: plugins/anynines
  settings:
    username:
      from_secret: anynines_username
    password:
      from_secret: anynines_password
    organization: octocat_github_com
```

# Parameter Reference

username
: Username for Anynines auth

password
: Password for Anynines auth

organization
: Organization on Anynines

space
: Space within Anynines organization

skip_cleanup
: Skip cleanup of workspace
