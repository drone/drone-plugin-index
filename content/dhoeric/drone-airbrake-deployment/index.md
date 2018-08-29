---
date: 2018-06-27T00:00:00+00:00
title: airbrake-deployment
author: dhoeric
tags: [ airbrake, deployment]
repo: dhoeric/drone-airbrake-deployment
image: dhoeric/drone-airbrake-deployment
---


Use the airbrake-deployment plugin to [notify Airbrake a deployment in certain environment](https://airbrake.io/docs/features/deploy-tracking/). 
The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  notify_airbrake:
    image: dhoeric/drone-airbrake-deployment:0.0.1
    airbrake_environment: staging
    secrets:
      - airbrake_project_id
      - airbrake_project_key
```

# Parameter Reference

airbrake_environment
: environment have been deployed in the drone build


# Secret Reference

airbrake_project_id
: project ID of airbrake project

airbrake_project_key
: project API key of airbrake project

