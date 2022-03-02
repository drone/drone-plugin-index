---
date: 2020-07-16T00:00:00+00:00
title: Portainer Stack Deploy
author: LGinC
tags: [ deployment]
logo: portainer.svg
repo: lginc/drone-portainer
image: lginc/drone-portainer
---

# drone-portainer
[![Docker Pulls](https://img.shields.io/docker/pulls/lginc/drone-portainer.svg)](https://hub.docker.com/r/lginc/drone-portainer/)
+ plugin of drone continuous deployment to portainer
+ The drone plugin can be used to deploy a Docker image to a Drone environment.The below pipeline configuration demonstrates simple usage:

docker-compose in step

```yaml
steps:
- name: portainer
  image: lginc/drone-portainer
  settings:
    serverurl: http://xxxxx:9000
    username: 
      from_secret: portainer_username
    password:
      from_secret: portainer_password
    endpointId: 1
    stackname: xxxservice
    variables:
      - tag=dev
    imagenames: 
      - xxx/xxx
      - myhub.com/xx1/xxx
    env:
      - TZ:Asia/Shanghai
      - myTag:App
    docker_compose: |
      version: "3"
      services:
        xxx:
          image: xxx/xxx:{{ tag }}
          ports:
          - 80:80
        xx1:
          image: myhub.com/xx1/xxx
```
or

<br>docker-compose in repository

```yaml
steps:
- name: portainer
  image: lginc/drone-portainer
  settings:
    serverurl: http://xxxxx:9000
    access_token: 
      from_secret: portainer_ak
    endpointId: 2
    stackname: xxxservice
    imagenames: 
      - xxx/xxx
    env:
      - myTag:App
    docker_compose_path: deploy/docker-compose.yaml
    repo_username:
      from_secret: repo_username
    repo_password:
      from_secret: repo_password
```
# Parameter Reference

+ serverurl
: required, portainer server url. like this: http://xxx.com:9000

+ username
: optional, portainer username

+ password
: optional, portainer password

+ access_token
: optional, portainer account  [access token](https://docs.portainer.io/v/ce-2.11/api/access), login by username password or access_token. 
click on my account in the top right -> Scroll down to the Access tokens section -> click the Add access token 


+ endpointId
: optional, portainer endpoint id,default 1, localhost is 1 

+ stackname
: required, name of stack, show in stack list 

+ imagenames
: optional, names of pull images, a arrary. add this param because not auto pull image when image:tag not change in docker-compose
 like this: 

```yaml
- mcr.microsoft.com/dotnet/core/aspnet:6.0-alpine  
- alpine:latest
```


+ env:
: optional, environments of stack.
![env](https://p.sda1.dev/5/b982dedaf195db23d1767701e4200ebd/msedge_xwrxILQuNN.webp)

+ variables:
: optional, these variables will be replaced in docker-compose file，  Foo=bar will replace {{ Foo }} for bar.

+ docker_compose
: optional, content of docker-compose.yml.  it will be filled by original stack when stack exist.
sample like this:

```
docker_compose: |
  version: "3"
  services:
    dotnettest:
      image:  mcr.microsoft.com/dotnet/core/aspnet:6.0-alpine
      container_name: dotnet_runtime
```

+ docker_compose_path
: optional, docker-compose.yml in repository relative path. just need choose one between docker_compose and docker_compose_path.
note: if stack exist, it will be use original content of stack, not content of docker-compose.yml in repository, so docker_compose_path can work when stack not exist


+ repo_username
: optional, username of git repository


+ repo_password
: optional, password of git repository


