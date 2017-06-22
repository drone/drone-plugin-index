---
author: wyattjoh
date: 2017-04-14T00:00:00Z
logo: google_gcs.svg
repo: wyattjoh/drone-gcs
tags: [ google cloud, gcp, gcs, storage ]
title: Google Cloud Storage
image: wyattjoh/drone-gcs
---

The Google Cloud Storage plugin uploads files and build artifacts to your
Google Cloud Storage bucket. The below pipeline configuration demonstrates
simple usage:

```yaml
pipeline:
  gcs:
    image: wyattjoh/drone-gcs
    acl: public
    bucket: "my-bucket-name"
    source: public/**/*
    strip_prefix: public/
    target: /target/location
```

Enable compression:

```diff
pipeline:
  gcs:
    image: wyattjoh/drone-gcs
    acl: public
    bucket: "my-bucket-name"
    source: public/**/*
    strip_prefix: public/
+   compress: true
    target: /target/location
```

Exclude files from upload:

```diff
pipeline:
  gcs:
    image: wyattjoh/drone-gcs
    acl: public
    bucket: "my-bucket-name"
    source: public/**/*
    strip_prefix: public/
    target: /target/location
+   exclude:
+     - **/*.xml
```

# Secret Reference

GOOGLE_APPLICATION_CREDENTIALS_CONTENTS
: json contents of the google application credentials (see https://developers.google.com/identity/protocols/application-default-credentials)

# Parameter Reference

bucket
: bucket name

acl
: access to files that are uploaded (`private`, `public`)

source
: source location of the files, using a glob matching pattern

target
: target location of files in the bucket

strip_prefix
: strip the prefix from source path

exclude
: glob exclusion patterns

compress
: gzip files before they are uploaded and add a Content-Encoding: gzip