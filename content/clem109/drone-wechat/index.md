---
date: 2018-02-19T00:00:00+00:00
title: Wechat for Work
author: clem109
tags: [ notifications, chat ]
repo: clem109/drone-wechat
logo: wechatwork.svg
image: clem109/drone-wechat
---

Drone plugin for WeChat for Work to show build notifications.

The following is a sample configuration in your .drone.yml file:

```yaml
pipeline:
  wechat:
    image: clem109/drone-wechat
    corpid: corpid
    corp_secret: secret
    agent_id: 1234567
    title: ${DRONE_REPO_NAME}
    description: "Build Number: ${DRONE_BUILD_NUMBER} failed. ${DRONE_COMMIT_AUTHOR} please fix. Check the results here: ${DRONE_BUILD_LINK} "
    msg_url: ${DRONE_BUILD_LINK}
    btn_txt: btn
    when:
      status: [ failure ]
```

```yaml
pipeline:
  wechat:
    image: clem109/drone-wechat
    secrets: [plugin_corpid, plugin_corp_secret, plugin_agent_id]
    title: ${DRONE_REPO_NAME}
    description: "Build Number: ${DRONE_BUILD_NUMBER} failed. ${DRONE_COMMIT_AUTHOR} please fix. Check the results here: ${DRONE_BUILD_LINK} "
    msg_url: ${DRONE_BUILD_LINK}
    btn_txt: btn
    when:
      status: [ failure ]
```

# Parameter Reference

corpid
: The corpid for authorization

corp_secret
: The corp secret for authorization

agent_id
: The agent id to send the message

to_party
: The party ids to send message

to_user
: The user ids to send the message to

to_tag
: The tag ids to send the message to

msg_url
: Text card link

btntxt
: The text for the button on the card

description
: Text description of the card

title
: Notification title

# Secret Reference

plugin_corpid
: The corpid for authorization

plugin_corp_secret
: The corp secret for authorization

plugin_agent_id
: The agent id to send the message

plugin_to_party
: The party ids to send message

plugin_to_user
: The user ids to send the message to

plugin_to_tag
: The tag ids to send the message to
