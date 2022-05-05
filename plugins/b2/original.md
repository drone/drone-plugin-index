---
version: '0.8'
date: 2017-12-04T00:00:00+00:00
title: Backblaze B2
author: techknowlogick
tags: [ publish, backblaze, b2, storage ]
logo: backblaze-b2-logo.svg
repo: techknowlogick/drone-b2
image: techknowlogick/drone-b2
---

The B2 plugin uploads files and build artifacts to your B2 bucket. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  b2:
    image: techknowlogick/drone-b2
    bucket: my-bucket-name
    account: a50d28f4dd477bc184fbd10b376de753
    key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    source: public/**/*
    target: /target/location
```

Use secrets instead of hardcoding credentials:

```diff
pipeline:
  b2:
    image: techknowlogick/drone-b2
    bucket: my-bucket-name
-   account: a50d28f4dd477bc184fbd10b376de753
-   key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
+    secrets: [ b2_account_id, b2_application_key ]
    source: public/**/*
    target: /target/location
```

Configure the plugin to strip path prefixes when uploading:

```diff
pipeline:
  b2:
    image: techknowlogick/drone-b2
    bucket: my-bucket-name
    secrets: [ b2_account_id, b2_application_key ]
    source: public/**/*
    target: /target/location
+   strip_prefix: public/
```

Configure the plugin to exclude files from upload:

```diff
pipeline:
  b2:
    image: techknowlogick/drone-b2
    bucket: my-bucket-name
    secrets: [ b2_account_id, b2_application_key ]
    source: public/**/*
    target: /target/location
+   exclude:
+     - **/*.xml
```

# Secret Reference

b2_account_id (optional)
: backblaze account ID

b2_application_key (optional)
: backblaze secret key

# Parameter Reference

account (optional)
: backblaze account ID

key (optional)
: backblaze secret key

bucket
: bucket name

source
: source location of the files, using a glob matching pattern

target
: target location of files in the bucket

strip_prefix
: strip the prefix from source path

exclude
: glob exclusion patterns

path_style
: whether path style URLs should be used (true for minio)