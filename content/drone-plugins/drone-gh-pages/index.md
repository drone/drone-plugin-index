---
date: 2018-05-04T00:00:00+00:00
title: GitHub Pages
author: drone-plugins
tags: [ publish, github, gh-pages ]
logo: github.svg
repo: drone-plugins/drone-gh-pages
image: plugins/gh-pages
---

The GitHub Pages plugin is used to publish static websites to GitHub. The following configuration uses the gh-pages plugin to publish a website, if you are working on a private repository you don't need to provide credentials:

```yaml
pipeline:
  publish:
    image: plugins/gh-pages
    username: octocat
    password: p455w0rd
    pages_directory: public/
```

Example configuration using credentials from secrets:

```diff
pipeline:
  publish:
    image: plugins/gh-pages
-   username: octocat
-   password: p455w0rd
+   secrets: [ github_username, github_password ]
    pages_directory: public/
```

Example configuration using a custom build directory:

```diff
pipeline:
  publish:
    image: plugins/gh-pages
    username: octocat
    password: p455w0rd
    pages_directory: public/
+   temporary_base: tmp/
```

Example configuration using a custom git remote target:

```diff
pipeline:
  publish:
    image: plugins/gh-pages
    username: octocat
    password: p455w0rd
    pages_directory: public/
+   upstream_name: upstream
```

# Secret Reference

gh_pages_username, github_username
: GitHub username for pushing changes

gh_pages_password, github_password
: GitHub password/token for pushing changes

git_push_ssh_key, ssh_key
: SSH key for pushing changes

# Parameter Reference

username
: GitHub username for pushing changes

password
: GitHub password/token for pushing changes

ssh_key
: SSH key for pushing changes

upstream_name
: GitHub upstream target, defaults to `origin`

target_branch
: GitHub target branch, defaults to `gh-pages`

temporary_base
: Temporary directory to pull gh-pages branch, defaults to `.tmp`

pages_directory
: Directory of content to publish, defaults to `docs`
