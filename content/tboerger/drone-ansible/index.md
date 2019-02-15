---
version: '1.0'
date: 2019-02-15T00:00:00+00:00
title: Ansible
author: tboerger
tags: [ infrastructure, ops, ansbile, deploy  ]
logo: ansible.svg
repo: drone-plugins/drone-ansible
image: plugins/ansible
---

The Ansible plugin can be used to run ansible plays. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
name: default

steps:
- name: ansible-check
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

- name: ansible-apply
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

---
kind: secret

data:
  ansible_private_key: ANSIBLE_PRIVATE_KEY
  ansible_vault_password: ANSIBLE_VAULT_PASSWORD
  additional_var: ADDITIONAL_VAR
```

Please use the the secret stores provided by drone, or any external. Do not commit secrets into any public repositories.

Tip: Preferably put your playbooks into a dot-folder, as to reduce interaction with the rest of your repository data, i.e:

    .ansible/


# Secret Reference

ANSIBLE_PRIVATE_KEY
: private key for ansible user to ssh into target instance

format:

    -----BEGIN RSA PRIVATE KEY-----
    keydata_on_one_line
    -----END RSA PRIVATE KEY-----

ANSIBLE_VAULT_PASSWORD
: passworde to decrypt included vaults

ADDITIONAL_VAR
: additional variables
