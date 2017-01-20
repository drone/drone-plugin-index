---
date: 2016-01-01T00:00:00+00:00
title: Hipchat
author: jmccann
tags: [ notifications, chat ]
repo: jmccann/drone-hipchat
logo: hipchat.svg
image: jmccann/drone-hipchat
---

The Hipchat plugin sends build status messages to users and rooms. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  hipchat:
    image: jmccann/drone-hipchat
    room: my-room
    auth_token: my-auth-token
```

Example configuration with a custom hipchat server:

```diff
pipeline:
  hipchat:
    image: jmccann/drone-hipchat
    room: my-room
+   url: https://api.hipchat.foo.com
```

Example configuration with a custom message template:

```diff
pipeline:
  hipchat:
    image: jmccann/drone-hipchat
    room: my-room
+   template: |
+     {{ #success build.status }}
+       build {{ build.number }} succeeded. Good job.
+     {{ else }}
+       build {{ build.number }} failed. Fix me please.
+     {{ /success }}
```

# Parameter Reference

url
: HipChat server URL, defaults to `https://api.hipchat.com`

auth_token
: HipChat V2 API token; use a room or user token with the `Send Notification` scope

room
: ID or URL encoded name of the room

from: drone
: A label to be shown in addition to sender's name

notify: false
: Whether this message should trigger a user notification. See https://www.hipchat.com/docs/apiv2/method/private_message_user
