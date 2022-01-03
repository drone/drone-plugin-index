---
date: 2022-01-03:00:00+00:00
title: Pulumi
author: naorlivne
tags: [ infrastructure, build tool, pulumi ]
logo: pulumi.svg
repo: naorlivne/drone-pulumi
image: naorlivne/drone-pulumi
---
This plugin can be used to deploy pulumi stacks, it will create\update the given stack as needed.

The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
type: docker
name: default

steps:
- name: pulumi_deploy
  image: naorlivne/drone-pulumi
  settings:
    pulumi_command: pulumi up --non-interactive --skip-preview --yes
    pulumi_dependencies: pip install -r requirements.txt
    pulumi_token: <your-pulumi-token>
```

# Parameter Reference

pulumi_command
: The command to run in the container, defaults to `pulumi up --non-interactive --skip-preview --yes`

pulumi_dependencies
: The command to install dependencies in the container, defaults to python command `pip install -r requirements.txt`

pulumi_token
: the pulumi token to use, required.
