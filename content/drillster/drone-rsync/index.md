---
author: "drillster"
date: 2017-01-02T08:21:35+01:00
image: "drillster/drone-rsync"
repo: "drillster/drone-rsync"
tags: [ publish, rsync, ssh ]
logo: rsync.svg
title: rsync
---

The rsync plugin can be used to transfer files to remote machines, and run a user-defined script afterwards.

```yaml
pipeline:
  deploy:
    image: drillster/drone-rsync
    hosts: [ "server-prod1", "server-prod2" ]
    source: ./target
    target: ~/packages
    include: [ "app.jar", "app.jar.md5" ]
    script:
      - cd ~/packages
      - md5sum -c app.jar.md5
```

The `user` attribute defines the user that will login on the remote machines and execute the defined script.

```diff
pipeline:
  deploy:
    image: drillster/drone-rsync
    hosts: [ "server-prod1", "server-prod2" ]
+   user: foobar
    source: ./target
    target: ~/packages
    include: [ "app.jar", "app.jar.md5" ]
    exclude: [ "**.*" ]
    script:
      - cd ~/packages
      - md5sum -c app.jar.md5
```

The `key` attribute specifies the private key to use when setting up secure connections to the remote machines.

```diff
pipeline:
  deploy:
    image: drillster/drone-rsync
    hosts: [ "server-prod1", "server-prod2" ]
+   key: "-----BEGIN RSA PRIVATE KEY----- ...."
    source: ./target
    target: ~/packages
    include: [ "app.jar", "app.jar.md5" ]
    exclude: [ "**.*" ]
    script:
      - cd ~/packages
      - md5sum -c app.jar.md5
```

# Parameter Reference

hosts
: list of hosts (remote machines)

port
: port to connect to on the remote machines, defaults to `22`

user
: user to log in as on the remote machines, defaults to `root`

key
: private SSH key for the remote machines

source
: source folder to copy from, defaults to `./`

target
: target folder on remote machines to copy to

include
: rsync include filter

exclude
: rsync exclude filter

recursive
: instruct plugin to recursively copy, can be `true` or `false`, defaults to `false`

delete
: instruct plugin to delete the target folder before copying, can be `true` or `false`, defaults to `false`

args
: instruct plugin to use these additional rsync CLI arguments, example: `"--blocking-io"`

script
: list of commands to execute on remote machines over SSH
