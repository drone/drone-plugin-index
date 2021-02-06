---
version: '1.4.2'
date: 2021-02-06-T00:00:00+00:00
title: Molecule
author: OSSHelp
tags: [ molecule, ansible, testinfra ]
logo: ansible.svg
repo: osshelp/drone-molecule
image: osshelp/drone-molecule
---

Plugin for testing Ansible roles via Molecule (+testinfra).

# Usage examples

``` yaml
---
kind: pipeline
name: test

steps:
  - name: test
    image: osshelp/drone-molecule
    environment:
      LXD_REMOTE_PASSWORD:
        from_secret: lxd_remote_password
    settings:
      action: test

---
kind: pipeline
name: publish

depends_on: [test]
trigger:
  status: [success]
  event: [push, tag]
  ref:
    - refs/heads/*
    - refs/tags/*

steps:
  - name: publish
    image: osshelp/drone-molecule
    environment:
      MINIO_USER:
        from_secret: minio_user
      MINIO_SECRET:
        from_secret: minio_secret
    settings:
      action: upload
```

# Parameter Reference

## Modes

action
: just test, upload or test plus upload (values: test, upload, release)

## Other

scenario
: molecule scenario (default: `default`)

lxd_remote_host and lxd_remote_port
: LXD connection parameters

release_directory
: the name of the local temporary folder to create an archive with the role

ansible_requirements
: The path to the requirements file that will be used to load roles. (default: `requirements.yml`)

ansible_profiler: an option to control ansible-profiler (default: `true`)

ansible_errors_fatal
: whether to consider all errors during the execution of roles at the stage of rolling the playbook fatal (default: `true`)

minio_alias
: the name that will be used when generating the variable for minio-client. (default: `remote`)

minio_host and minio_bucket
: minio connection parameters

upload_prefix
: nested directories inside bucket

upload_as
: override archive name with role

minio_debug
: debug mode for minio

release_alias
: upload alias (see "Release aliases below")

debug
: debug mode

### Release aliases

Here are examples of how release_alias option works by default (w/out specific value):

* on tag -> alias will be `stable`
* on push to master branch -> alias will be `latest`
* on push to any other branch -> branch name will be used as an alias

## Links

* [Molecule Documentation](https://molecule.readthedocs.io/)
* [Plugin sources at Github](https://github.com/OSSHelp/drone-molecule)
* [Plugin image at DockerHub](https://hub.docker.com/r/osshelp/drone-molecule)
