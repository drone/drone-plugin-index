---
date: 2018-01-07T00:00:00+00:00
title: Wechat
author: lizheming
tags: [ notifications, chat ]
repo: lizheming/drone-wechat
logo: wechat.svg
image: lizheming/drone-wechat
---

The Wechat plugin posts build status messages to your account. The below pipeline configuration demonstrates simple usage:

```diff
pipline:
  wechat:
    image: lizheming/drone-wechat
+   sckey: xxxxxx
    title: ${DRONE_REPO_NAME}
    message: >
      {%if success %}
        build {{build.number}} succeeded. Good job.
      {% else %}
        build {{build.number}} failed. Fix me please.
      {% endif %}
```

If you want push notification with your own wechat corp id, you can config like this:

```diff
pipeline:
  wechat:
    image: lizheming/drone-wechat
+   corpid: corpid
+   corp_secret: secret
+   agent_id: 1234567
+   to_user: 111
+   to_party: 112
+   to_tag: ${DRONE_REPO_NAME}
+   msg_url: ${DRONE_BUILD_LINK}
+   safe: 1
+   btn_txt: more
    title: ${DRONE_REPO_NAME}
    message: >
      {%if success %}
        build {{build.number}} succeeded. Good job.
      {% else %}
        build {{build.number}} failed. Fix me please.
      {% endif %}
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

safe
: encrypt message, default is false

msg_url
: The link for the text card click

btn_text
: The text for the button on the card

sckey
: SCKEY get from [ServerChan](http://sc.ftqq.com)

title
: Notification title

message
: Notification body message, support markdown

# Secret Reference

wechat_corpid
: The corpid for authorization

wechat_corp_secret
: The corp secret for authorization

wechat_agent_id
: The agent id to send the message

wechat_to_party
: The party ids to send message

wechat_to_user
: The user ids to send the message to

wechat_to_tag
: The tag ids to send the message to

wechat_sckey
: SCKEY get from [ServerChan](http://sc.ftqq.com)

# Template Reference

repo.owner
: repository owner

repo.name
: repository name

build.status
: build status type enumeration, either success or failure

build.event
: build event type enumeration, one of push, pull_request, tag, deployment

build.number
: build number

build.commit
: git sha for current commit

build.branch
: git branch for current commit

build.tag
: git tag for current commit

build.ref
: git ref for current commit

build.author
: git author for current commit

build.link
: link the the build results in drone

build.started
: unix timestamp for build started

build.finished
: unix timestamp for build finished

# Template Filter

uppercasefirst
: converts the first letter of a string to uppercase

datetime
: converts a unix timestamp to a date time string. Example {{build.started | datetime}}, you can see more info in [nunjucks-date-filter](https://www.npmjs.com/package/nunjucks-date-filter)

More filter can see [builtin-filters](https://mozilla.github.io/nunjucks/templating.html#builtin-filters)