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

```yaml
pipline:
  wechat:
    image: lizheming/drone-wechat
    sckey: xxxxxx
    title: "plugin notification"
    message: >
      {%if success %}
        build {{build.number}} succeeded. Good job.
      {% else %}
        build {{build.number}} failed. Fix me please.
      {% endif %}
```

# Praameter Reference

sckey
: SCKEY get from [ServerChan](http://sc.ftqq.com)

title
: Notification title
message
: Notification body message, support markdown

# Secret Reference

server\_chan\_key
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