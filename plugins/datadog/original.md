---
date: 2019-08-16T00:00:00+00:00
title: Datadog
author: masci
tags: [ monitoring, datadog ]
logo: datadog.svg
repo: masci/drone-datadog
image: masci/drone-datadog
---

The plugin can be used to send events and metrics to Datadog from a drone pipeline.

## Usage

To send a metric every time a pipeline runs, add this step:

```yml
- name: count-pipeline
  image: masci/drone-datadog
  settings:
    api_key:
      from_secret: datadog_api_key
    metrics:
      - type: "count"
        name: "masci.pipelines.count"
        value: 1.0
        tags: ["project:${DRONE_REPO_NAME}", "branch:${DRONE_BRANCH}"]
```

Sending an event is similar, both `metrics` and `events` support the `host` field:

```yml
- name: notify-pipeline
  image: masci/drone-datadog
  settings:
    api_key:
      from_secret: datadog_api_key
    events:
      - title: "Building drone-datadog success"
        text: "Version ${DRONE_TAG} is available on Docker Hub"
        alert_type: "info"
        host: ${DRONE_SYSTEM_HOSTNAME}
```

You can use events to notify something bad happened:

```yml
- name: notify-pipeline
  image: masci/drone-datadog
  settings:
    api_key:
      from_secret: datadog_api_key
    events:
      - title: "Build failure"
        text: "Build ${DRONE_BUILD_NUMBER} has failed"
        alert_type: "error"
  when:
    status:
    - failure
```

# Parameter Reference

api_key
: The Datadog API key that'll be used to send metrics and events.

dry_run
: When set to `true`, the plugin only computes metrics and events without sending anything to the
Datadog intake. When the plugin runs in dry mode, it doesn't require an `api_key` to be set,
useful for testing.

metrics
: A list of metrics to be sent to Datadog. A metric must have a `name` and a `value`;
`type` defaults to `gauge`; `tags` and `hostname` are optional.

events
: A list of events to be sent to Datadog. An event must have a `title` and a `text`;
`alert_type` defaults to `info`.

# Command Line Parameter Reference

-v
: show plugin version and exit