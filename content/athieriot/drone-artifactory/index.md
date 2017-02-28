---
date: 2017-02-28T00:00:00+00:00
title: Artifactory
author: athieriot
tags: [ publish, artifactory ]
repo: athieriot/drone-artifactory
logo: artifactory.svg
image: athieriot/drone-artifactory
---

Use this plugin to publish artifacts from the build to Artifactory.
The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  artifactory:
    image: athieriot/drone-artifactory
    url: http://arti.company.com
    username: admin
    password: password
    pom: pom.xml
    files:
      - target/*.jar
      - target/*.war
```

Override the repository to deploy into:

```yaml
pipeline:
  artifactory:
    image: athieriot/drone-artifactory
    url: http://arti.company.com
    username: admin
    password: password
    pom: pom.xml
+   repo_key: third-party-snapshot
    files:
      - target/*.jar
      - target/*.war
```

Specify artifact properties manually instead of getting the values from the pom file:

```yaml
pipeline:
  artifactory:
    image: athieriot/drone-artifactory
    url: http://arti.company.com
    username: admin
    password: password
-   pom: pom.xml
+   group_id: com.company 
+   artifact_id: awesome-lib
+   version: 1.0-SNAPSHOT
    files:
      - target/*.jar
      - target/*.war
```

Force upload if files already exists:

```yaml
pipeline:
  artifactory:
    image: athieriot/drone-artifactory
    url: http://arti.company.com
    username: admin
    password: password
    pom: pom.xml
    files:
      - target/*.jar
      - target/*.war
+   force_upload: true      
```

# Parameter Reference

url
: Artifactory URL (Includes scheme)

username
: Artifactory username (default to blank)

password
: Artifactory password (default to blank)

pom
: The path to a pom.xml file were to read project details (optional)

group_id
: Project group id (default to value from Pom file)

artifact_id
: Project artifact id (default to value from Pom file)

version
: Artifact version (default to value from Pom file)

repo_key
: Target repository key (optional. default to 'libs-snapshot-local' if version contains 'snapshot', 'libs-release-local' otherwise)

files
: List of files to deploy

force_upload
: Force upload if a file already exists (optional)

## About paths

All file paths must be relative to current project sources

File paths are interpreted with [node-glob](https://github.com/isaacs/node-glob#glob-primer) and can contain things such as regex, or directory wildcards(./\*\*/\*.js)

## pom.xml deployment

If a pom parameter is specified it will be automatically deployed. It is not necessary to specify the pom under the files parameter.

In the example above, pom.xml will be deployed as ```<groupId>-<artifactId>-<version>.pom```
