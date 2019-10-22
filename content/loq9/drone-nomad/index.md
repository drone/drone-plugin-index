---
date: 2019-10-22T00:00:00+00:00
title: Nomad
author: loq9
tags: [ nomad, orchestration ]
logo: nomad.svg
repo: loq9/drone-nomad
image: plugins/nomad
---

Use the Nomad plugin to deploy services from a template. You will need to supply Drone with the nomad template file. The below pipeline configuration demonstrates simple usage:

```yaml
steps:
- name: deploy
  image: loq9/drone-nomad
  settings:
    addr: https://your.nomad.server/...
    template: nomad-template.hcl
```

Example configuration with Token:

```yaml
steps:
- name: deploy
  image: loq9/drone-nomad
  settings:
    addr: https://your.nomad.server/...
    template: nomad-template.hcl
    token: nomad-token-sample
```

Example configuration using secrets:

```yaml
steps:
- name: deploy
  image: loq9/drone-nomad
  settings:
    addr: https://your.nomad.server/...
    template: nomad-template.hcl
    token:
      from_secret: nomadtoken
```

Sample nomad template configuration

```hcl
job "drone" {
  datacenters = ["dc1"]
  type = "service"

  update {
    stagger      = "10s"
    max_parallel = 3
  }

  group "ci-cd" {
    count = 3

    restart {
      attempts = 10
      interval = "5m"
      delay    = "25s"
      mode     = "delay"
    }

    task "drone" {
      driver = "docker"
      config {
        image = "drone/drone:1.2.3"

        port_map {
          http = 80
        }
      }

      resources {
        cpu    = 256
        memory = 256

        network {
          mbits = 10

          port "http" {}
        }
      }

      # Meta keys are also interpretable.
      meta {
        BUILD_NUMBER = "${DRONE_BUILD_NUMBER}"
        TAG = "${DRONE_TAG}"
      }

      service {
        name = "drone"
        port = "http"

        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "4s"
        }
      }
    }
  }
}
```
Note: It is possible to pass variables that will be replaced by drone based on envsubst as follows `${VAR}`

# Parameter Reference

addr
: Nomad server address

template
: Template for nomad

region
: Region for nomad

namespace
: Namespace for nomad

token
: Token for nomad