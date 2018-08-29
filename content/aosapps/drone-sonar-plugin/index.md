---
date: 2018-08-29T00:00:00+00:00
title: SonarQube
author: aosapps
tags: [ Sonar, SonarQube, Analysis, report ]
logo: sonarqube.svg
repo: aosapps/drone-sonar-plugin
image: aosapps/drone-sonar-plugin
---

This plugin can scan your code quality and post the analysis report to your SonarQube server. SonarQube (previously called Sonar), is an open source code quality management platform.

The below pipeline configuration demonstrates simple usage:

```yaml
  code-analysis:
    image: aosapps/drone-sonar-plugin
    secrets: [sonar_host, sonar_token]
```

Customized parameters could be specified:

```diff
  code-analysis:
    image: aosapps/drone-sonar-plugin
    secrets: [sonar_host, sonar_token]
+   ver: 1.0
+   timeout: 20
+   sources: .
+   level: DEBUG
+   showProfiling: true
```

# Secret Reference

Safety first, the host and token are stored in Drone Secrets.

sonar_host
: Host of SonarQube with schema(http/https).

sonar_token
: User token used to post the analysis report to SonarQube Server. Click User -- My Account -- Security -- Generate Tokens.


# Parameter Reference

ver
: Code version, Default value `DRONE_BUILD_NUMBER`.

timeout
: Default seconds `60`.

sources
: Comma-separated paths to directories containing source files. 

inclusions
: Comma-delimited list of file path patterns to be included in analysis. When set, only files matching the paths set here will be included in analysis.

exclusions
: Comma-delimited list of file path patterns to be excluded from analysis.

level
: Control the quantity / level of logs produced during an analysis. Default value `INFO`. DEBUG: Display INFO logs + more details at DEBUG level. TRACE: Display DEBUG logs + the timings of all ElasticSearch queries and Web API calls executed by the SonarQube Scanner.

showProfiling
: Display logs to see where the analyzer spends time. Default value `false`

# Notes

The projectKey and projectName of SonarQube project are filled using the full repository name. You could also add a file named `sonar-project.properties` at the root of your project to specify parameters.  
