---
date: 2017-06-29T00:00:00+00:00
title: Drone-s3cache
author: mactynow
tags: [ s3, cache ]
repo: mactynow/drone-s3cache
logo: amazon_s3.svg
image: quay.io/honestbee/drone-kubernetes
---

{{% alert error %}}
This plugin requires an AWS account. 
{{% /alert %}}

This plugin can be used to preserve files and directories between builds and store them on AWS s3. The below pipeline configuration demonstrates simple usage.

{{% alert info %}}
This plugin is inspired by and contains bits of https://github.com/Drillster/drone-volume-cache. If you don't care about storing your cache somewhere else than on your host, then use their work!
{{% /alert %}}

Example pipeline configuration:

```yaml
pipeline:
  restore-cache:
    image: mactynow/drone-s3cache
    aws_access_key_id: ${AWS_ACCESS_KEY_ID}
    aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}
    region: us-east-1
    bucket: drone-cache
    restore: true
    cache: 
      - vendor/bundle
  
  build:
    image: ruby
    commands:
      - bundle install

  rebuild-cache:
    image: mactynow/drone-s3cache
    aws_access_key_id: ${AWS_ACCESS_KEY_ID}
    aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}
    region: us-east-1
    bucket: drone-cache
    rebuild: true
    cache: 
      - vendor/bundle
```

The `rebuild` flag makes the plugin copy files from the build environment to s3. This should be declared at the end of your pipeline.

```diff
pipeline:
  rebuild-cache:
    image: mactynow/drone-s3cache
    aws_access_key_id: ${AWS_ACCESS_KEY_ID}
    aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}
    region: us-east-1
    bucket: drone-cache
    rebuild: true
    cache: 
      - vendor/bundle
```

The `restore` flag makes the plugin copy files from s3 to your build environment. This should be declared at the beginning of your pipeline, before your build steps.

```diff
pipeline:
  restore-cache:
    image: mactynow/drone-s3cache
    aws_access_key_id: ${AWS_ACCESS_KEY_ID}
    aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}
    region: us-east-1
    bucket: drone-cache
    restore: true
    cache: 
      - vendor/bundle
```

# Building without the cache

You can force a build to not use any cache by specifying `[NO CACHE]` in your commit message.

# Clearing the cache

You can clear the cache for the current repository by specifying `[CLEAR CACHE]` in your commit message.

# Parameter Reference

aws_access_key_id
: Your Amazon Web Services key id (better specified as a secret).

aws_secret_access_key
: Your Amazon Web Services secret key (better specified as a secret).

region
: Your Amazon Web Services region.

bucket
: Your Amazon Web Services s3 bucket.

restore
: Restore your cache from s3 (boolean).

rebuild
: Build your cache and upload it to s3 (boolean).

cache
: Directories to cache.
