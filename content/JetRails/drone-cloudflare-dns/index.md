---
version: '1.0.0'
date: 2019-08-14T00:00:00+00:00
title: Cloudflare DNS
author: JetRails
tags: [ cloudflare, dns ]
logo: cloudflare.svg
repo: jetrails/drone-cloudflare-dns
image: jetrails/drone-cloudflare-dns
---

Our Drone plugin enables the ability for your pipeline to interface with Cloudflare's API to create/update/delete DNS records. This plugin is written in Go and it uses the [cloudflare-go](https://github.com/cloudflare/cloudflare-go) package to communicate with Cloudflare's API. For information on Cloudflare's API please refer to their [documentation](https://api.cloudflare.com/#dns-records-for-a-zone-properties) page.

## Cloudflare Token

The API token that is used to authenticate with Cloudflare's API can be created in Cloudflare's dashboard. It is recommended to create an API token that includes only the zone resource you want to manipulate and give edit permissions only to the DNS resource.

## Usage

There are two values for `action`, set and unset. If set is choosen and a record does not already exist, then the record is created. If set is choosen and the record already exists, then the record is updated. It is recommended that the `record_name` value be always set to the FQDN. Please refer to the table below with all possible settings that can be passed to the plugin:

|       Name      |    Required   | Default | Case-Sensitive |        Type       |
|:---------------:|:-------------:|:-------:|:--------------:|:-----------------:|
|    api_token    |      Yes      |    -    |       Yes      |       STRING      |
| zone_identifier |      Yes      |    -    |       Yes      |       STRING      |
|      action     |      Yes      |    -    |       No       |  ENUM [ set, unset ]  |
|   record_type   |      Yes      |    -    |       No       | ENUM [ a, cname, ... ] |
|   record_name   |      Yes      |    -    |       Yes      |       STRING      |
|  record_content | action == set |    -    |       Yes      |       STRING      |
|  record_proxied |       No      |   true  |       N/A      |       STRING      |
|    record_ttl   |       No      |    1    |       N/A      |        INT        |
| record_priority |       No      |    1    |       N/A      |        INT        |
|      debug      |       No      |  false  |       N/A      |       STRING      |

## Examples

```yaml
kind: pipeline
name: default

steps:
-   name: cloudflare
    image: jetrails/drone-cloudflare-dns
    settings:
        api_token:
            from_secret: cloudflare_token
        zone_identifier:
            from_secret: cloudflare_zone_identifier
        action: set
        record_type: a
        record_name: example.com
        record_content: 127.0.0.1
        record_proxied: false
```

```yaml
kind: pipeline
name: default

steps:
-   name: cloudflare
    image: jetrails/drone-cloudflare-dns
    settings:
        api_token:
            from_secret: cloudflare_token
        zone_identifier:
            from_secret: cloudflare_zone_identifier
        action: unset
        record_type: a
        record_name: example.com
```
