---
date: 2016-01-01T00:00:00+00:00
title: Amazon S3
author: drone-plugins
tags: [ amazon, aws, s3, storage ]
repo: drone-plugins/drone-s3
logo: amazon_s3.svg
image: plugins/s3
---

The S3 plugin uploads files and build artifacts to your S3 bucket, or S3-compatible bucket such as Minio. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  s3:
    image: plugins/s3
    bucket: my-bucket-name
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    source: public/**/*
    target: /target/location
```

Override the default acl and region:

```diff
pipeline:
  s3:
    image: plugins/s3
    bucket: my-bucket-name
+   acl: public-read
+   region: us-east-1
    source: public/**/*
    target: /target/location
```

Configure the plugin to strip path prefixes when uploading:

```diff
pipeline:
  s3:
    image: plugins/s3
    bucket: my-bucket-name
    source: public/**/*
    target: /target/location
+   strip_prefix: public/
```

Configure the plugin to exclude files from upload:

```diff
pipeline:
  s3:
    image: plugins/s3
    bucket: my-bucket-name
    source: public/**/*
    target: /target/location
    exclude:
      - **/*.xml
```

# Secrets

The S3 plugin supports reading credentials from the Drone secret store. This is strongly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  s3:
    image: plugins/s3
    bucket: my-bucket-name
-   access_key: a50d28f4dd477bc184fbd10b376de753
-   secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    source: public/**/*
    target: /target/location
```

The `access_key` and `secret_key` attributes can be replaced with the below secret environment variables. Please see the Drone documentation to learn more about secrets.

AWS_ACCESS_KEY_ID:
: amazon key

AWS_SECRET_ACCESS_KEY
: amazon secret key

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
