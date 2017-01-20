---
date: 2016-01-01T00:00:00+00:00
title: NPM
author: donny-dont
tags: [ publish, node ]
repo: drone-plugins/drone-npm
logo: npm.svg
image: plugins/npm
---

The NPM plugin can be used to publish libraries to public or private registries. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  npm:
    image: plugins/npm
    username: bob
    password: password
    email: bob@bob.me
```

Example configuration using a custom registry:

```diff
pipeline:
  npm:
    image: plugins/npm
    username: bob
    password: password
    email: bob@bob.me
+   registry: "http://myregistry:4873"
```

# NPM Enterprise Authentication

NPM enterprise users can optionally authenticate using
[authorization tokens](http://blog.npmjs.org/post/106559223730/npm-enterprise-with-github-2fa). The token will always override the username and password authentication method.

```diff
pipeline:
  npm:
    image: plugins/npm
-   username: bob
-   password: password
+   token: f0e4c2f76c58916ec25
    email: bob@bob.me
```

# Parameter Reference

username
: the username for the account to publish with

password
: the password for the account to publish with

token
: the deploy token to publish with

email
: the email address associated with the account to publish with.

registry
: the registry URL. defaults to https://registry.npmjs.org.

folder
: the folder, relative to the workspace, containing the library. defaults to the workspace directory.
