---
date: 2017-08-29T00:00:00+00:00
title: AWS S3 Sync
author: drone-plugins
tags: [ publish, amazon, aws, s3, storage, sync ]
logo: amazon_s3.svg
repo: drone-plugins/drone-s3-sync
image: plugins/s3-sync
---

The S3 sync synchronizes files and build artifacts to your S3 bucket. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  s3-sync:
    image: plugins/s3-sync:1
    bucket: my-bucket-name
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    bucket: my-bucket.s3-website-us-east-1.amazonaws.com
    source: folder/to/archive
    target: /target/location
```

Delete all files that don't exist on the local files:

```diff
pipeline:
  s3-sync:
    image: plugins/s3-sync:1
    bucket: my-bucket-name
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    bucket: my-bucket.s3-website-us-east-1.amazonaws.com
    source: folder/to/archive
    target: /target/location
+   delete: true
```

Invalidate a specific Cloudfront distribution ID:

```diff
pipeline:
  s3-sync:
    image: plugins/s3-sync:1
    bucket: my-bucket-name
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    bucket: my-bucket.s3-website-us-east-1.amazonaws.com
    source: folder/to/archive
    target: /target/location
+   cloudfront_distribution: 9c5785d3ece6a9cdefa4
```

Customize `acl`, `content_type`, `content_encoding` or `cache_control`:

```diff
pipeline:
  s3-sync:
    image: plugins/s3-sync:1
    bucket: my-bucket-name
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    bucket: my-bucket.s3-website-us-east-1.amazonaws.com
    source: folder/to/archive
    target: /target/location
+   acl:
+     "public/*": public-read
+     "private/*": private
+   content_type:
+     ".svg": image/svg+xml
+   content_encoding:
+     ".js": gzip
+     ".css": gzip
+   cache_control: "public, max-age: 31536000"
```

The parameters can be passed as a string value to apply to all files, or as a map to apply to a subset of files. In the case of `acl` the key of the map is a glob. If there are no matches in your settings for a given file, the default is `private`.

The `content_type` field the key is an extension including the leading dot `.`. If you want to set a content type for files with no extension, set the key to the empty string `""`. If there are no matches for the `content_type` of any file, one will automatically be determined for you.

In the `content_encoding` field the key is an extension including the leading dot `.`. If you want to set a encoding type for files with no extension, set the key to th empty string `""`. If there are no matches for the `content_encoding` of a file, no content-encoding header will be added.

In the `cache_control` field the key is an extension including the leading dot `.`. If you want to set cache control for files with no extension, set the key to the empty string `""`. If there are no matches for the `cache_control` of a file, no cache-control header will be added.

Customize `metadata` headers for all objects:

```diff
pipeline:
  s3-sync:
    image: plugins/s3-sync:1
    bucket: my-bucket-name
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    bucket: my-bucket.s3-website-us-east-1.amazonaws.com
    source: folder/to/archive
    target: /target/location
+   metadata:
+     custom-meta: abc123
```

Customize `metadata` headers based on globs:

```diff
pipeline:
  s3-sync:
    image: plugins/s3-sync:1
    bucket: my-bucket-name
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    bucket: my-bucket.s3-website-us-east-1.amazonaws.com
    source: folder/to/archive
    target: /target/location
+   metadata:
+     "*.png":
+       CustomMeta: abc123
```

Define `redirects` targets for uploads:

```diff
pipeline:
  s3-sync:
    image: plugins/s3-sync:1
    bucket: my-bucket-name
    access_key: a50d28f4dd477bc184fbd10b376de753
    secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    bucket: my-bucket.s3-website-us-east-1.amazonaws.com
    source: folder/to/archive
    target: /target/location
+   redirects:
+     some/missing/file: /somewhere/that/actually/exists
```


Example configuration using credentials from secrets:

```diff
pipeline:
  s3-sync:
    image: plugins/s3-sync:1
    bucket: my-bucket-name
-   access_key: a50d28f4dd477bc184fbd10b376de753
-   secret_key: bc5785d3ece6a9cdefa42eb99b58986f9095ff1c
+   secrets: [ aws_access_key_id, aws_secret_access_key ]
    region: us-east-1
    bucket: my-bucket.s3-website-us-east-1.amazonaws.com
    source: folder/to/archive
    target: /target/location
```

# Secret Reference

aws_access_key_id
: amazon access key (optional)

aws_secret_access_key
: amazon secret key (optional)

# Parameter Reference

access_key
: amazon access key (optional)

secret_key
: amazon secret key (optional)

bucket
: bucket name

region
: bucket region (`us-east-1`, `eu-west-1`, etc, defaults to `us-east-1`)

source
: source location of the files, using a glob matching pattern, defaults to `.`

target
: target location of files in the bucket, defaults to `/`

delete
: delete locally removed files from the target

acl
: access control settings

content_type
: content-type settings for uploads

content_encoding
: content-encoding settings for uploads

cache_control
: cache-control settings for uploads

metadata
: additional metadata for uploads

redirects
: redirects to create

cloudfront_distribution
: id of cloudfront distribution to invalidate

dry_run
: disable real uploads, just simulate it
