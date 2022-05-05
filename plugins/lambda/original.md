---
version: '0.8'
date: 2017-10-22T08:00:35+01:00
title: AWS Lambda
author: devops-israel
tags: [ deploy, amazon, aws, lambda ]
logo: amazon_lambda.svg
repo: omerxx/drone-lambda-plugin
image: omerxx/drone-lambda-plugin
---

The plugin automatically deployes a serverless function to AWS Lambda from a zip file located in an S3 bucket.  _This plugin does not handle creating or uploading the zip file._ 

Example:

```yaml
kind: pipeline
type: docker
name: default

steps:
- name: deploy-lambda
  image: omerxx/drone-lambda-plugin
  settings:
    function_name: my-function
    s3_bucket: some-bucket
    file_name: lambda-dir/lambda-project-${DRONE_BUILD_NUMBER}.zip
```

# Secret Reference

It is highly recommended to make use of IAM roles instead of environment variables for AWS
(Considering you are running Drone on AWS)

aws_access_key_id
: AWS access key

aws_secret_access_key
: AWS secret key. Access and secret key variables override credentials stored in config files

aws_default_region
: AWS region. This variable overrides the default region of the in-use profile, if set


If these are not set, the plugin will use the instance IAM role [ Recommended method ]

# Parameter Reference

function_name
: Name of the lambda function as set in AWS 

s3_bucket
: Name of the S3 bucket in which the zip package for deployment is stored

file_name
: Name of the file in S3. Can be prefixed like `my-directory/my-zip-package.zip`

