---
author: "devops-israel"
date: 2017-10-22T08:00:35+01:00
image: "omerxx/drone-lambda-plugin"
repo: "omerxx/drone-lambda-plugin"
tags: [ publish, aws, ecs ]
logo: amazon_lambda.svg
title: Amazon ECS Deploy
---

This plugin allows updating an ECS service.
The plugin is a wrapper for [ecs-deploy](https://github.com/silinternational/ecs-deploy/), this bash works by taking the current task definition of a service and just changing the image so that all the configuration stays the same.

## Usage

# TODO!


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
