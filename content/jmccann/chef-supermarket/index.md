---
date: 2016-01-01T00:00:00+00:00
title: Chef Supermarket
author: jmccann
tags: [ publish, chef ]
repo: jmccann/drone-chef-supermarket
logo: chef_supermarket.svg
image: jmccann/drone-chef-supermarket
---

The Chef Supermarket plugin can publish cookbooks to Supermarket (internal or public).
The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  hipchat:
    image: jmccann/drone-chef-supermarket:1
```

The following example will upload the cookbook to supermarket server
`https://supermarket.chef.io` using `jsmith`.

```yaml
pipeline:
  chef_supermarket:
    image: jmccann/drone-chef-supermarket:1
    user: jsmith
```

This example will upload the cookbook to supermarket server
`https://mysupermarket.corp.com` using `jsmith` skipping ssl verification.

```diff
pipeline:
  chef_supermarket:
    image: jmccann/drone-chef-supermarket:1
+   server: https://mysupermarket.corp.com
+   ssl_verify: false
+   user: jsmith
```

# Secrets

The Chef Supermarket plugin supports reading credentials from the Drone secret store.
This is strongly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  chef_supermarket:
    image: jmccann/drone-chef-supermarket:1
    user: jsmith
-   private_key: "-----BEGIN KEY-----\nasdfasd\nsdfasd\n-----END KEY-----\n"
```

The above `private_key` Yaml attribute can be replaced with the `SUPERMARKET_PRIVATE_KEY` secret environment variable.
Please see the [Drone documentation](http://readme.drone.io/0.5/secrets-with-plugins/) to learn more about secrets.

# Secret Reference

SUPERMARKET_PRIVATE_KEY
: supermarket private key

# Parameter Reference

user
: connects as this user

private_key
: private key contents to auth to server with

server
: (default: `'https://supermarket.chef.io'`) Supermarket server to connect to

ssl_verify
: (default: `true`) Enable/Disable SSL verify
