---
date: 2017-01-16T00:00:00+00:00
title: Jenkins
author: appleboy
tags: [ infrastructure, trigger, jenkins ]
repo: appleboy/drone-jenkins
logo: jenkins.svg
image: appleboy/drone-jenkins
---

The Jenkins plugin allows you to trigger Jenkins job automatically. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  jenkins:
    image: appleboy/drone-jenkins
    url: http://example.com
    user: appleboy
    token: xxxxxxxxxx
    job: drone-jenkins-plugin-job
```

Example configuration for success builds:

```diff
pipeline:
  jenkins:
    image: appleboy/drone-jenkins
    url: http://example.com
    user: appleboy
    token: xxxxxxxxxx
    job: drone-jenkins-plugin-job
+   when:
+     status: [ success ]
```

Example configuration with multiple jobs:

```yaml
pipeline:
  jenkins:
    image: appleboy/drone-jenkins
    url: http://example.com
    user: appleboy
    token: xxxxxxxxxx
    job:
+     - drone-jenkins-plugin-job-1
+     - drone-jenkins-plugin-job-2
```

Example configuration with jobs in the folder:

```yaml
pipeline:
  jenkins:
    image: appleboy/drone-jenkins
    url: http://example.com
    user: appleboy
    token: xxxxxxxxxx
+   job: folder_name/job_name
```

It will trigger the URL of Jenkins job like as `http://example.com/job/folder_name/job/job_name/`

# Parameter Reference

url
: jenkins server base url.

user
: jenkins user account

token
: jenkins user token

job
: jenkins job name
