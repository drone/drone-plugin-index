---
version: '1.0'
date: 2019-08-27T00:00:00+00:00
title: Metronome
author: naorlivne
tags: [ deploy, metronome ]
logo: metronome.svg
repo: naorlivne/drone-metronome
image: naorlivne/drone-metronome
---

This plugin can be used to deploy applications to a Metronome server, it will create\update the given Metronome tasks as needed.

The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
name: default

steps:
- name: metronome_deploy
  image: naorlivne/drone-metronome
  settings:
    metronome_host: http://metronome.mesos:9000
    metronome_job_file: metronome.json
```

# Metronome Configuration File

{{% alert info %}}
In addition to the `.drone.yml` file you will need to create a `metronome.json` file that contains the Metronome configuration. Please see [here](test/test_files/metronome.json) for an example. 
{{% /alert %}}

# Value substitution

Example configuration with values substitution:
```yaml
pipeline:
name: default

steps:
- name: metronome_deploy
  image: naorlivne/drone-metronome
  settings:
    metronome_host: http://metronome.mesos:9000
    metronome_job_file: metronome.json
    my_image_tag: my_dynamic_image
```

In the metronome.json file (please note the $ before the PLUGIN_MY_IMAGE_TAG key):

```json
{
  ...
  "image": "myrepo/myimage:$PLUGIN_MY_IMAGE_TAG",
  ...
}
```

will result in:

```json
{
  ...
  "image": "myrepo/myimage:my_dynamic_image",
  ...
}
```

# Parameter Reference

metronome_host
: The Metronome server URL (no trailing slash should be used), defaults to `http://metronome.mesos:9000`

metronome_job_file
: The Metronome configuration file location relative to the root folder of the repo, defaults to `metronome.json`
