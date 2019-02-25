---
date: 2019-02-22T00:00:00+00:00
title: Google Cloud Functions
author: oliver006
tags: [ publish, google, gcp, gcf ]
logo: google_gcf.svg
repo: oliver006/drone-gcf
image: oliver006/drone-gcf
---


The GCF plugin can be used to deploy, list, and delete Google Cloud Functions. The following pipeline configuration uses the GCF plugin to first test and then deploy two cloud functions:

```yaml
kind: pipeline
name: default

steps:
  - name: test
    image: golang
    commands:
      - "go test -v"
    when:
      event:
        - push


  - name: deploy-cloud-functions
    image: oliver006/drone-gcf
    settings:
      action: deploy
      project: myproject
      runtime: go111
      functions:
        - TransferFileToGCS:
          - trigger: http
            memory: 2048MB
        - HandleEvents:
          - trigger: topic
            trigger_resource: "projects/myproject/topics/mytopic"
            memory: 512MB
            runtime: python37
            source: ./python/src/functions/

    when:
      event: push
      branch: master

```

This pipeline configuration will delete the two functions:

```yaml
steps:
  - name: delete-cloud-functions
    image: oliver006/drone-gcf
    settings:
      action: delete
      functions:
        - TransferFileToGCS
        - HandleEvents


```

# Parameter Reference

token
: json credentials of the service account to access Google Cloud Functions

action
: can be either deploy, delete, or list

project
: name of the GCP project. if not present, the project of the service account will be used 

runtime
: runtime of the functions to be deployed. Can be specified once or one a per-fucntion basis.

functions
: list of functions to be deployed, each needs to at least provider a trigger but can also set `memory`, `runtime`, and `source`.

