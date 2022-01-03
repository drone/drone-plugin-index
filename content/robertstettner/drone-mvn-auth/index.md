---
version: '0.8'
date: 2017-07-21T00:00:00+00:00
title: Maven Auth
author: robertstettner
tags: [ authentication, maven, mvn ]
logo: maven.svg
repo: robertstettner/drone-mvn-auth
image: robertstettner/drone-mvn-auth
draft: true
---
The Maven Auth plugin can be used for generating the `settings.xml` with server authentication for a Maven repository. Please note that dependencies are saved in the `.m2` directory. The below pipeline configuration demonstrates usage: 

```yaml
pipeline:
  authenticate:
    image: robertstettner/drone-mvn-auth
    servers:
      - id: release
        username: admin
        password: R31e4sE
      - id: snapshot
        username: snap
        password: crackle123
    profiles:
      - id: my-profile
        repositories:
          - id: myRepo
            name: Repository for my libraries
            url: http://maven.my.com
            layout: default
        plugin_repositories:
          - id: myRepo
            name: Repository for my libraries
            url: http://maven.my.com
            layout: default
    active_profiles:
      - my-profile
```

# Parameter Reference

servers[]
: the servers

servers[].id
: the server id

servers[].username
: the server username

servers[].password
: the server password

profiles[]
: the profiles

profiles[].id
: the profile id

profiles[].repositories[]
: the profile's repositories

profiles[].repositories[].id
: the profile's repository id

profiles[].repositories[].name
: the profile's repository name

profiles[].repositories[].url
: the profile's repository url

profiles[].repositories[].layout
: the profile's repository layout

profiles[].plugin_repositories[]
: the profile's plugin repositories

profiles[].plugin_repositories[].id
: the profile's plugin repository id

profiles[].plugin_repositories[].name
: the profile's plugin repository name

profiles[].plugin_repositories[].url
: the profile's plugin repository url

profiles[].plugin_repositories[].layout
: the profile's plugin repository layout

active_profiles[]
: the active profiles

debug
: debug mode (optional: set to `true` for verbose messages)

