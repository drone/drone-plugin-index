---
date: 2017-09-02T08:00:35+01:00
title: AWS ECS Deploy
author: devops-israel
tags: [ deploy, amazon, aws, ecs, docker ]
logo: amazon_ecs.svg
repo: joshdvir/drone-ecs-deploy
image: joshdvir/drone-ecs-deploy
---

This plugin allows updating an ECS service.
The plugin is a wrapper for [ecs-deploy](https://github.com/silinternational/ecs-deploy/), this bash works by taking the current task definition of a service and just changing the image so that all the configuration stays the same.

## Usage

This pipeline will update the `my-cluster` cluster and `my-service` service with the image tagged `my-image:latest`

```yaml
  pipeline:
    deploy:
      image: joshdvir/drone-ecs-deploy
      cluster: my-cluster
      service: my-service
      image_name: my-image:latest
      aws_region: us-east-1
```

Another example with optional variables

```yaml
  pipeline:
    deploy:
      image: joshdvir/drone-ecs-deploy
      cluster: my-cluster
      service: my-service
      image_name: my-image:latest
      aws_region: us-east-1 # defaults to us-east-1
      timeout: "600" # defaults to 300 / 5 min
      max: "200" # defaults to 200
      min: "100" # defaults to 100
      aws_access_key_id: ewijdfmvbasciosvdfkl # optional, better to use as secret
      aws_secret_access_key: vdfklmnopenxasweiqokdvdfjeqwuioenajks # optional, better to use as secret
```

## Optional secrets

* AWS_ACCESS_KEY_ID
* AWS_SECRET_ACCESS_KEY

If no AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY the plugin will use the instance IAM role.

# Parameter Reference

aws_access_key_id
: AWS access key

aws_secret_access_key
: AWS secret key

aws_region
: AWS region

cluster
: Name of ECS cluster

service
: Name of service to deploy

timeout
: Default is 300s. Script monitors ECS Service for new task definition to be running.

image_name
: Name of Docker image to run, ex: repo/image:latest

max:
: maximumPercent: The upper limit on the number of running tasks during a deployment. (default: 200)

min:
: minumumHealthyPercent: The lower limit on the number of running tasks during a deployment. (default: 100)
