---
author: "devops-israel"
date: 2017-10-22T08:00:35+01:00
image: "omerxx/drone-lambda-plugin"
repo: "omerxx/drone-lambda-plugin"
tags: [ deploy, aws, lambda ]
logo: amazon_lambda.svg
title: AWS Lambda Deploy
---

The plugin utilizes AWS go-sdk to update an existing function's code; build your code, zip it with dependencies and upload it to S3. Then trigger the plugin for deploy.

Execute from the working directory; 
This will update `my-function` with a zip file under `S3://some-bucket/lambda/lambda-project-1.zip`:

```bash
docker run --rm \
  -e PLUGIN_FUNCTION_NAME=my-function \
  -e PLUGIN_S3_BUCKET=some-bucket \
  -e PLUGIN_FILE_NAME=lambda-project-1.zip \
  omerxx/drone-lambda-plugin
```

Example:

```yaml
pipeline:
  deploy-lambda:
    image: omerxx/drone-lambda-plugin
    pull: true
    function_name: my-function
    s3_bucket: some-bucket
    file_name: lambda-dir/lambda-project-${DRONE_BUILD_NUMBER}.zip
```

Example of a complete Lambda project's pipeline:

```yaml
pipeline:
  build:
    image: python:2.7-alpine
    commands:
      - apk update && apk add zip
      - pip install -r requirements.txt -t .
      - zip -r -9 lambda-project-${DRONE_BUILD_NUMBER}.zip *

  s3-publish:
    image: plugins/s3
    acl: private
    region: us-east-1
    bucket: some-bucket
    target: lambda-dir
    source: lambda-project-${DRONE_BUILD_NUMBER}.zip

  deploy-lambda:
    image: omerxx/drone-lambda-plugin
    pull: true
    function_name: my-function
    s3_bucket: some-bucket
    file_name: lambda-dir/revenue-report-${DRONE_BUILD_NUMBER}.zip

  notify-slack-releases:
    image: plugins/slack
    channel: product-releases
    webhook: https://hooks.slack.com/services/ABCD/XYZ
    username: Drone-CI
```

# Secret Reference

It is highly recommended to make use of IAM roles instead of environment variables for AWS
(Considering you are running Drone on AWS)

`aws_access_key_id`  
AWS access key

`aws_secret_access_key`  
AWS secret key. Access and secret key variables override credentials stored in credential and config files

`aws_default_region`  
AWS region. This variable overrides the default region of the in-use profile, if set


If these are not set, the plugin will use the instance IAM role [ Recommended MO ]

# Parameter Reference

function_name
: Name of the lambda function as set in AWS 

s3_bucket
: Name of the S3 bucket in which the zip package for deployment is stored

file_name:
: Name of the file in S3. Can be prefixed like `my-directory/my-zip-package.zip`

