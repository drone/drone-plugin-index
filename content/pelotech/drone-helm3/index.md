---
date: 2019-12-30T14:12:00-07:00
title: Helm3
author: pelotech
tags: [ kubernetes, docker, helm, helm3 ]
logo: kubernetes.svg
repo: pelotech/drone-helm3
image: pelotech/drone-helm3
---

This plugin provides an interface to Helm 3.

Basic example:

```yaml
  - name: deploy_production
    image: pelotech/drone-helm3
    settings:
      helm_command: upgrade
      chart: ./
      release: my-project
      api_server:
        from_secret: prod_api_server
      kubernetes_token:
        from_secret: prod_kubernetes_token
```

# Parameter Reference

helm_command
: Helm command to run; valid options are `upgrade`, `lint`, and `uninstall`. If not provided, can be inferred from the Drone event.

update_dependencies
: Run `helm dependency update` before running the main helm command.

helm_repos
: Run `helm repo add` before running the main helm command.

namespace
: Kubernetes namespace for the un/installation.

debug
: Produce debug output from the plugin and helm itself. Note that this option may expose secrets in the log output.

chart
: Helm chart to install or lint.

release
: Release name to un/install.

values
: Arguments for helm's `--set` flag.

string_values
: Arguments for helm's `--set-string` flag.

values_files
: Arguments for helm's `--values` flag.

api_server
: Kubernetes api server.

kubernetes_token
: Token for connecting to the kubernetes api.

service_account
: Account name for connecting to the kubernetes api.

kubernetes_certificate
: Base64-encoded TLS certificate, for clusters using a self-signed CA certificate

chart_version
: Specific chart version to install.

dry_run
: Prepare the un/installation, but do not perform it.

wait
: Wait until kubernetes resources are in a ready state before marking the installation successful.

timeout
: Timeout for any individual kubernetes operation, formatted as a Golang duration (e.g. "3m20s").

force
: Pass `--force` to `helm upgrade`.

reuse_values
: Reuse the values from a previous release.

keep_history
: Pass `--keep-history` to `helm uninstall`.

lint_strictly
: Pass `--strict` to `helm lint`.

skip_tls_verify
: Do not check for a valid certificate when connecting to the kubernetes api.

See [docs/parameter_reference.md](https://github.com/pelotech/drone-helm3/blob/master/docs/parameter_reference.md) for a more detailed explanation of these parameters.
