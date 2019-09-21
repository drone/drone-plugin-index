---
date: 2019-09-19T00:00:00+00:00
title: Newrelic Deployment
author: CityFurniture
tags: [ newrelic ]
logo: newrelic.svg
repo: cityfurniture/newrelic-deployment
image: cityfurniture/drone-newrelic-deployment
---

The Newrelic deployment plugin reports/logs your deployment to your dashboard to make it easy to track changes.

```yaml
- name: Newrelic - Push Deployment
  image: cityfurniture/drone-newrelic-deployment
  settings:
    app_id: YOUR_APP_ID
    api_key: YOUR_API_KEY
```

Currently the plugin collects info from:

- Commit Author `DRONE_COMMIT_AUTHOR` or falls back to `Drone CI`

- Commit SHA `DRONE_COMMIT_SHA` for Revision.

- `DRONE_COMMIT_MESSAGE` for both changelog and description.

# Parameter Reference

app_id
: Newrelic APP ID

api_key
: Newrelic API Key
