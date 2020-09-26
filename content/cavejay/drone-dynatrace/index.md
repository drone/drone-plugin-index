---
date: 2020-09-26T00:00:00+00:00
title: Dynatrace Deployment Events
author: mzball-dt
tags: [dynatrace, monitoring]
logo: dynatrace.svg
repo: mzball-dt/dynatrace-drone-events
image: cavejay/dynatrace-drone-events
---

A Drone CI Plugin for pushing deployment events to any selection of Dynatrace monitored entities via tags. 
Use this to tie deployment events into problem analysis and track performance changes in services and your user's experience.

The plugin supports all tags available through the Dynatrace UI for autotagging rules. 
You can manually add tags to your monitored entities or use those already present.

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

Tell Dynatrace that the change occured to an entire k8s application or pod:

```diff
 - name: Inform Dynatrace of Deployment
    image: cavejay/dynatrace-drone-events
    settings:
      dynatrace_environment:
        from_secret: dtenv
      dynatrace_api_token:
        from_secret: dttoken
      tagrules:
-       - PROCESS_GROUP=WebServer&&Prod
+       - PROCESS_GROUP=[Kubernetes]app:reviews&&[Kubernetes]env:production
+       - SERVICE=[Kubernetes]app:reviews&&[Kubernetes]env:production
+     customprops:
+       - integrationVersion=v1.2.3
```

# Parameter Reference

dynatrace_environment
: **Required**. The URL of your Dynatrace SaaS or Managed tenant. 
eg: https://abcd1234.live.dynatrace.com

dynatrace_api_token
: **Required**. 
A valid API token for the target tenant. 
Must have the `DataExport` scope.

tagrules
: **Required**. 
A list of monitoring entities and tags that communicate what the event is deployment event is affecting.
Each list entry must be a valid Dynatrace entity type and a filter made of tags.

Tags are present in the same way as they are in Dynatrace's UI: `[Context]Key:Value`. No context or value is needed for simple tags such as those manually applied. Context is most important for auto-tagged entities like those from k8s, AWS or Azure.

customproperties
: **Optional**
A list of `key=value` components to include any other information that would important for the deployment event you configure.
