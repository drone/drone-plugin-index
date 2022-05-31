---
date: 2021-11-07T00:00:00+00:00
title: Buildah
author: drone-plugins
tags: [buildah, cache, amazon, aws, s3]
logo: buildah.svg
repo: drone-plugins/drone-buildah
image: plugins/buildah-docker
---

The buildah plugin allows you to build images without privileges. The below pipeline configuration demonstrates simple usage: 

```yaml
kind: pipeline
name: default

steps
: - name: publish  
  image: plugins/buildah
  settings
  :     repo: docker.io/harness/ci-automation
    registry: docker.io
    password: <username>
    username: <password>
    dockerfile: Dockerfile
    tags: buildahoutput
    layers: true
    s3_local_cache_dir: ./test
    s3_bucket: <s3_bucket_name>
    s3_region: us-east-1
    s3_key: <s3_access_key>
    s3_secret: <s3_secret>
    s3_endpoint: s3.amazonaws.com
  ```

# Parameter Reference

All optionals, most pf the flags are similar to what docker have, also check https://github.com/containers/buildah/blob/main/README.md: 

dry-run
: dry run disables docker push

remote.url
: git remote url

commit.sha
: git commit sha

commit.ref
: git commit ref

dockerfile
: dockerfile used to build, default "Dockerfile"

context
: build context

tags
: tag used to tage built image, default "latest

tags.auto
: default build tags,

tags.suffix
: default build tags with suffix

args
: build args,

args-from-env
: build args

quiet
: quiet docker build

target
: build target

squash
: squash the layers at build time

pull-image
: force pull base image at build time

compress
: compress the build context using gzip

repo
: docker repository used to push image

custom-labels
: additional k=v labels

label-schema
: label-schema labels

auto-label
: auto-label true|false

link
: link, for example https://example.com/org/repo-name

docker.registry
: docker registry used tp push image, default "https://index.docker.io/v1/"

docker.username
: docker username

docker.password
: docker password

docker.email
: docker email

docker.config
: docker json dockerconfig content

docker.purge
: docker should cleanup images

repo.branch
: repository default branch

no-cache
: do not use cached intermediate containers

add-host
: additional host:IP mapping

layers
: Use layered caching

s3-local-cache-dir
: local directory for saving S3 based cache, only usable when layers is set to true

s3-bucket
: S3 bucket name, only usable when layers is set to true

s3-endpoint
: S3 endpoint address, only usable when layers is set to true

s3-region
: S3 region, only usable when layers is set to true

s3-key
: S3 access key, only usable when layers is set to true

s3-secret
: S3 access secret, only usable when layers is set to true

s3-use-ssl
: Enable SSL for S3 connections, only usable when layers is set to true