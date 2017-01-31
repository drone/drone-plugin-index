---
author: "drillster"
date: 2017-01-31T08:00:35+01:00
image: "drillster/drone-email"
repo: "drillster/drone-email"
tags: [ notifications, email ]
logo: email.svg
title: Email
---

The email plugin can be used to notify people of a build result.

The example configuration below will send an email to the build's author and the configured `recipients` (the-admin@your-domain.com and octocat@your-domain.com) when a build result changes or when it fails.
It will use the `username` and `password` to connect to `host` and send emails from `from`.
```yaml
pipeline:
  notify:
    image: drillster/drone-email
    host: smtp.some-server.com
    username: foo
    password: bar
    from: drone@your-domain.com
    when:
      status: [ changed, failure ]
```

You can have the plugin send mails to a pre-configured list of `recipients` by default:

```diff
pipeline:
  notify:
    image: drillster/drone-email
    host: smtp.some-server.com
    username: foo
    password: bar
    from: drone@your-domain.com
+   recipients: the-admin@your-domain.com,octocat@your-domain.com
    when:
      status: [ changed, failure ]
```

If you do not want to send a mail to the build's author (but only to `recipients`), use the `recipients_only` parameter:

```diff
pipeline:
  notify:
    image: drillster/drone-email
    host: smtp.some-server.com
    username: foo
    password: bar
    from: drone@your-domain.com
    recipients: the-admin@your-domain.com,octocat@your-domain.com
+   recipients_only: true
    when:
      status: [ changed, failure ]
```

Should you want to skip SMTP server certificate verification, use the `skip_verify` parameter:

```diff
pipeline:
  notify:
    image: drillster/drone-email
    host: smtp.some-server.com
+   skip_verify: true
    username: foo
    password: bar
    from: drone@your-domain.com
    recipients: the-admin@your-domain.com,octocat@your-domain.com
    when:
      status: [ changed, failure ]
```

{{% alert warn %}}
Keep in mind that you should use secrets for sensitive parts of the configuration!
{{% /alert %}}

# Parameter Reference

from
: Send notifications from this address

host
: SMTP server host

port
: SMTP server port, defaults to `587`

username
: SMTP username

password
: SMTP password

skip_verify
: Skip verification of certificates, defaults to `false`

recipients
: List of recipients to send this mail to (besides the commit author)

recipients_only
: Do not send mails to the commit author, but only to recipients, defaults to `false`

subject
: The subject line template ([handlebars](http://handlebarsjs.com/expressions.html) template)

body
: The email body template ([handlebars](http://handlebarsjs.com/expressions.html) template). This can be an inline template, or a URL (`file:///` allowed).

# Template Reference

repo.fullName
: repository full name

repo.owner
: repository owner

repo.name
: repository name

repo.SCM
: repository SCM (git)

repo.link
: link to the repository

repo.avatar
: repository avatar URL

repo.branch
: repository default branch

repo.private
: repository is private

repo.trusted
: repository is trusted

remote.URL
: remote clone URL

commit.SHA
: git commit SHA

commit.ref
: git commit ref (`/refs/heads/master`)

commit.branch
: git commit branch (`master`)

commit.link
: link to git commit

commit.message
: git commit message

commit.author.name
: git commit author name

commit.author.email
: git commit author email address

commit.author.avatar
: git commit author avatar URL

build.number
: build number

build.event
: build event, one of `push`, `pull_request`, `tag`, `deployment`

build.status
: build status, either `success` or `failure`

build.link
: link to the build details in Drone

build.created
: unix timestamp specifying when the build was created (in seconds)

build.started
: unix timestamp specifying when the build was started (in seconds)

build.finished
: unix timestamp specifying when the build was finished (in seconds)

prev.build.status
: previous build status, either `success` or `failure`

prev.build.number
: previous build number

prev.commit.SHA
: previous build git commit SHA

job.status
: matrix job status, either `success` or `failure`

job.exitCode
: matrix job exit code

job.started
: unix timestamp specifying when the matrix job was started (in seconds)

job.finished
: unix timestamp specifying when the matrix job was finished (in seconds)

yaml.signed
: Drone YAML is signed

yaml.verified
: Drone YAML is verified

tag
: created git tag

pullRequest
: pull request number

deployTo
: deployment environment

# Template Functions

uppercasefirst
: converts the first character of a string to uppercase

uppercase
: converts a string to uppercase

lowercase
: converts a string to lowercase. Example `{{lowercase commit.author.name}}`

datetime
: converts a unix timestamp to a date time string, using a format and a timezone. Example `{{datetime build.created "Mon Jan 2 15:04:05 MST 2006" "Local"}}`

success
: conditional which returns true if the build is successful

failure
: conditional which returns true if the build has failed

truncate
: returns a truncated string to n characters. Example `{{truncate commit.SHA 8}}`

urlencode
: returns a url encoded string
