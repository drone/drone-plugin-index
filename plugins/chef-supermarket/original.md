---
version: '0.8'
date: 2016-01-01T00:00:00+00:00
title: Chef Supermarket
author: jmccann
tags: [ publish, chef ]
logo: chef_supermarket.svg
repo: jmccann/drone-chef-supermarket
image: jmccann/drone-chef-supermarket
---

The Chef Supermarket plugin can publish cookbooks to Supermarket (internal or public).
The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  chef_supermarket:
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

# Parameter Reference

user
: connects as this user

private_key
: private key contents to auth to server with

server
: (default: `'https://supermarket.chef.io'`) Supermarket server to connect to

ssl_verify
: (default: `true`) Enable/Disable SSL verify
