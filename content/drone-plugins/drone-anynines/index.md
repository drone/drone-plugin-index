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
pipeline:
  anynines:
    image: plugins/anynines
    username: octocat@github.com
    password: password
    organization: octocat_github_com
```

Override the default space:

```diff
pipeline:
  anynines:
    image: plugins/anynines
    username: octocat@github.com
    password: password
    organization: octocat_github_com
+   space: development
```

Example configuration using secrets:

```diff
pipeline:
  anynines:
    image: plugins/anynines
-   username: octocat@github.com
-   password: password
-   organization: octocat_github_com
+   secrets: [ anynines_username, anynines_password, anynines_organization ]
```

# Secret Reference

anynines_username
: Username for Anynines auth

anynines_password
: Password for Anynines auth

anynines_organization
: Organization on Anynines

anynines_space
: Space within Anynines organization

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
