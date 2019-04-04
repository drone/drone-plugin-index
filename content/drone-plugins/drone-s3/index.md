---
date: 2016-01-01T00:00:00+00:00
title: AWS S3
author: drone-plugins
tags: [ publish, amazon, aws, s3, storage ]
logo: amazon_s3.svg
repo: drone-plugins/drone-s3
image: plugins/s3
---

The S3 plugin uploads files and build artifacts to your S3 bucket, or S3-compatible bucket such as Minio. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: upload
  image: plugins/s3
  settings:
    bucket: my-bucket-name
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    source: public/**/*
    target: /target/location
```

Source the aws credentials from secrets:

```yaml
steps:
- name: upload
  image: plugins/s3
  secrets: [aws_access_key_id, aws_secret_access_key]
  settings:
    bucket: my-bucket-name
    source: public/**/*
    target: /target/location
```

Override the default acl and region:

```yaml
steps:
- name: upload
  image: plugins/s3
  settings:
    bucket: my-bucket-name
    acl: public-read
    region: us-east-1
    source: public/**/*
    target: /target/location
```

Configure the plugin to strip path prefixes when uploading:

```yaml
steps:
- name: upload
  image: plugins/s3
  settings:
    bucket: my-bucket-name
    source: public/**/*
    target: /target/location
    strip_prefix: public/
```

Configure the plugin to exclude files from upload:

```yaml
steps:
- name: upload
  image: plugins/s3
  settings:
    bucket: my-bucket-name
    source: public/**/*
    target: /target/location
    exclude:
      - **/*.xml
```

Configure the plugin to connect to a Minio server:

```yaml
steps:
- name: upload
  image: plugins/s3
  settings:
    bucket: my-bucket-name
    source: public/**/*
    target: /target/location
    path_style: true
    endpoint: https://play.minio.io:9000
```

# Parameter Reference

endpoint
: custom endpoint URL (optional, to use a S3 compatible non-Amazon service)

access_key
: amazon key (optional)

secret_key
: amazon secret key (optional)

bucket
: bucket name

region
: bucket region (`us-east-1`, `eu-west-1`, etc)

acl
: access to files that are uploaded (`private`, `public-read`, etc)

source
: source location of the files, using a glob matching pattern

target
: target location of files in the bucket

encryption
: if provided, use server-side encryption

strip_prefix
: strip the prefix from source path

exclude
: glob exclusion patterns

path_style
: whether path style URLs should be used (true for minio)
