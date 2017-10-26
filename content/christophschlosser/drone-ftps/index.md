---
date: 2017-10-26T00:00:00+00:00
title: "Publish to FTP(S)"
author: "christophschlosser"
tags: [ "publish", "ftp", "ftps" ]
repo: "christophschlosser/drone-ftps"
logo: "ftps.svg"
image: "cschlosser/drone-ftps"
---

The FTPS plugin can be used to publish artifiacts over FTP(S). The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  deploy:
    image: cschlosser/drone-ftps
    username: drone
    hostname: example.com:21
    secrets: [ ftp_password ]
```

Example configuration using secure flag:

```diff
pipeline:
  deploy:
    image: cschlosser/drone-ftps
    username: drone
    hostname: example.com:21
    secrets: [ ftp_password ]
+   secure: true
```

Example configuration using dest_dir to specify where to put the files on the remote server:

```diff
pipeline:
  deploy:
    image: cschlosser/drone-ftps
    username: drone
    hostname: example.com:21
    secrets: [ ftp_password ]
    secure: true
+   dest_dir: /var/www/mysite
```

Example configuration using src_dir to upload only the static site generated:

```diff
pipeline:
  deploy:
    image: cschlosser/drone-ftps
    username: drone
    hostname: example.com:21
    secrets: [ ftp_password ]
    secure: true
    dest_dir: /var/www/mysite
+   src_dir: /mysite/static
```

Example configuration using exclude to prevent dotfiles from getting uploaded:

```diff
pipeline:
  deploy:
    image: cschlosser/drone-ftps
    username: drone
    hostname: example.com:21
    secrets: [ ftp_password ]
    secure: true
    dest_dir: /var/www/mysite
    src_dir: /mysite/static
+   exclude:
+     - ^\.git/$
+     - ^\.gitignore$
+     - ^\.drone.yml$
```

Example configuration using include to only upload HTML, CSS and JS files:

```diff
pipeline:
  deploy:
    image: cschlosser/drone-ftps
    username: drone
    hostname: example.com:21
    secrets: [ ftp_password ]
    secure: true
    dest_dir: /var/www/mysite
    src_dir: /mysite/stati
    exclude:
      - ^\.git/$
      - ^\.gitignore$
      - ^\.drone.yml$
+   include:
+     - ^*.css$
+     - ^*.js$
+     - ^*.html$
```

# Secret Reference

FTP_PASSWORD
: Password used to login to the FTP server with the specified user

# Parameter Reference

username
: FTP username

hostname
: FTP host including the port

secure
: If set to true FTPS is enforced, otherwise plain FTP is used (default true)

dest_dir
: Where to put the files on the remote server (default /)

src_dir
: Which local directory should be used for the upload (default ./)

exclude
: egrep like pattern matching to exclude files from uploading (default none)

include
: egrep like pattern matching to include files to upload (default none)
