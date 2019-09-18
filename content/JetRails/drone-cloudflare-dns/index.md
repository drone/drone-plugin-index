---
date: 2019-08-14T00:00:00+00:00
title: Cloudflare DNS
author: JetRails
tags: [ cloudflare, dns ]
logo: cloudflare.svg
repo: jetrails/drone-cloudflare-dns
image: jetrails/drone-cloudflare-dns
---

Our Drone plugin enables the ability for your pipeline to interface with Cloudflare's API to create/update/delete DNS records. This plugin is written in Go and it uses the [cloudflare-go](https://github.com/cloudflare/cloudflare-go) package to communicate with Cloudflare's API. For information on Cloudflare's API please refer to their [documentation](https://api.cloudflare.com/#dns-records-for-a-zone-properties) page.

The API token that is used to authenticate with Cloudflare's API can be created in Cloudflare's dashboard. It is recommended to create an API token that includes only the zone resource you want to manipulate and give edit permissions only to the DNS resource. Please refer to Cloudflare's [documentation](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key#12345680) on how to create an API token for your account.

Example configuration to create an `A` record for `test.example.com`

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
        debug: false
        action: set
        record_type: A
        record_name: test.example.com
        record_content: 127.0.0.1
        record_proxied: false
```

Example configuration to delete an `A` record for `test.example.com`

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
        debug: false
        action: unset
        record_type: A
        record_name: test.example.com
```

# Parameter Reference

api_token
: Cloudflare api token

zone_identifier
: Cloudflare zone id

action
: What type of action, options are: `set`, `unset`

record_type
: Type of DNS record, examples include: `A`, `CNAME`, `NS`, etc.

record_name
: Name of DNS record

record_content
: Value for DNS record

record_proxied
: Proxy record through cloudflare, defaults to `true`

record_ttl
: Time to live value in seconds for DNS record, defaults to `1` (automatic)

record_priority
: Priority value for DNS record, defaults to `1`

debug
: Display debug data, defaults to `false`

# Hints

There are two values for the action parameter, `set` and `unset`. If `set` is choosen and a record does not already exist, then the record is created. If `set` is choosen and the record already exists, then the record is updated.

It is recommended that the `record_name` value be always set to the FQDN.

The following parameters are always required: api_token, zone_identifier, record_type, record_name. If action parameter is equal to `set`, then the record_content parameter is required.
