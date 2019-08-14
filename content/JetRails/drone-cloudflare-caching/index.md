---
version: '1.0.0'
date: 2019-08-14T00:00:00+00:00
title: Cloudflare Caching
author: JetRails
tags: [ cloudflare, cache ]
logo: cloudflare.svg
repo: jetrails/drone-cloudflare-caching
image: jetrails/drone-cloudflare-caching
---

Our Drone plugin enables the ability for your pipeline to interface with Cloudflare's API to purge cache. This plugin is written in Go and it uses the [cloudflare-go](https://github.com/cloudflare/cloudflare-go) package to communicate with Cloudflare's API. For information on Cloudflare's API please refer to their [documentation](https://api.cloudflare.com/#zone-purge-all-files) page.

## Cloudflare Token

The API token that is used to authenticate with Cloudflare's API can be created in Cloudflare's dashboard. It is recommended to create an API token that includes only the zone resource you want to manipulate and give edit permissions only to the Cache Purge resource.

## Usage

This plugin supports purging all cache, purging hosts, purging files, and purging tags. Please refer to the table below with all possible settings that can be passed to the plugin:

|       Name      |           Required         | Case-Sensitive |                            Type                           |
|:---------------:|:--------------------------:|:--------------:|:---------------------------------------------------------:|
|    api_token    |             Yes            |       Yes      |                           STRING                          |
| zone_identifier |             Yes            |       Yes      |                           STRING                          |
|      action     |             Yes            |       No       | ENUM [ purge_everything, purge_hosts, purge_files, purge_tags ] |
|       list      | action != purge_everything |       Yes      |                       ARRAY\<STRING\>                       |

## Examples

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
