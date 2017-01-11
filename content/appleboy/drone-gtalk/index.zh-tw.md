---
date: 2017-01-11T00:00:00+00:00
title: GTalk
author: appleboy
tags: [ notifications, chat ]
repo: appleboy/drone-gtalk
logo: gtalk.svg
image: appleboy/drone-gtalk
---

The GTalk plugin posts build status messages to your google account. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  gtalk:
    image: appleboy/drone-gtalk
    google_host: talk.google.com:443
    google_username: xxxxxxxxxx
    google_password: xxxxxxxxxx
    to: google_user_email_account
```

Example configuration for success and failure messages:

```diff
pipeline:
  gtalk:
    image: appleboy/drone-gtalk
    google_host: talk.google.com:443
    google_username: xxxxxxxxxx
    google_password: xxxxxxxxxx
    to: google_user_email_account
+   when:
+     status: [ success, failure ]
```

Example configuration with a custom message template:

```diff
pipeline:
  gtalk:
    image: appleboy/drone-gtalk
    google_host: talk.google.com:443
    google_username: xxxxxxxxxx
    google_password: xxxxxxxxxx
    to: google_user_email_account
+   message: |
+     {{ #success build.status }}
+       build {{ build.number }} succeeded. Good job.
+     {{ else }}
+       build {{ build.number }} failed. Fix me please.
+     {{ /success }}
```

# Secrets

The GTalk plugin supports reading credentials from the Drone secret store. This is strongly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  gtalk:
    image: appleboy/drone-gtalk
    google_host: talk.google.com:443
-   google_username: xxxxxxxxxx
-   google_password: xxxxxxxxxx
    to: google_user_email_account
```

The `google_username` or `google_password` attributes can be replaced with the below secret environment variables. Please see the Drone documentation to learn more about secrets.

PLUGIN_GOOGLE_USERNAME
: google user email account

PLUGIN_GOOGLE_PASSWORD
: google user email password

# Parameter Reference

google_host
: default value is talk.google.com:443

google_username
: google user account

google_password
: google user password

to
: google user account

message
: overwrite the default message template

# Template Reference

repo.owner
: repository owner

repo.name
: repository name

build.status
: build status type enumeration, either `success` or `failure`

build.event
: build event type enumeration, one of `push`, `pull_request`, `tag`, `deployment`

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

# Template Function Reference

uppercasefirst
: converts the first letter of a string to uppercase

uppercase
: converts a string to uppercase

lowercase
: converts a string to lowercase. Example `{{lowercase build.author}}`

datetime
: converts a unix timestamp to a date time string. Example `{{datetime build.started}}`

success
: returns true if the build is successful

failure
: returns true if the build is failed

truncate
: returns a truncated string to n characters. Example `{{truncate build.sha 8}}`

urlencode
: returns a url encoded string

since
: returns a duration string between now and the given timestamp. Example `{{since build.started}}`
