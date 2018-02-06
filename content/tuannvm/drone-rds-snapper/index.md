---
date: 2018-01-06T00:00:00+00:00
title:
author: tuannvm
tags: [ amazon, aws, rds, snapshot ]
repo: honestbee/devops-tools/rds-snapper
image: quay.io/honestbee/rds-snapper
---

The rds-snapper plugin clean up specific RDS instance's snapshots, keep specified number of copies and create new snapshot. The below pipeline configuration demonstrates simple usage:

Simple form which does it all (Clear old snapshots & create new one):

```yaml
pipeline:
  rds-snapper:
    image: quay.io/honestbee/rds-snapper
    pull: true
    secrets: [ aws_access_key_id, aws_secret_access_key ]
    action: "maintain"
    dbname: "<db-name>"
    suffix: "<snapshot-name-suffix>"
    limit: <number-to-keep>
```

Only clear old snapshots:

```diff
pipeline:
  rds-snapper:
    image: quay.io/honestbee/rds-snapper
    pull: true
    secrets: [ aws_access_key_id, aws_secret_access_key ]
+    action: "clear"
    dbname: "<db-name>"
-    suffix: "<snapshot-name-suffix>"
    limit: <number-to-keep>
```

Only create new snapshot:

```diff
pipeline:
  rds-snapper:
    image: quay.io/honestbee/rds-snapper
    pull: true
    secrets: [ aws_access_key_id, aws_secret_access_key ]
+    action: "create"
    dbname: "<db-name>"
    suffix: "<snapshot-name-suffix>"
-    limit: <number-to-keep>
```

Export snapshots list to stdout

```diff
pipeline:
  rds-snapper:
    image: quay.io/honestbee/rds-snapper
    pull: true
    secrets: [ aws_access_key_id, aws_secret_access_key ]
+    action: "export"
+/-    dbname: "<db-name>"
```

# Parameter Reference

action
: choose which features to execute `(clear|maintain|create|export)` (required)

aws_access_key
: amazon key (optional)

aws_secret_key
: amazon secret key (optional)

aws_region
: bucket region (`us-east-1`, `eu-west-1`, etc)

limit
: number of snapshot to keep (optional, `5` by default)

dbname
: rds instance's name (optional)

suffix
: snapshot's name suffix (optional, randomly generated if not specified)

# Secret Reference

action
: choose which features to execute `(clear|maintain|create|export)` (required)

aws_access_key_id
: amazon key (optional)

aws_secret_access_key
: amazon secret key (optional)

aws_region
: bucket region (`us-east-1`, `eu-west-1`, etc)

limit
: number of snapshot to keep (optional, `5` by default)

dbname
: rds instance's name (optional)

suffix
: snapshot's name suffix (optional, randomly generated if not specified)