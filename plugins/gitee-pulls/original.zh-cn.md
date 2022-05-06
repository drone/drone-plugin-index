---
date: 2021-12-30T20:19:51+08:00
title: "Gitee Pulls"
author: "kit101"
tags: [ gitee, pullrequest, buildstatus, teststatus ]
logo: "gitee.svg"
repo: "kit101/drone-plugin-gitee-pulls"
image: "kit101z/drone-plugin-gitee-pulls"
---

这个插件可以自动更新gitee PR的评论、标签及测试状态。下面的pipeline配置演示了简单的用法：

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

# 参数参考

debug
: 启用debug模式, 默认: `false`

api_server
: gitee api服务url, 默认: `https://gitee.com/api/v5`

access_token
: gitee access token, 可以生成一个personal access token

is_running
: 构建是否正在进行中, 默认: `false`

comment_disabled
: 禁用自动更新含构建状态的评论, 默认: `false`

label_disabled
: 禁用自动更新含构建状态的标签, 默认: `false`

running_label
: 设置正在构建标签的名称和颜色, 默认: `drone-build/running,E6A23C`

success_label
: 设置构建成功标签的名称和颜色, 默认: `drone-build/success,67C23A`

failure_label
: 设置构建失败标签的名称和颜色, 默认: `drone-build/failure,DB2828`

test_disabled
: 禁用自动更新测试状态, 默认: `false`
