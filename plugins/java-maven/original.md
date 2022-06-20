---
date: 2022-06-20T15:53:29-05:30
title: Java Maven
author: kameshsampath
logo: apache_maven_logo.svg
tags: [ java, build,maven ]
repo: kameshsampath/drone-java-maven-plugin
image: quay.io/kameshsampath/drone-java-maven-plugin
---

A [Drone](https://drone.io) plugin to build Java applications using [Apache Maven](https://maven.apache.org).

The following pipeline configuration uses the Java Maven plugin to build Java application with default goals `-DskipTests clean install`:

```yaml
  steps:
  - name: build-java-app
    image: quay.io/kameshsampath/drone-java-maven-plugin
    pull: if-not-exists
```

Example configuration that uses the custom goals to build the Java application:

```yaml
steps:
  - name: build-java-app
    image: quay.io/kameshsampath/drone-java-maven-plugin
    pull: if-not-exists
    settings:
      goals:
        - clean
        - test
        - install
```

Example configuration that use maven mirror url:

```yaml
steps:
  - name: build-java-app
    image: quay.io/kameshsampath/drone-java-maven-plugin
    pull: if-not-exists
    settings:
      maven_mirror_url: http://your-maven-mirror.org
```

Example configuration that provides maven modules to build:

```yaml
steps:
  - name: build-java-app
    image: quay.io/kameshsampath/drone-java-maven-plugin
    pull: if-not-exists
    settings:
      maven_modules:
        - api
        - ui
```

Example configuration that builds the application relative to sources:

```yaml
steps:
  - name: build-java-app
    image: quay.io/kameshsampath/drone-java-maven-plugin
    pull: if-not-exists
    settings:
      context_dir: my-app-dir
```

# Parameter Reference

context_dir
: The context directory within the source repository where `pom.xml` is found to execute the maven goals. Defaults to Drone workspace root.

goals
: An array of maven goals to run.Defaults: `-DskipTests clean install`.

maven_modules
: An array of maven modules to be built incase of a multi module maven project.

maven_mirror_url
: The Maven repository mirror url.

server_user
: The username for the maven repository manager server.

server_password
: The password for the maven repository manager server.

proxy_user
: The username for the proxy server.

proxy_password
: The password for the proxy server.

proxy_port
: Port number for the proxy server.

proxy_host
: Proxy server Host.

proxy_non_proxy_hosts
: An array of non proxy server hosts.

proxy_protocol
: Protocol for the proxy ie http or https.
