---
date: 2020-07-17T00:00:00+00:00
title: Pushover
author: awerv
tags: [ Pushover, notifications ]
logo: pushover.svg
repo:  awerv/drone_pushover_plugin 
image: awerv/drone_pushover_plugin
---

This plugin is capable of sending push notifications using Pushover.

The below pipeline configuration demonstrates usage:

```yaml
steps:
- name: pushover  
  image: awerv/drone_pushover
  settings:
    user:
      from_secret: pushover_user
    token:
      from_secret: pushover_token
    title: test
    message: lorem ipsum...
```

# Secret Reference

Although user key and subscription token can be hardcoded into the drone configuration file, it's recommended to use secrets instead.
Both of them can be acquired from Pushover; user key after registering, and token when creating a new application.
Check [this](https://pushover.net/api/subscriptions) for more information regarding creating a Pushover subscription.

# Parameter Reference

user
: User token to from Pushover


token
: Application token from Pushover

title
: Title of the push notification

message
: Message of the push notification


# Notes

The projectKey and projectName of SonarQube project are filled using the full repository name. You could also add a file named `sonar-project.properties` at the root of your project to specify parameters.  

