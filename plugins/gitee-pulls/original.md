---
date: 2021-12-30T20:19:51+08:00
title: "Gitee Pulls"
author: "kit101"
tags: [ gitee, pullrequest, buildstatus, teststatus ]
logo: "gitee.svg"
repo: "kit101/drone-plugin-gitee-pulls"
image: "kit101z/drone-plugin-gitee-pulls"
---

This plugin can automatically update the comments / labels / test in PR to gitee. The below pipeline configuration demonstrates simple usage:

```yaml
---
name: default
kind: pipeline
type: docker

#label has default values
#environment:
#  PLUGIN_GITEE_RUNNING_LABEL: drone-build/running,E6A23C
#  PLUGIN_GITEE_SUCCESS_LABEL: drone-build/success,67C23A
#  PLUGIN_GITEE_FAILURE_LABEL: drone-build/failure,DB2828

steps:
- name: pr-enhance/start
  pull: always
  image: kit101z/drone-plugin-gitee-pulls
  settings:
    # should set `is_running: true` in the first step
    is_running: true
    access_token:
      from_secret: GITEE_ACCESS_TOKEN
  when:
    event:
    - pull_request

- name: env
  image: alpine
  commands:
  - env

- name: pr-enhance/end
  image: kit101z/drone-plugin-gitee-pulls
  settings:
    access_token:
      from_secret: GITEE_ACCESS_TOKEN
  when:
    event:
    - pull_request
    status:
    - failure
    - success
```

# Parameter Reference

debug
: enable debug mode, default: `false`

api_server
: the gitee api server url, default: `https://gitee.com/api/v5`

access_token
: gitee access token, you can generate personal access token

is_running
: is the build running , default: `false`

comment_disabled
: disable automatic updating of the comment with build status, default: `false`

label_disabled
: disable automatic updating of the label with build status, default: `false`

running_label
: set the name and color of the running label, default: `drone-build/running,E6A23C`

success_label
: set the name and color of the success label, default: `drone-build/success,67C23A`

failure_label
: set the name and color of the failure label, default: `drone-build/failure,DB2828`

test_disabled
: disable automatic updating of the test status, default: `false`