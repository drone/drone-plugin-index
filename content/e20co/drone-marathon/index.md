---
date: 2017-01-06T18:00:00-06:00
title: Marathon
author: dellintosh
tags: [ deploy, marathon ]
repo: expansioncap/drone-marathon
logo: marathon.svg
image: e20co/drone-marathon
---

This plugin can be used to deploy applications to a [Marathon](https://mesosphere.github.io/marathon/) server. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  marathon:
    image: e20co/drone-marathon
    server: http://marathon.mesos:8080
```

# Marathon Configuration File

{{% alert info %}}
In addition to the `.drone.yml` file you will need to create a `marathon.json` file that contains the Marathon configuration.  Please see [here](https://github.com/mesosphere/marathon/tree/master/examples) for examples.
{{% /alert %}}

Example configuration with custom Marathon configuration file (default: `marathon.json`):

```diff
pipeline:
  marathon_dev:
    image: e20co/drone-marathon
    server: http://marathon.mesos:8080
+   marathonfile: develop/marathon-dev.json
  marathon_prod:
    image: e20co/drone-marathon
    server: http://marathon.mesos:8080
+   marathonfile: prod/marathon-prod.json
```

The `trigger_restart` will force Marathon to restart the application after install.  This might be necessary if Marathon doesn't detect a change in the application but you want to force a restart.

```diff
pipeline:
  marathon:
    image: e20co/drone-marathon
    server: http://marathon.mesos:8080
+   trigger_restart: true
```

Example configuration with `values` substitution:

```diff
pipeline:
  marathon:
    image: e20co/drone-marathon
    server: http://marathon.mesos:8080
+   values: [drone_branch]
```

In the `marathon.json` file (please note the `<<` and `>>` around the `DRONE_BRANCH` key):

```js
{
  "id": "/my-application/branch-<<DRONE_BRANCH>>",
  ...
}
```

Will result in:

```js
{
  "id": "/my-application/branch-mybranch",
  ...
}
```

Example configuration using values from secrets:

```diff
pipeline:
  marathon:
    image: e20co/drone-marathon
    server: http://marathon.mesos:8080
+   secrets: [database_password]
+   values: [database_password, drone_branch]
```

The secret above can be injected into your `marathon.json` file using the `<<DATABASE_PASSWORD>>` placeholder.  Any secrets can be used in this way, assuming they are available to the build process.

*NOTE:* Because the plugin does not have direct access to the `secrets` list directly, they must be specified in the `values` list also (see https://github.com/drone/drone/issues/2088 for details).

# Secrets

This module does not have any pre-defined secrets, however, any secrets can be injected into the `marathon.json` file as desired.  See example above.

# Parameter Reference

server
: The Marathon server URL. defaults to `http://marathon.mesos:8080`

marathonfile
: The Marathon configuration file. defaults to `marathon.json`.

trigger_restart
: Force a restart of the application. defaults to `false`.

values
: Map of values to replace in the `marathonfile`, above.  Optional.
