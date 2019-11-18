---
date: 2018-06-21T00:00:00+00:00
title: Codacy Coverage Reporter
author: SupplyStack
tags: [ coverage ]
logo: codacy.svg
repo: supplystack/codacy-coverage-reporter
image: supplystack/codacy-coverage-reporter:6.0.6
---

A multi-language Codacy Coverage Reporter based on [https://github.com/codacy/codacy-coverage-reporter](https://github.com/codacy/codacy-coverage-reporter). The supported coverage formats are JaCoCo and Cobertura. Support for PHP, Python, Ruby, Java, JavaScript, and Scala, among others. The plugin expects a project token, language specification and report file location. 

Note: this plugin does not have support for partial reports in the current version. Might be added in the future.

Checkout [Docker Hub](https://hub.docker.com/r/supplystack/codacy-coverage-reporter/tags) for all versions of the plugin. Tag follows the Codacy Coverage Reporter version inside the image.


```yaml
kind: pipeline
name: default

steps:
- name: codacy
  image: supplystack/codacy-coverage-reporter:6.0.6
  settings:
    codacy_project_token: 
      from_secret: CODACY_PROJECT_TOKEN
    language: Java
    report: foo/bar/report

```

# Parameter Reference

codacy_project_token
: Token for Codacy authentication

language
: Language specification, example: Java

report
: Report file location.


