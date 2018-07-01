---
date: 2018-07-01T00:00:00+00:00
title: Rancher
author: wayneconnolly
tags: [ deploy, rancher, stack, v1, docker ]
logo: rancher.svg
repo: wayneconnolly/drone-rancher-stack-v1
image: dubc/drone-rancher-stack-v1
---

# drone-rancher-stack-v1

A drone.io Rancher Stack plugin to deploy/update an entire Rancher stack (not just a single service).

## Plugin Details
-   [Rancher v1.6 stable compatible](https://rancher.com/docs/rancher/v1.6/en/)
-   Rancher-compose v0.12.5

Note: [Rancher v2](https://rancher.com/docs/rancher/v2.x/en/) will be a new plugin once v2.1 stable is released. See notes at bottom.

## Requirements

- A repo that contains your Rancher stack (I put mine inside of a folder called 'stack'
-- docker-compose.yml
-- rancher-compose.yml
- Rancher Environment set-up with at least one active host
- Rancher Environment set-up with a stack (empty or not)
- Rancher Environment Access and Secret Keys

## Parameter Reference
The plugin requires the following

image
dubc/drone-rancher-stack-v1  

    url
The url where your rancher resides. E.g rancher.domain.com

    stack
This stack must already exist in your rancher environment. E.g app-staging

    accesskey
Your Rancher environment Access_Key

    secretkey
Your Rancher environment Secret_Key

    pull: true

Makes sure you get the latest plugin version

## Drone Pipeline Example

    pipeline:
      compile-javascript:
        image: node:8.9.4
        commands:
          - yarn
          - yarn build
          - git clone 'https://github.com/USERNAME/app-rancher-stack.git' rancher
    
      docker-registry-push:
        image: plugins/docker
        repo: registry.domain.com:5000/app
        registry: registry.domain.com:5000
        username: REGISTRY_USERNAME
        password: REGISTRY_PASSWORD
        insecure: true
        pull: true
            
      rancher-v1-staging-upgrade:
        image: dubc/drone-rancher-stack-v1
        url: rancher.domain.com
        stack: app-staging        
        accesskey: RANCHER_ACCESS_KEY
        secretkey: RANCHER_SECRET_KEY
        pull: true



## Drone Step Output

    rancher-compose.yml @ /drone/src/github.com/USERNAME/app/rancher/stack/rancher-compose.yml
    version: "2"
    services:
      app:
        scale: 1
        start_on_create: true
    
    docker-compose.yml @ /drone/src/github.com/USERNAME/app/rancher/stack/docker-compose.yml
    version: "2"
    services:
      app:
        ports:
        - "80:80/tcp"
        expose:
        - "80"
        labels:
          io.rancher.container.pull_image: always
        image: registry.domain.com:5000/app:latest
    
    Deploying Rancher Stack with force upgrade
    time="2018-07-01T00:51:38Z" level=debug msg="Environment Context from file : map[]" 
    time="2018-07-01T00:51:38Z" level=debug msg="Opening compose files: /drone/src/github.com/USERNAME/app/rancher/stack/docker-compose.yml" 
    time="2018-07-01T00:51:38Z" level=debug msg="Opening rancher-compose file: /drone/src/github.com/USERNAME/app/rancher/stack/rancher-compose.yml" 
    time="2018-07-01T00:51:38Z" level=debug msg="[0/1] [app]: Adding " 
    time="2018-07-01T00:51:38Z" level=debug msg="Looking for stack app-staging" 
    time="2018-07-01T00:51:38Z" level=debug msg="Found stack: app-staging(1st92)" 
    time="2018-07-01T00:51:38Z" level=debug msg="Launching action for app" 
    time="2018-07-01T00:51:38Z" level=debug msg="Project [app-staging]: Creating project " 
    time="2018-07-01T00:51:38Z" level=info msg="[0/1] [app]: Creating " 
    time="2018-07-01T00:51:38Z" level=debug msg="Finding service app" 
    time="2018-07-01T00:51:38Z" level=debug msg="Found service app" 
    time="2018-07-01T00:51:38Z" level=info msg="[0/1] [app]: Created " 
    time="2018-07-01T00:51:38Z" level=debug msg="Project [app-staging]: Project created " 
    time="2018-07-01T00:51:38Z" level=debug msg="Launching action for app" 
    time="2018-07-01T00:51:38Z" level=debug msg="Project [app-staging]: Starting project " 
    time="2018-07-01T00:51:38Z" level=info msg="[0/1] [app]: Starting " 
    time="2018-07-01T00:51:38Z" level=debug msg="Finding service app" 
    time="2018-07-01T00:51:38Z" level=debug msg="Found service app" 
    time="2018-07-01T00:51:41Z" level=info msg="Finished pulling registry.domain.com:5000/app:latest" 
    time="2018-07-01T00:51:41Z" level=debug msg="Finding service app" 
    time="2018-07-01T00:51:41Z" level=debug msg="Found service app" 
    time="2018-07-01T00:51:41Z" level=info msg="Updating app" 
    time="2018-07-01T00:51:41Z" level=info msg="Upgrading app" 
    time="2018-07-01T00:51:46Z" level=debug msg="Finding service app" 
    time="2018-07-01T00:51:46Z" level=debug msg="Found service app" 
    time="2018-07-01T00:51:46Z" level=info msg="[1/1] [app]: Started " 
    time="2018-07-01T00:51:46Z" level=debug msg="Project [app-staging]: Project started " 

## Notes

- Rancher compose is pre-configured to force stack upgrade which will also create the stack if it doesn't exist
- Rancher Compose is baked into the plugin container and isn't configurable as it is the latest for the Rancher 1.6 stable
- Future versions will not take into account Rancher 2.1, I will create a new plugin for it called dubc/drone-rancher-stack-v2

