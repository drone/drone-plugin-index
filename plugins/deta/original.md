---
date: 2021-11-07T00:00:00+00:00
title: Deta
author: lizheming
tags: [ deploy, deta ]
repo: lizheming/drone-deta
logo: deta.svg
image: lizheming/drone-deta
---

The Deta plugin deploy your build to [deta.sh](https://deta.sh).

The below pipeline configuration demonstrates simple usage:

```yml
steps:
- name: deta
  image: lizheming/drone-deta
  settings:
    access_token:
      from_secret: deta_access_token
    name: test-name
    project: default
```

# Parameter Reference

access_token: Deta access token. [How to get Deta access token?](https://docs.deta.sh/docs/cli/auth#deta-access-tokens)

name: Deta micro name

project: Deta project name, default is "default".

project_dir: Directory of the project, default is ".".