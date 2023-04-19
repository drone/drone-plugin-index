---
date: 2023-04-19T00:00:00+00:00
title: Cloudflare Pages
author: mgzam-harness
tags: [ publish, cloudflare, cloudflare-pages ]
logo: cloudflare.svg
repo: mahergzam/cloudflare-pages-plugin
image: mgzamharness/cf-pages-drone-plugin
---

The Cloudflare Pages plugin is used to publish static websites to Cloudflare Pages. The following configuration uses the cloudflare-pages plugin to publish a website,

```yaml
kind: pipeline
name: default

steps:
- name: publish  
  image: mgzamharness/cf-pages-drone-plugin
  settings:
    cloudflare_account_id: account-id
    cloudflare_api_token: api-token
    repo_url: https://github.com/mahergzam/cloudflare-pages-demo
    branch: main
    path: /public
    project_name: demo-project
```

Example configuration using credentials from named secrets:

```yaml
steps:
- name: publish  
  image: mgzamharness/cf-pages-drone-plugin
  settings:
    cloudflare_account_id:
      from_secret: cloudflare_account_id
    cloudflare_api_token:
      from_secret: cloudflare_api_token
    repo_url: https://github.com/mahergzam/cloudflare-pages-demo
    branch: main
    path: /public
    project_name: demo-project
```

# Parameter Reference

cloudflare_account_id
: CloudFlare Account ID 

cloudflare_api_token
: CloudFlare API Token for authentication

repo_url
: GitHub repo URL for code to publish

branch
: Cloudflare target branch

path
: The directory of content to publish

project_name
: The cloudflare project name