---
date: 2018-01-06T00:00:00+00:00
title: AWS RDS Snapper
author: tuannvm
tags: [ amazon, aws, rds, snapshot ]
logo: amazon_rds.svg
repo: https://github.com/honestbee/devops-tools/tree/master/rds-snapper
image: quay.io/honestbee/rds-snapper
---

The rds-snapper plugin cleans up specific RDS instance's snapshots, keeps specified number of copies and creates new snapshots. The below pipeline configuration demonstrates simple usage:

Simple form which does it all (Clear old snapshots, keep only specific numbers & create a new one):

```yaml
pipeline:
  rds-snapper:
    image: quay.io/honestbee/rds-snapper
    pull: true
    secrets: [ aws_access_key_id, aws_secret_access_key ]
    action: "create"
    dbname: "<db-name>"
    suffix: "<snapshot-name-suffix>"
    keep: <numbers-to-keep>
```

Only clear old snapshots:

```diff
pipeline:
  rds-snapper:
    image: quay.io/honestbee/rds-snapper
    pull: true
    secrets: [ aws_access_key_id, aws_secret_access_key, aws_region ]
+    action: "clear"
    dbname: "<db-name>"
-    suffix: "<snapshot-name-suffix>"
    keep: <numbers-to-keep>
```

Export snapshots list to stdout (print all of dbname is not specified:

```diff
pipeline:
  rds-snapper:
    image: quay.io/honestbee/rds-snapper
    pull: true
    secrets: [ aws_access_key_id, aws_secret_access_key, aws_region ]
+    action: "export"
+/-    dbname: "<db-name>"
```

# Parameter Reference

action
: choose which features to execute `(clear|create|export)` (required)

aws_access_key
: amazon key (optional)

aws_secret_key
: amazon secret key (optional)

aws_region
: bucket region (`us-east-1`, `eu-west-1`, etc)

keep
: number of snapshot to keep (optional, `5` by default)

dbname
: rds instance's name (optional)

suffix
: snapshot's name suffix (optional, randomly generated if not specified)

# Secret Reference

action
: choose which features to execute `(clear|create|export)` (required)

aws_access_key_id
: amazon key (optional)

aws_secret_access_key
: amazon secret key (optional)

aws_region
: bucket region (`us-east-1`, `eu-west-1`, etc)

keep
: number of snapshot to keep (optional, `5` by default)

dbname
: rds instance's name (optional)

suffix
: snapshot's name suffix (optional, randomly generated if not specified)
