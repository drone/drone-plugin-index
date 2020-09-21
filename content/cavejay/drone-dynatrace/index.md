---
date: 2020-09-16T00:00:00+00:00
title: Dynatrace Deployment Events
author: mzball-dt
tags: [dynatrace, monitoring]
logo: dynatrace.svg
repo: mzball-dt/dynatrace-drone-events
image: cavejay/dynatrace-drone-events
---

A Drone CI Plugin for pushing deployment events to any selection of Dynatrace monitored entities via tags. Use this to tie deployment events into problem analysis and track performance changes in services and your user's experience.

The below pipeline configuration demonstrates simple usage:

```yaml
- name: Inform Dynatrace of Deployment
    image: cavejay/dynatrace-drone-events
    settings:
      dynatrace_environment:
        from_secret: dtenv
      dynatrace_api_token:
        from_secret: dttoken
      tagrules:
        - PROCESS_GROUP=WebServer&&Prod
```

Example configuration using param2:

```diff
 - name: Inform Dynatrace of Deployment
    image: cavejay/dynatrace-drone-events
    settings:
      dynatrace_environment:
        from_secret: dtenv
      dynatrace_api_token:
        from_secret: dttoken
      tagrules:
        - PROCESS_GROUP=WebServer&&Prod
```

Example configuration using param3:

```diff
 - name: Inform Dynatrace of Deployment
    image: cavejay/dynatrace-drone-events
    settings:
      dynatrace_environment:
        from_secret: dtenv
      dynatrace_api_token:
        from_secret: dttoken
      tagrules:
        - PROCESS_GROUP=WebServer&&Prod
```

# Secret Reference

dynatrace_environment
: **Required**. The URL to your Dynatrace SaaS tenant (eg: https://abcd1234.live.dynatrace.com) or your managed tenant (eg: https://yourdomain.com/e/xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx)

dynatrace_api_token
: **Required** . An API token generated for the target environment. Must have the `DataExport` scope or the "Access problem and event feed, metrics, topology" switch enabled in the UI

# Parameter Reference


tagrules
: **Required**. Used to tell Dynatrace which entities the event should be tied too.

customproperties
: Any other properties that should be included in the event.
