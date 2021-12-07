---
date: 2018-04-15T00:00:00+00:00
title: Google Cloud Storage
author: drone-plugins
tags: [ publish, google, gcp, gcs, storage ]
logo: google_gcs.svg
repo: drone-plugins/drone-gcs
image: plugins/gcs
---

The GCS plugin can be used to publish files and artifacts to Google Cloud Storage. The following pipeline configuration uses the GCS plugin to upload files:

```yaml
kind: pipeline
name: default

steps:
- name: upload  
  image: plugins/gcs
  settings:
    source: dist
    target: bucket/dir/
    ignore: bin/*
    acl: allUsers:READER,user@domain.com:OWNER
    gzip: js,css,html
    cache_control: public,max-age=3600
    metadata: {"x-goog-meta-foo":"bar"}
    token: your-google-token
```

Example configuration using secrets:

```yaml
kind: pipeline
name: default

steps:
- name: upload  
  image: plugins/gcs
  settings:
    source: dist
    target: bucket/dir/
    ignore: bin/*
    acl: allUsers:READER,user@domain.com:OWNER
    gzip: js,css,html
    cache_control: public,max-age=3600
    metadata: {"x-goog-meta-foo":"bar"}
    token:
      from_secret: your-google-token
```

# Parameter Reference

token
: A [Google service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) in JSON format with access to Google Cloud Storage.  Either this parameter or `oauth-token` must be provided.

oauth-token
: An [OAuth2 access token](https://developers.google.com/identity/protocols/oauth2/service-account) granting access to Google Cloud Storage.  Either this parameter or `token` must be provided.

acl
: a list of access rules applied to the uploaded files, in a form of entity:role

source
: location of files to upload

ignore
: skip files matching this pattern, relative to source

target
: destination to copy files to, including bucket name

gzip
: files with the specified extensions will be gzipped and uploaded with "gzip" Content-Encoding header

cache_control
: Cache-Control header

metadata
: an arbitrary dictionary with custom metadata applied to all objects
