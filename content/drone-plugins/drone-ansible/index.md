---
version: '1.0'
date: 2019-02-15T00:00:00+00:00
title: Ansible
author: drone-plugins
tags: [ infrastructure, ops, ansbile, deploy  ]
logo: ansible.svg
repo: drone-plugins/drone-ansible
image: plugins/ansible
---

The Ansible plugin can be used to run ansible plays. The below sample pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: check ansible syntax
  image: plugins/ansible:1
  environment:
    additional_var:
      from_secret: additional_var
    another_var: foo
  settings:
    playbook: ansible/playbook.yml
    galaxy: ansible/requirements.yml
    inventory: ansible/inventory
    syntax_check: true
  when:
    event:
    - pull_request

- name: apply ansible playbook
  image: plugins/ansible:1
  environment:
    additional_var:
      from_secret: additional_var
    another_var: foo
  settings:
    playbook: ansible/playbook.yml
    galaxy: ansible/requirements.yml
    inventory: ansible/inventory
    private_key:
      from_secret: ansible_private_key
    vault_password:
      from_secret: ansible_vault_password
  when:
    event:
    - push
    - tag
```


# Parameter Reference

become
: run operations with become: true/false

become_method
: privilege escalation method to use

become_user
: run operations as this user

check
: run a check, do not apply any changes: true/false

connection
: connection type to use

diff
: show the differences, may print secrets: true/false

extra_vars
: set additional variables as key=value: 'key1=value1,[key2=value2]'

flush_cache
: clear the fact cache for every host in inventory: true/false

force_handlers
: run handlers even if a task fails: true/false

forks
: specify number of parallel processes to use: number, default: 5

galaxy
: path to galaxy requirements

galaxy_force
: force overwriting an existing role or collection: true/false, default: true

inventory
: specify (multiple) inventory host path(s): 'path1,[path2]'

limit
: further limit selected hosts to an additional pattern

list_hosts
: outputs a list of matching hosts: true/false

list_tags
: list all available tags: true/false

list_tasks
: list all tasks that would be executed: true/false

module_path
: prepend paths to module library: 'path1,[path2]'

playbook
: list of playbooks to apply: 'playbook1,[playbook2]'

private_key
: use this key to authenticate the ssh connection

requirements
: path to python requirements

scp_extra_args
: specify extra arguments to pass to scp only

sftp_extra_args
: specify extra arguments to pass to sftp only

ssh_common_args
: specify common arguments to pass to sftp/scp/ssh

ssh_extra_args
: specify extra arguments to pass to ssh only

skip_tags
: only run plays and tasks whose tags do not match

start_at_task
: start the playbook at the task matching this name

syntax_check
: perform a syntax check on the playbook: true/false

tags
: only run plays and tasks tagged with these values

timeout
: override the connection timeout in seconds: number, default: 0

user
: connect as this user

vault_id
: the vault identity to use

vault_password
: the vault password to use

verbose
: level of verbosity, 0 up to 4: number, default: 0

# Hints

Please use the the secret stores provided by drone, or any external. Do not commit secrets into any public repositories.

To create a key-pair matching the required format, you can use this oneliner:
ssh-keygen -m PEM -t rsa -b 4096

Format of private key, particular when adding to Drone's secret stores:

    -----BEGIN RSA PRIVATE KEY-----
    keydata_on_one_line
    -----END RSA PRIVATE KEY-----

Tip: Preferably put your playbooks into a dot-folder, as to reduce interaction with the rest of your repository data, i.e:

    .ansible/
