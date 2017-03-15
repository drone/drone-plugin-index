---
date: 2017-03-15T11:27:13-04:00
title: Bluemix Cloud Foundry
author: jcantosz
tags: [ publish, deploy, bluemix, cloud foundry ]
repo: ibmclouddevops/drone-bluemix-cloudfoundry
logo: bluemix.svg
image: ibmclouddevops/drone-bluemix-cloudfoundry
---

The Bluemix Cloud Foundry plugin can be used to deploy files and/or services to Bluemix. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  deploy:
    image: ibmclouddevops/drone-bluemix-cloudfoundry
    region: ng
    org: cloud
    space: production
```

The follow is an example of pushing a basic app named `prod-app` to the US South region of Bluemix:

```diff
pipeline:
  deploy:
    image: ibmclouddevops/drone-bluemix-cloudfoundry
    region: ng
    org: cloud
    space: production
+   name: prod-app
```

A [manifest file](https://docs.cloudfoundry.org/devguide/deploy-apps/manifest.html) can also be used that contains most `push` parameters. A path must be provided
to the `manifest` field:

```diff
pipeline:
  deploy:
    image: ibmclouddevops/drone-bluemix-cloudfoundry
    region: ng
    org: cloud
    space: production
+   manifest: path/to/manifest.yml
```
All Cloud Foundry [CLI options](http://cli.cloudfoundry.org/en-US/cf/push.html) are available in the plugin for pushing builds (`cf push`)

If more fine-grained control is needed (without a manifest), all `cf push`
[command line options](http://cli.cloudfoundry.org/en-US/cf/push.html) are
available to the plugin. The following example outlines a subset of options:

 ```diff
pipeline:
  deploy:
    image: ibmclouddevops/drone-bluemix-cloudfoundry
    api: https://api.ng.bluemix.net
    org: cloud
    space: production
+   name: prod-app
+   buildpack: https://github.com/cloudfoundry/go-buildpack.git
+   domain: example.com
+   disk: 256M
+   memory: 1G
+   random_route: true
```

# Secret Reference

BLUEMIX_API
: target api endpoint (e.g. https://api.example.com)

BLUEMIX_USER
: BLUEMIX username

BLUEMIX_PASSWORD
: BLUEMIX password

BLUEMIX_ORG
: target BLUEMIX org

BLUEMIX_SPACE
: target BLUEMIX space

# Parameter Reference

api
: Target API (e.g. `api.ng.bluemix.net`)

org
: Target Org (e.g. `xyz-org`)

space
: Target Space (e.g. `development`)

user
: Auth username (e.g. `john@doe.com`)

password
: Auth password (e.g. `supersecure`)

name
: Override application name (e.g. `app-canary`)

buildpack
: Custom buildpack (e.g. `https://....`)

command
: Startup command (e.g. `start-script.sh`)

domain
: Domain (e.g. `example.com`)

manifest
: Path to manifest (e.g. `test.manifest.yml`)

docker_image
: Image name (e.g. `ibmclouddevops/drone-bluemix-cloudfoundry`)

instances
: Number of instances (e.g. `4`)

disk
: Disk limit (e.g. `256M`)

memory
: Memory limit (e.g. `1G`)

hostname
: Hostname (e.g. `my-subdomain`)

path
: App path (e.g. `build/assets`)

stack
: Stack to use (e.g. `cflinuxfs2`)

timeout
: App start timeout (e.g. `60`)

health_check_type
: Application health check type (e.g. `port`)

route_path
: Path for the route (e.g. `about`)

no_hostname
: Map the root domain to this app (e.g. `false`)

no_manifest
: Ignore manifest file (e.g. `false`)

no_route
: Do not map a route to this app and remove routes from previous pushes of this app. (e.g. `false`)

no_start
: Do not start an app after pushing (e.g. `false`)

random_route
: Create a random route for this app (e.g. `false`)

skip_ssl
: Skip verification of the API endpoint. Not recommended! (e.g. `false`)
