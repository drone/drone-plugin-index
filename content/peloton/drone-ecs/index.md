---
date: 2016-01-18T00:00:00+00:00
title: ECS
author: josmo
tags: [ publish, aws, ecs ]
repo: josmo/drone-ecs
logo: amazon_ecs.svg
image: peloton/drone-ecs
---

The ECS plugin can be used to deploy a Docker image to an ECS environment. The following pipeline configuration uses the ECS plugin to deploy a Docker image to an ECS service:

```yaml
pipeline:
  ecs:
    image: peloton/drone-ecs
    access_key: superaccesskey
    secret_key: supersecretkey
    service: service1
    region: us-west-2
    family: my-ecs-task
    image_name: namespace/repo
    image_tag: latest
    environment_variables:
      - DATABASE_URI=database uri
    port_mappings:
      - 80 9000
    memory: 128
```

# Parameter Reference

access_key
: aws access key

secret_key
: aws secret key

service
: ecs service on that environment to upgrade

region
: aws region you're using

family
: ecs task

image_name
: docker image to use

image_tag
: tag for the docker image to use

environment_variables:
: list of environment variables to pass to ecs

port_mappings
: port mappings for ecs

memory
: memory to assign to the service


