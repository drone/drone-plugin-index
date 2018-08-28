---
date: 2018-08-29T00:00:00+00:00
title: SonarQube
author: aosapps
tags: [ Sonar, SonarQube, Analysis, report ]
logo: sonarqube.svg
repo: aosapps/drone-sonar-plugin
image: aosapps/drone-sonar-plugin
---

# Drone SonarQube Plugin

The plugin of Drone CI to integrate with SonarQube (previously called Sonar), which is an open source code quality management platform.
This plugin will automatically post the code analysis report to SonarQube immediately after the execution of the associated pipeline finished.


### Quickly Start Pipeline Example
```yaml
  code-analysis:
    image: aosapps/drone-sonar-plugin
    secrets: [sonar_host, sonar_token]
```


### Secrets:
Safety first, the host and token are stored in Drone Secrets.
* `sonar_host`: Host of SonarQube with schema(http/https).
* `sonar_token`: User token used to post the analysis report to SonarQube Server. Click User -- My Account -- Security -- Generate Tokens.


### Advanced Parameters:
* `ver`: Code version, Default value `DRONE_BUILD_NUMBER`.
* `timeout`: Default seconds `60`.
* `sources`: Comma-separated paths to directories containing source files. 
* `inclusions`: Comma-delimited list of file path patterns to be included in analysis. When set, only files matching the paths set here will be included in analysis.
* `exclusions`: Comma-delimited list of file path patterns to be excluded from analysis.
* `level`: Control the quantity / level of logs produced during an analysis. Default value `INFO`. 
    * DEBUG: Display INFO logs + more details at DEBUG level.
    * TRACE: Display DEBUG logs + the timings of all ElasticSearch queries and Web API calls executed by the SonarQube Scanner.
* `showProfiling`: Display logs to see where the analyzer spends time. Default value `false`

### Notes:
* projectKey: `DRONE_REPO`
* projectName: `DRONE_REPO`
* You could also add a file named `sonar-project.properties` at the root of your project to specify parameters.

Code repository: [aosapps/drone-sonar-plugin](https://github.com/aosapps/drone-sonar-plugin).
SonarQube Parameters: [Analysis Parameters](https://docs.sonarqube.org/display/SONAR/Analysis+Parameters)


### Test your SonarQube Server:
Replace the host and login token depend on your situation：
```commandline
sonar-scanner \
  -Dsonar.projectKey=Neptune:news \
  -Dsonar.sources=. \
  -Dsonar.projectName=Neptune/news \
  -Dsonar.projectVersion=1.0 \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=60878847cea1a31d817f0deee3daa7868c431433
```
