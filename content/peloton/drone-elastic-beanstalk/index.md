---
date: 2016-01-13T00:00:00+00:00
title: Elastic Beanstalk
author: josmo
tags: [ publish, aws, elastic-beanstalk ]
repo: josmo/drone-elastic-beanstalk
logo: amazon_beanstalk.svg
image: peloton/drone-elastic-beanstalk
---

The Elastic Beanstalk plugin can be used to deploy an app to a Beanstalk environment. The following pipeline configuration uses the Beanstalk plugin to deploy an app:

```yaml
pipeline:
  beanstalk:
    image: peloton/drone-elasctic-beanstalk
    access_key: 970d28f4dd477bc184fbd10b376de753
    secret_key: 9c5785d3ece6a9cdefa42eb99b58986f9095ff1c
    region: us-east-1
    version_label: v1
    description: Deployed with DroneCI
    auto_create: true
    bucket_name: my-bucket-name
    bucket_key: 970d28f4dd477bc184fbd10b376de753
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

bucket_name
: Bucket for S3 source bundle

bucket_key
: Key for S3 source bundle

environment_update
: Flag whether to update ElasticBeansTalk environment with the new version

environment_name
: Environment Name (optional), if update_environment true