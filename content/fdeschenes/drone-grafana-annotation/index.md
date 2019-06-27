---
date: 2019-06-03T10:40:00+08:00
title: Grafana Annotation
author: fdeschenes
tags: [deploy, reporting, grafana]
logo: grafana.svg
repo: fdeschenes/drone-grafana-annotation
image: fdeschenes/drone-grafana-annotation
---

The Grafana Annotation plugin can be used to create an annotation in [Grafana](https://grafana.com). The below sample pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  annotate:
    api_key: xxxxx
    image: fdeschenes/drone-grafana-annotation
    tags:
      - deploy
      - production
    text: "Deployed"
    url: https://grafana.example.com
    when:
      environment: production
      event: deployment
      status: success
```

# Parameter Reference

api_key
: api key

tags
: array of tags

text
: description

url
: server url
