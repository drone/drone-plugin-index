---
version: '0.8'
date: 2018-06-22T00:00:00+00:00
title: Google Cloud Storage Cache
author: hvalle
tags: [ cache, gcs, google ]
logo: google_gcs.svg
repo: hvalle/drone-gcs-cache
image: homerovalle/drone-gcs-cache
---

The GCS cache plugin can be used to preserve files and directories between builds. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  restore-cache:
    image: homerovalle/drone-gcs-cache
    pull: true
    bucket: gcs_bucket
    json_key: your-service-account-json-key
    restore: true

  build:
    image: node
    commands:
      - npm install

  rebuild-cache:
    image: homerovalle/drone-gcs-cache
    pull: true
    bucket: gcs_bucket
    json_key: your-service-account-json-key
    rebuild: true
    mount:
      - node_modules
    when:
      event: push

  flush_cache:
    image: homerovalle/drone-gcs-cache
    pull: true
    bucket: gcs_bucket
    json_key: your-service-account-json-key
    flush: true
    flush_age: 14
```

Use additional custom cache directories:

```diff
pipeline:
  restore-cache:
    image: homerovalle/drone-gcs-cache
    pull: true
    bucket: gcs_bucket
    json_key: your-service-account-json-key
    restore: true

  build:
    image: node
    commands:
      - npm install

  rebuild-cache:
    image: homerovalle/drone-gcs-cache
    pull: true
    bucket: gcs_bucket
    json_key: your-service-account-json-key
    rebuild: true
    mount:
-     - node_modules
+     - <yourstuffhere>
+     - <morestuffhere>
    when:
      event: push

  flush_cache:
    image: homerovalle/drone-gcs-cache
    pull: true
    bucket: gcs_bucket
    json_key: your-service-account-json-key
    flush: true
    flush_age: 14
```

Example configuration using credentials from secrets:

```diff
pipeline:
  restore-cache:
    image: homerovalle/drone-gcs-cache
    pull: true
    bucket: gcs_bucket
-   json_key: your-service-account-json-key
+   secrets: [ GCS_CACHE_JSON_KEY ]
    restore: true

  build:
    image: node
    commands:
      - npm install

  rebuild-cache:
    image: homerovalle/drone-gcs-cache
    pull: true
    bucket: gcs_bucket
-   json_key: your-service-account-json-key
+   secrets: [ GCS_CACHE_JSON_KEY ]
    rebuild: true
    mount:
      - node_modules
    when:
      event: push

  flush_cache:
    image: homerovalle/drone-gcs-cache
    pull: true
    bucket: gcs_bucket
-   json_key: your-service-account-json-key
+   secrets: [ GCS_CACHE_JSON_KEY ]
    flush: true
    flush_age: 14
```

# Secret Reference

gcs_cache_json_key
: service account json key

# Parameter Reference

json_key
: service account json key

restore
: mode to restore the build environment from cache

rebuild
: mode to rebuild the cache from the build environment and specified `mount`s

flush
: mode to flush the cache of old cache items (please be sure to set this so we don't waste storage)

flush_age
: flush cache files older then # days, defaults to 30 (optional)

mount
: list of files/directories to cache

debug
: enabling more logging for debugging, defaults to `false` (optional)

filename
: filename for the cache (optional)

bucket
: bucket to use to rebuild and restore cache

path
: path to store the cache file, defaults to `[bucket]/<owner>/<repo>/<branch>/` (optional)

fallback_path
: fallback path for the cache file, defaults to `[bucket]/<owner>/<repo>/<branch>/` (optional)

flush_path
: path to search for flushable cache files, defaults to `[bucket]/<owner>/<repo>/` (optional)
