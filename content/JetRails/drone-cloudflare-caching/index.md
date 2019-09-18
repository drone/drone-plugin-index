---
date: 2019-08-14T00:00:00+00:00
title: Cloudflare Caching
author: JetRails
tags: [ cloudflare, cache ]
logo: cloudflare.svg
repo: jetrails/drone-cloudflare-caching
image: jetrails/drone-cloudflare-caching
---

Our Drone plugin enables the ability for your pipeline to interface with Cloudflare's API to purge cache. This plugin is written in Go and it uses the [cloudflare-go](https://github.com/cloudflare/cloudflare-go) package to communicate with Cloudflare's API. For information on Cloudflare's API please refer to their [documentation](https://api.cloudflare.com/#zone-purge-all-files) page.

The API token that is used to authenticate with Cloudflare's API can be created in Cloudflare's dashboard. It is recommended to create an API token that includes only the zone resource you want to manipulate and give edit permissions only to the Cache Purge resource. Please refer to Cloudflare's [documentation](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key#12345680) on how to create an API token for your account.

Example configuration to purge all cache

```yaml
kind: pipeline
name: default

steps:
-   name: cloudflare
    image: jetrails/drone-cloudflare-caching
    settings:
        api_token:
            from_secret: cloudflare_token
        zone_identifier:
            from_secret: cloudflare_zone_identifier
        action: purge_everything
```

Example configuration to purge cache for hosts

```yaml
kind: pipeline
name: default

steps:
-   name: cloudflare
    image: jetrails/drone-cloudflare-caching
    settings:
        api_token:
            from_secret: cloudflare_token
        zone_identifier:
            from_secret: cloudflare_zone_identifier
        action: purge_hosts
        list:
        -   example.com
        -   foo.example.com
        -   bar.example.com
```

Example configuration to purge cache for files

```yaml
kind: pipeline
name: default

steps:
-   name: cloudflare
    image: jetrails/drone-cloudflare-caching
    settings:
        api_token:
            from_secret: cloudflare_token
        zone_identifier:
            from_secret: cloudflare_zone_identifier
        action: purge_files
        list:
        -   https://example.com/script.js
        -   https://example.com/logo.svg
```

Example configuration to purge cache for tags

```yaml
kind: pipeline
name: default

steps:
-   name: cloudflare
    image: jetrails/drone-cloudflare-caching
    settings:
        api_token:
            from_secret: cloudflare_token
        zone_identifier:
            from_secret: cloudflare_zone_identifier
        action: purge_tags
        list:
        -   foo
        -   bar
```

# Parameter Reference

api_token
: Cloudflare api token

zone_identifier
: Cloudflare zone id

action
: What type of cache purge, options are: `purge_everything`, `purge_hosts`, `purge_files`, `purge_tags`

list
: List of values, could be valid hosts, tags, or files depending on action parameter value

# Hints

The following parameters are always required: api_token, zone_identifier, action. If the action parameter is not set to `purge_everything`, then the list parameter is required.
