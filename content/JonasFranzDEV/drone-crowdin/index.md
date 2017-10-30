---
date: 2017-09-23T00:00:00+00:00
title: Crowdin
author: JonasFranzDEV
tags: [ publish, translation ]
repo: JonasFranzDEV/drone-crowdin
logo: crowdin.svg
image: jonasfranz/crowdin
---

The Crowdin plugin allows you to submit translation files to Crowdin.

Information about API keys: https://support.crowdin.com/api/api-integration-setup/

The following is a sample configuration in your .drone.yml file:

```yaml
pipeline:
  crowdin:
    image: jonasfranz/crowdin
    project_identifier: example
    project_key: 1bc29b36f623ba82aaf6724fd3b16718
    files:
      example: options/example.ini
      example2: options/example2.ini
```
# Secret Reference

crowdin_identifier
: Identifier provided by Crowdin

crowdin_key
: API key provided by Crowdin

# Parameter Reference

project_identifier
: Identifier provided by Crowdin

project_key
: API key provided by Crowdin (Secret: `CROWDIN_KEY`)

files
: Map of translatable files with the Crowdin file name as key and the real filepath as value
