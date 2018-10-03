---
date: 2018-10-03T00:00:00+00:00
title: XMPP
author: drymer
tags: [ notifications, chat ]
logo: xmpp.svg
repo: drymer/drone-xmpp
image: drymer/drone-xmpp
---

The XMPP plugin sends build status messages to MUC rooms. The below
configuration demonstrates simple usage:

```yaml
  notify:
    image: registry.daemons.it/drone-xmpp
    secrets: [xmpp_user, xmpp_password, xmpp_room]
```

It's possible to send customized messages:

```diff
  notify:
    image: registry.daemons.it/drone-xmpp
    secrets: [xmpp_user, xmpp_password, xmpp_room]
+   message: "Beep, boop, I'm a bot. You may see the build's status here: {build_link}"
```

# Secret Reference

Safety first, the room, the user and the password are stored in Drone Secrets.

xmpp_user
: XMPP user. It's the complete JID, that means it's somebody@host.com.

xmpp_password
: XMPP password.

xmpp_room
: Room to send message.

# Parameter Reference

message
: It's an optional parameter. It accepts a jinja-like template, like the one
  shown in the last example. The complete variables list can be visisted in the
  [README](https://git.daemons.it/drymer/drone-xmpp#messages) file.

