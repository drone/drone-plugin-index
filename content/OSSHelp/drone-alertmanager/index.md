---
version: '1.1.2'
date: 2021-02-06-T00:00:00+00:00
title: Alertmanager
author: OSSHelp
tags: [ prometheus, alertmanager, silences ]
logo: prometheus.svg
repo: osshelp/drone-alertmanager
image: osshelp/drone-alertmanager
---

This plugin creates and removes silences in AlertManager.


# Usage examples

An example of use in a build step for "typical" container deployment. Adding the silence with required matchers:

``` yaml
- name: add silence
    image: osshelp/drone-alertmanager
    settings:
      urls:
        - https://clientname.monitoring.fqdn/alertmanager
      action: create
      template: default
      duration: 600
      job: '^clientname$'
      instance: '^server-\w+.+'
```

Then, after step with deployment, remove the silence:


```yaml
  - name: remove silence
    image: osshelp/drone-alertmanager
    settings:
      urls:
        - https://clientname.monitoring.fqdn/alertmanager
      action: delete
    when:
      status:
        - success
        - failure
```

# Templates

## default

So far, the main and only template.

``` json
{
  "id": null,
  "createdBy": "drone/alertmanager",
  "startsAt": "2020-11-14T02:27:07.429780Z",
  "endsAt": "2020-11-14T02:29:07.429780Z",
  "comment": "Created for build#42 of orgname/reponame, see http://ci.server.fqdn/link/to/build",
  "matchers": [
    {
      "isRegex": true,
      "name": "job",
      "value": "^clientname$"
    },
    {
      "isRegex": true,
      "name": "instance",
      "value": "^server-\\w+.+"
    }
  ]
}
```

# Parameter Reference

## Modes

action
: creates or removes silences (values: create, delete)

## Other

urls
: list of urls to send a request

duration
: duration of added silence (only for create action)

template
: one of the available request body templates

strict_match
: checking for an exact match of all alert conditions (false by default)

valid_response_codes
: list of expected HTTP response codes

headers
: additional request headers

custom_template
: arbitrary request body (Jinja syntax with access to environment variables is supported)

username and password
: credentials for HTTP authorization

skip_verify
: disable SSL certificate verification (for self-signed ones)

follow_redirects
: follow a 301/302 redirect

timeout
: maximum time to wait for a response (in seconds)

## Links

* [Alertmanager Documentation](https://prometheus.io/docs/alerting/latest/alertmanager/)
* [Plugin sources at Github](https://github.com/OSSHelp/drone-alertmanager)
* [Plugin image at DockerHub](https://hub.docker.com/r/osshelp/drone-alertmanager)
