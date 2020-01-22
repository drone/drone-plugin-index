---
version: '1.0.0'
date: 2020-01-20T00:00:00+00:00
title: Azure Pipelines
author: localdotcom
tags: [ infrastructure, ops, azure]
logo: azure_pipelines.svg
repo: localdotcom/drone-azure-pipelines
image: dclocal/drone-azure-pipelines:1.0.0
---

This plugin can be used to bulk run Azure pipelines. The below sample pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: Bulk run Azure pipelines

platform:
  os: linux
  arch: amd64

steps:
- name: Run build pipeline
  image: dclocal/drone-azure-pipelines:1.0.0
  settings:
    action: queue_build
    definitions: build_definition_id
      - build_definition_id
    organization: organization
    project: project
    user: username@domain.com
    secret:
      from_secret: az_secret

- name: Create a new release
  image: dclocal/drone-azure-pipelines:1.0.0
  settings:
    action: release
    definitions: release_definition_id
    stages: development
    organization: organization
    project: project
    user: username@domain.com
    secret:
      from_secret: az_secret
```

Example configuration with multiple build pipelines:
```diff
- name: Run build pipelines
  image: dclocal/drone-azure-pipelines:1.0.0
  settings:
    action: build
    definitions:
+     - build_definition_id_1
+     - build_definition_id_2
    organization: organization
    project: project
    user: username@domain.com
    secret:
      from_secret: az_secret
```

Example configuration with multiple release pipelines and stages:
```diff
- name: Create new releases
  image: dclocal/drone-azure-pipelines:1.0.0
  settings:
    action: release
    definitions:
+     - release_definition_id_1
+     - release_definition_id_2
    stages:
+     - development
+     - test
    organization: organization
    project: project
    user: username@domain.com
    secret:
      from_secret: az_secret
```
# Parameter Reference
action
: Available actions: build/release

definitions
: Build or release definition ID

stages
: Project environments

organization
: Azure DevOps organization

project
: Azure DevOps project

user
: Azure DevOps user

secret
: Personal Access Token to access REST API

check_build_state (optional)
: Check the status of associated builds, only available under 'Release' step: true/false

skip (optional)
: Skip the step execution: true/false 


# Hints

- Please use the the secret stores provided by drone, or any external. Do not commit secrets into any public repositories.

- To check the status of associated builds that have been run under the 'Build' step, please define and set parameter as follow: ```check_build_state: true```  
Otherwise, the 'Release' step will use latest successful builds.