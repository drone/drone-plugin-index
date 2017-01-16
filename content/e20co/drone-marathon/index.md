---
author: "dellintosh"
date: 2017-01-06T18:00:00-06:00
image: "e20co/drone-marathon"
repo: "e20co/drone-marathon"
tags: [ publish, marathon ]
logo: marathon.svg
title: marathon
---

This plugin can be used to deploy applications to a [Marathon](https://mesosphere.github.io/marathon/) server. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  marathon:
    image: e20co/drone-marathon:0.5
    server: http://marathon.mesos:8080
```

# Marathon Configuration File

{{% alert info %}}
In addition to the `.drone.yml` file you will need to create a `marathon.json` file that contains the Marathon configuration.  Please see [here](https://github.com/mesosphere/marathon/tree/master/examples) for examples.
{{% /alert %}}

Example configuration with custom Marathon configuration file:

```diff
pipeline:
  marathon_dev:
    image: e20co/drone-marathon:0.5
    server: http://marathon.mesos:8080
+   marathonfile: marathon-dev.json
  marathon_prod:
    image: e20co/drone-marathon:0.5
    server: http://marathon.mesos:8080
+   marathonfile: marathon-prod.json  
```

The `trigger_restart` will force Marathon to restart the application after install.  This might be necessary if Marathon doesn't detect a change in the application but you want to force a restart.

```diff
pipeline:
  marathon:
    image: e20co/drone-marathon:0.5
    server: http://marathon.mesos:8080
+   trigger_restart: true
```

Example configuration with `values` substitution:

```diff
pipeline:
  marathon:
    image: e20co/drone-marathon:0.5
    server: http://marathon.mesos:8080
+   values:
+     BRANCH_NAME: ${DRONE_BRANCH}  # Where ${DRONE_BRANCH} = "mybranch"
```

In the `marathon.json` file (please note the `<<` and `>>` around the `BRANCH_NAME` key):

```js
{
  "id": "/my-application/branch-<<BRANCH_NAME>>",
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

# Secrets

The Marathon plugin supports reading credentials from the Drone secret store. This is highly recommended instead of storing credentials in the pipeline configuration in plain text.

```diff
pipeline:
  marathon:
    image: e20co/drone-marathon:0.5
    server: http://marathon.mesos:8080
    values:
-     DATABASE_PASSWORD: SomeSecretPassword
+     DATABASE_PASSWORD: ${DATABASE_PASSWORD}
```

The above example will replace the `DATABASE_PASSWORD` value set in the Drone secret store as appropriate.  Any secret defined for `--image=e20co/drone-marathon` will be made available for use in your `.drone.yml`.  Please see the Drone documentation to learn more about secrets.

# Parameter Reference

server
: The Marathon server URL. defaults to `http://marathon.mesos:8080`

marathonfile
: The Marathon configuration file. defaults to `marathon.json`.

trigger_restart
: Force a restart of the application. defaults to `false`.

values
: Map of values to replace in the `marathonfile`, above.  Optional.
