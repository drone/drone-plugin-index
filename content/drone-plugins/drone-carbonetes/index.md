---
date: 2020-12-11:00:00+00:00
title: Carbonetes
author: carbonetes
tags: [latest]
logo: carbonetes.svg
image: carbonetes/drone
---

Carbonetes Drone Plugin provides comprehensive container analysis and policy evaluation as a fully managed service. Carbonetes analyzes your container images for native code vulnerabilities, software composition analysis (SCA), license types, bill of materials, malware, and secrets. Carbonetes' powerful policy tool enables you to load standard policies or build , test and refine custom policies.

```yaml                
kind: pipeline
type: docker
name: Test Pipeline

steps:
- name: Container Scanning Stage
  image: carbonetes/drone:latest
  settings:
    username: youremail@carbonetes.com
    password: ${your_secret_password}
    registry_uri: 12345678910.dkr.ecr.us-west-2.amazonaws.com 
    image_tag: image:tag
    #Below Parameters are optional : Supplied values are default, if nothing is set
    fail_on_policy: true
    fail_on_error: true
    display_image_analysis_result: true
    display_sca_result: true
    display_secrets_result: true
    display_ma_result: true
    display_lf_result: true
```

# Parameter Reference

username
: Username registered to Carbonetes

password
: Password registered to Carbonetes

registry_uri
: The registry URI that is managed in Carbonetes.

image_tag
: Image to be analyzed, that is in the registry

fail_on_policy
: If this is true, the result of the build will fail if the result of policy evaluation is failed. Otherwise, ignored. Default to true.

fail_on_error
: If this is true, the result of the build will fail if the plugin encounters error. Otherwise, ignored. Default to true.

display_image_analysis_result
: If this is true, the result of image analysis will be displayed. Otherwise, hidden. Default to true.

display_sca_result
: If this is true, the result of software composition analysis will be displayed. Otherwise, hidden. Default to true.

display_secrets_result
: If this is true, the result of secrets analysis will be displayed. Otherwise, hidden. Default to true.

display_ma_result
: If this is true, the result of malware analysis will be displayed. Otherwise, hidden. Default to true.

display_lf_result
: If this is true, the result of license finder analysis will be displayed. Otherwise, hidden. Default to true.
