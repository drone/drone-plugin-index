---
date: 2012-09-02T00:00:00+00:00
title: Teams
author: jdamata
tags: [ teams ]
logo: teams.svg
repo: jdamata/drone-teams
image: jdamata/drone-teams
---

The Teams plugin posts build status messages to your channel. The below pipeline configuration demonstrates simple usage:

```yaml
steps:
- name: teams
  image: jdamata/drone-teams
  settings:
    webhook: <WEBHOOK ENDPOINT>
  when: 
    status:
      - failure
      - success
```

Example configuration with webhook sourced from a secret:

```yaml
steps:
- name: teams
  image: jdamata/drone-teams
  settings:
    webhook:
      from_secret: teams_webhook
  when: 
    status:
      - failure
      - success
```

Example configuration for pipeline start and pipeline finish messages:

```yaml
steps:
- name: pipeline-start
  image: jdamata/drone-teams
  settings:
    webhook: <WEBHOOK ENDPOINT>
    status: "building"
...

- name: pipeline-end
  image: jdamata/drone-teams
  settings:
    webhook: <WEBHOOK ENDPOINT>
  when: 
    status:
      - failure
      - success
```

Example configuration using global enviornment variables to define the webhook endpoint:

This is useful if you want to use different teams channels per branch. The env var must match ```${DRONE_BRANCH}_teams_webhook```

```yaml
environment:
  develop_teams_webhook: <WEBHOOK ENDPOINT1>
  master_teams_webhook: <WEBHOOK ENDPOINT2>

steps:
- name: pipeline-start
  image: jdamata/drone-teams
  settings:
    status: "building"

...

- name: pipeline-end
  image: jdamata/drone-teams
  when: 
    status:
      - failure
      - success
```

# Parameter Reference

webhook
: teams channel webhook connector endpoint

status
: specify the teams card ActivitySubtitle. Defaults to failure or success depending on ${DRONE_BUILD_STATUS}

