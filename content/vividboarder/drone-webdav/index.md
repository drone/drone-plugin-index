---
date: 2018-04-11T00:00:00+00:00
title: WebDAV
author: vividboarder
tags: [ deploy, publish ]
repo: vividboarder/drone-webdav
logo: term.svg
image: vividboarder/drone-webdav
---

The WebDAV plugin will allow pushing build artifacts to any WebDAV server, including Nextcloud or ownCloud.

An example configuration would be as follows:

```yaml
pipeline:
  upload_debug:
    image: vividboarder/drone-webdav
    file: com.vividboarder.otbeta/build/outputs/apk/com.vividboarder.otbeta-debug.apk
    destination: https://my.nextcloud.com/remote.php/dav/files/vividboarder/Android/Apks/
    user: myusername
    password: mypassword
```

You probably don't want to check your credentials into your repo, so you may use secrets for this:

```yaml
pipeline:
  upload_debug:
    image: vividboarder/drone-webdav
    file: com.vividboarder.otbeta/build/outputs/apk/com.vividboarder.otbeta-debug.apk
    destination: https://my.nextcloud.com/remote.php/dav/files/vividboarder/Android/Apks/
    secrets:
      - source: WEBDAV_USER
        target: PLUGIN_USERNAME
      - source: WEBDAV_PASSWORD
        target: PLUGIN_PASSWORD
```
