---
version: '0.8'
date: 2016-01-01T00:00:00+00:00
title: Terraform
author: jmccann
tags: [ infrastructure, build tool, terraform ]
logo: terraform.svg
repo: jmccann/drone-terraform
image: jmccann/drone-terraform
---

The Terraform plugin applies the infrastructure configuration contained within the repository. The below pipeline configuration demonstrates simple usage:

```yaml
kind: pipeline
type: docker
name: default

steps:
  - name: terraform
    image: jmccann/drone-terraform:1
    settings:
      plan: false
```

Example configuration passing `vars` to terraform commands:

```diff
pipeline:
  terraform:
    image: jmccann/drone-terraform:1
    plan: false
+   vars:
+     app_name: my-project
+     app_version: 1.0.0
```

Example configuration passing secrets to terraform via `vars`.  The following
example will call `terraform apply -var my_secret=${TERRAFORM_SECRET}`:

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: terraform
    image: jmccann/drone-terraform:1
    settings:
      plan: false
+     secrets:
+       my_secret: TERRAFORM_SECRET
```

You may be passing sensitive vars to your terraform commands.  If you do not want
the terraform commands to display in your drone logs then set `sensitive` to `true`.
The output from the commands themselves will still display, it just won't show
what command is actually being ran.

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: terraform
    image: jmccann/drone-terraform:1
    settings:
      plan: false
+     sensitive: true
```

Example configuration with state tracked via remote:

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: terraform
    image: jmccann/drone-terraform:1
    settings:
      plan: false
+     remote:
+       backend: S3
+       config:
+         bucket: my-terraform-config-bucket
+         key: tf-states/my-project
+         region: us-east-1
```

You may want to run terraform against internal resources, like an internal
OpenStack deployment.  Sometimes these resources are signed by an internal
CA Certificate.  You can inject your CA Certificate into the plugin by using
`ca_certs` key as described above.  Below is an example.

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: terraform
    image: jmccann/drone-terraform:1
    settings:
      plan: false
+     ca_cert: |
+       -----BEGIN CERTIFICATE-----
+       asdfsadf
+       asdfsadf
+       -----END CERTIFICATE-------
```

You may want to assume another role before running the terraform commands.
This is useful for cross account access, where a central account has privileges
to assume roles in other accounts. Using the current credentials, this role will
be assumed and exported to environment variables.
See [the discussion](https://github.com/hashicorp/terraform/issues/1275) in the Terraform issues.

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: terraform
    image: jmccann/drone-terraform:1
    settings:
      plan: false
+     role_arn_to_assume: arn:aws:iam::account-of-role-to-assume:role/name-of-role
```

You may want to change directories before applying the terraform commands.
This parameter is useful if you have multiple environments in different folders
and you want to use different drone configurations to apply different environments.

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: terraform
    image: jmccann/drone-terraform:1
    settings:
      plan: false
+     root_dir: some/path/here
```

You may want to only target a specific list of resources within your terraform
code. To achieve this you can specify the `targets` parameter. If left undefined
all resources will be planned/applied against as the default behavior.

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: terraform
    image: jmccann/drone-terraform:1
    settings:
      plan: false
+     targets:
+       - aws_security_group.generic_sg
+       - aws_security_group.app_sg
```

You may want to limit the number of concurrent operations as Terraform walks its graph.
If you want to change Terraform's default parallelism (currently equal to 10) then set the `parallelism` parameter.

```diff
kind: pipeline
type: docker
name: default

steps:
  - name: terraform
    image: jmccann/drone-terraform:1
    settings:
      plan: false
+     parallelism: 2
```

# Parameter Reference

plan
: if true, calculates a plan but does __NOT__ apply it.

remote
: contains the configuration for the Terraform remote state tracking.

remote.backend
: the Terraform remote state backend to use.

remote.config
: a map of configuration parameters for the remote state backend.
Each value is passed as a `-backend-config=<key>=<value>` option.

vars
: a map of variables to pass to the Terraform `plan` and `apply` commands.
Each value is passed as a `-var <key>=<value>` option.

secrets
: a map of variables to pass to the Terraform `plan` and `apply` commands.
Each value is passed as a `-var <key>=<ENVVAR>` option.  The `ENVVAR` is read as the key/pair value.

ca_cert
: ca cert to add to your environment to allow terraform to use internal/private resources

sensitive
: (default: `false`) - Whether or not to suppress terraform commands to stdout.

role_arn_to_assume
: A role to assume before running the terraform commands.

root_dir
: The root directory where the terraform files live. When unset, the top level directory will be assumed.

parallelism
: The number of concurrent operations as Terraform walks its graph.

