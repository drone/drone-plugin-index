---
date: 2018-04-11T00:00:00+00:00
title: WebDAV
author: vividboarder
tags: [ deploy, publish ]
logo: term.svg
repo: vividboarder/drone-webdav
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
    username: myusername
    password: mypassword
```

You probably don't want to check your credentials into your repo, so you may use secrets for this:

```diff
pipeline:
  upload_debug:
    image: vividboarder/drone-webdav
    file: com.vividboarder.otbeta/build/outputs/apk/com.vividboarder.otbeta-debug.apk
    destination: https://my.nextcloud.com/remote.php/dav/files/vividboarder/Android/Apks/
-   username: myusername
-   password: mypassword
+   secrets: [webdav_username, webdav_password]
```

# Secret Reference

webdav_username, username
: webdav server username

webdav_password, password
: webdav server password

# Parameter Reference

file
: location of the file to upload

destination
: directory to copy the file to
