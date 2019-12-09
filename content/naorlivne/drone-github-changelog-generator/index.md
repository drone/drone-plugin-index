---
date: 2019-12-02T00:00:00+00:00
title: Github-changelog-generator
author: naorlivne
tags: [ changelog, github, github-changelog-generator ]
logo: github.svg
repo: naorlivne/drone-github-changelog-generator
image: naorlivne/drone-github-changelog-generator
---

This plugin can be used to create a changelog file based on GitHub tags, it will not auto-push it into the repo but rather create a changelog file for you to upload into your desired location via other Drone plugins.

The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
type: docker
name: default

steps:
- name: create_changelog
  image: naorlivne/drone-github-changelog-generator
  settings:
    github_user: naorlivne
    github_project: drone-github-changelog-generator
    output_path: CHANGELOG.md
```

# Parameter Reference

github_user
: The GitHub user name which hosts the repo, can also use a GitHub organization name

github_project
: The GitHub repo name

output_path
: The changelog file path to be created, defaults to `CHANGELOG.md` in the current working directory (repo root by default).
