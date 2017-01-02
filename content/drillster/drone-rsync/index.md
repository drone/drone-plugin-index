---
author: "drillster"
date: 2017-01-02T08:21:35+01:00
image: "drillster/drone-rsync"
repo: "drillster/drone-rsync"
tags: [ publish, rsync, ssh ]
logo: rsync.jpg
title: rsync
---

The rsync plugin can be used to transfer files to remote machines, and run a user-defined script afterwards.

```yaml
pipeline:
  build:
    image: maven:alpine
    commands:
      - mvn -B clean package
      - md5sum target/app.jar > app.jar.md5
  deploy:
    image: drillster/drone-rsync
    hosts: [ "server-prod1", "server-prod2" ]
    source: ./target
    target: ~/packages
    include: [ "app.jar", "app.jar.md5" ]
    exclude: [ "**.*" ]
    script:
      - cd ~/packages
      - md5sum -c app.jar.md5
```

{{% alert info %}}
The plugin will transfer files to a host and execute the defined script on that host before moving on to the next host. If a transfer fails, or any of the commands in the defined script returns a non-zero exit code, the plugin will stop and fail the build.
{{% /alert %}}

The `user` attribute defines the user that will login on the remote machines and execute the defined script.

{{% alert warn %}}
If the user isn't specified, `root` will be used.
{{% /alert %}}

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

# Secrets

The rsync plugin supports reading credentials from the Drone secret store. This is strongly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  deploy:
    image: drillster/drone-rsync
    hosts: [ "server-prod1", "server-prod2" ]
-   user: foobar
-   key: "-----BEGIN RSA PRIVATE KEY----- ...."
    source: ./target
    target: ~/packages
    include: [ "app.jar", "app.jar.md5" ]
    exclude: [ "**.*" ]
    script:
      - cd ~/packages
      - md5sum -c app.jar.md5
```

Sensitive plugin attributes can be replaced with the below secret environment variables. Please see the Drone [documentation]({{< secret-link >}}) to learn more about secrets.

RSYNC_USER
: corresponds to `user`

RSYNC_KEY
: corresponds to `key`

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

script
: list of commands to execute on remote machines over SSH
