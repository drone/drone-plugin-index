---
version: '1.0.0'
date: 2021-02-19-T00:00:00+00:00
title: Prometheus Alerts
author: OSSHelp
tags: [ prometheus, alerts, promtool, testing ]
logo: prometheus.svg
repo: osshelp/drone-prometheus-alerts
image: osshelp/drone-prometheus-alerts
---

This plugin helps with testing alerting and recording rules for Prometheus.

# Usage examples

# Find and lint files automatically

``` yaml
steps:
  - name: check and test alertrules
    image: osshelp/drone-prometheus-alerts
```

## Specific files to check and specific tests

``` yaml
steps:
  - name: check and test alertrules
    image: osshelp/drone-prometheus-alerts
    settings:
      alertrules_files:
        - alerts/file1.yml
        - alerts/file2.yml
      alertrules_tests:
        - tests/test1.yml
```

## Exclude files by exclude_regex

``` yaml
steps:
  - name: check and test alertrules
    image: osshelp/drone-prometheus-alerts
    settings:
      exclude_regex: '(regex1|regex2)'
```

# Parameter Reference

alertrules_dir
: Directory with alertrules files ("alerts" by default)

alertrules_files
: If empty string files will be searched in the `alertrules_dir`

alertrules_tests_dir
: Directory with tests ("tests" by default)

alertrules_tests
: If empty string files will be searched in the `alertrules_tests_dir`

exclude_regex
: Regular expression to exclude files from checking and testing ("^NO_EXCLUDE_FILES\$" by default)

verbose
: Show verbose output, including promtool results (false by default)

# FAQ

## Why it fails with alerts without tests?

Using alerting rules without corresponding testing is considered a very bad idea. One day you can break your alerting without even noticing it. The consequences you can imagine by yourself. So, read the [official docs on promtool](https://prometheus.io/docs/prometheus/latest/configuration/unit_testing_rules/) and add tests for your alerting rules.

## Links

* [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/configuration/unit_testing_rules/)
* [Plugin sources at Github](https://github.com/OSSHelp/drone-prometheus-alerts)
* [Plugin image at DockerHub](https://hub.docker.com/r/osshelp/drone-prometheus-alerts)
