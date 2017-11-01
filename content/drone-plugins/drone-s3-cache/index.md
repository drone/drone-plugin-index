---
date: 2017-08-29T00:00:00+00:00
title: Amazon S3 Cache
author: drone-plugins
tags: [ amazon, aws, s3, cache ]
repo: drone-plugins/drone-s3-cache
logo: amazon_s3.svg
image: plugins/s3-cache
---

The S3 cache plugin can be used to preserve files and directories between builds. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  restore-cache:
    image: plugins/s3-cache:1
    pull: true
    endpoint: http://minio.company.com
    access_key: myaccesskey
    secret_key: supersecretKey
    restore: true

  build:
    image: node
    commands:
      - npm install

  rebuild-cache:
    image: plugins/s3-cache:1
    pull: true
    endpoint: http://minio.company.com
    access_key: myaccesskey
    secret_key: supersecretKey
    rebuild: true
    mount:
      - node_modules
    when:
      event: push

  flush_cache:
    image: plugins/s3-cache:1
    pull: true
    endpoint: http://minio.company.com
    access_key: myaccesskey
    secret_key: supersecretKey
    flush: true
    flush_age: 14
```

Use additional custom cache directories:

```diff
pipeline:
  restore-cache:
    image: plugins/s3-cache:1
    pull: true
    endpoint: http://minio.company.com
    access_key: myaccesskey
    secret_key: supersecretKey
    restore: true

  build:
    image: node
    commands:
      - npm install

  rebuild-cache:
    image: plugins/s3-cache:1
    pull: true
    endpoint: http://minio.company.com
    access_key: myaccesskey
    secret_key: supersecretKey
    rebuild: true
    mount:
-     - node_modules
+     - <yourstuffhere>
+     - <morestuffhere>
    when:
      event: push

  flush_cache:
    image: plugins/s3-cache:1
    pull: true
    endpoint: http://minio.company.com
    access_key: myaccesskey
    secret_key: supersecretKey
    flush: true
    flush_age: 14
```

Example configuration using credentials from secrets:

```diff
pipeline:
  restore-cache:
    image: plugins/s3-cache:1
    pull: true
    endpoint: http://minio.company.com
-   access_key: myaccesskey
-   secret_key: supersecretKey
+   secrets: [ aws_access_key_id, aws_secret_access_key ]
    restore: true

  build:
    image: node
    commands:
      - npm install

  rebuild-cache:
    image: plugins/s3-cache:1
    pull: true
    endpoint: http://minio.company.com
-   access_key: myaccesskey
-   secret_key: supersecretKey
+   secrets: [ aws_access_key_id, aws_secret_access_key ]
    rebuild: true
    mount:
      - node_modules
    when:
      event: push

  flush_cache:
    image: plugins/s3-cache:1
    pull: true
    endpoint: http://minio.company.com
-   access_key: myaccesskey
-   secret_key: supersecretKey
+   secrets: [ aws_access_key_id, aws_secret_access_key ]
    flush: true
    flush_age: 14
```

# Secret Reference

s3_endpoint, cache_s3_endpoint
: custom endpoint URL (optional, to use a S3 compatible non-Amazon service)

aws_access_key_id, cache_s3_access_key
: amazon access key (optional)

aws_secret_access_key, cache_s3_secret_key
: amazon secret key (optional)

# Parameter Reference

endpoint
: custom endpoint URL (optional, to use a S3 compatible non-Amazon service)

access_key
: amazon access key (optional)

secret_key
: amazon secret key (optional)

restore
: restore the build environment from cache

rebuild
: rebuild the cache from the build environemnt and specified mounts

flush
: flush the cache of old cache items (please be sure to set this so we don't waste storage)

mount
: file/directory locations to build your cache from

debug
: enabling more logging for debugging

filename
: filename for the cache (optional)

path
: path to store the cache file (optional)

fallback_path
: fallback path for the cache file (optional)

flush_age
: flush cache files older then # days (optional)
