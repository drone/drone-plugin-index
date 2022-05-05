---
version: '0.8'
date: 2017-07-27T00:00:00+00:00
title: NPM Auth
author: robertstettner
tags: [ authentication, npm, node ]
logo: npm2.svg
repo: robertstettner/drone-npm-auth
image: robertstettner/drone-npm-auth
---
This plugin is used to generate an `.npmrc` file locally to authenticate against any public/private NPM repository. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  npm_auth:
    image: robertstettner/drone-npm-auth
    username: joebloggs
    password: mypass
    email: jb@me.com
```

Example configuration using credentials from secrets:

```diff
pipeline:
  npm_auth:
    image: robertstettner/drone-npm-auth
-   username: joebloggs
-   password: mypass
-   email: jb@me.com
+   secrets: [ npm_username, npm_password, npm_email ]
```

# Secret Reference

npm_username
: The NPM username.

npm_password
: The NPM password.

npm_email
: The NPM email.

# Parameter Reference

username
: The NPM username. Required.

password
: The NPM password. Required.

email
: The NPM email. Required.

registry
: The NPM registry. Defaults to the default NPM registry.

scope
: Scope of the NPM authentication. Optional.

path
: Output path of the generated `.npmrc` file. Defaults to `./`.
