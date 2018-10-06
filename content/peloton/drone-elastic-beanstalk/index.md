---
date: 2016-01-13T00:00:00+00:00
title: AWS Elastic Beanstalk
author: josmo
tags: [ deploy, amazon, aws, elastic beanstalk ]
logo: amazon_beanstalk.svg
repo: josmo/drone-elastic-beanstalk
image: peloton/drone-elastic-beanstalk
---

The Elastic Beanstalk plugin can be used to deploy an app to a Beanstalk environment. The following pipeline configuration uses the Beanstalk plugin to deploy an app:

```yaml
pipeline:
  beanstalk:
    image: peloton/drone-elastic-beanstalk
    access_key: 970d28f4dd477bc184fbd10b376de753
    secret_key: 9c5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    version_label: v1
    description: Deployed with DroneCI
    auto_create: true
    bucket: my-bucket-name
    bucket_key: my-bucket-folder/app.zip
```

Example of a Elastic Beanstalk pipeline for NodeJS app:

```yaml
pipeline:
  build:
    image: node:alpine
    commands:
      - apk update && apk add zip
      - npm install --production
      - zip -r -9 app-${DRONE_BUILD_NUMBER}.zip *
  
  s3:
    image: plugins/s3
    acl: private
    access_key: 970d28f4dd477bc184fbd10b376de753
    secret_key: 9c5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    bucket: my-bucket-name
    target: my-bucket-folder
    source: app-${DRONE_BUILD_NUMBER}.zip

  beanstalk:
    image: peloton/drone-elastic-beanstalk
    access_key: 970d28f4dd477bc184fbd10b376de753
    secret_key: 9c5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    version_label: v1
    description: Deployed with DroneCI
    auto_create: true
    bucket: my-bucket-name
    bucket_key: my-bucket-folder/app-${DRONE_BUILD_NUMBER}.zip
```

# Parameter Reference

access_key
: aws access key

secret_key
: aws secret key

region
: AWS region

version_label
: Label to identify this version

application
: Application name, defaults to repo name

description
: A description about the deployment, optional

auto_create
: Automatically create the application, defaults to false

process
: Preprocess and validate the manifest, defaults to false

bucket
: Bucket for S3 source bundle

bucket_key
: Key for S3 source bundle

environment_update
: Flag whether to update ElasticBeansTalk environment with the new version

environment_name
: Environment Name (optional), if update_environment true