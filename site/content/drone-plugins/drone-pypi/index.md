---
date: 2018-02-11T00:00:00+00:00
title: PyPI
author: drone-plugins
tags: [ publish, python, pypi ]
logo: pypi.svg
repo: drone-plugins/drone-pypi
image: plugins/pypi
---

This plugin allows you to publish Python pypi packages as part of your pipeline.

Basic example:

```yaml
steps:
- name: pypi_publish
  image: plugins/pypi
  settings:
    username: john
    password: secret
```

This block will first generate the relevant .pypirc file with the provided details generating a _repo_ block, then execute the following command:

```bash
python3 setup.py sdist upload -r repo
```

You can also specify the distribution types you want to upload, as well as the repository URL and relative path of the setup python file.

```diff
steps:
- name: pypi_publish
  image: plugins/pypi
  settings:
    username: john
    password: secret
+   repository: https://your-private-pypi.com/pypi
+   distributions:
+   - sdist
+   - bdist_wheel
+   setupfile: testdata/setup.py
```

Example configuration using credentials from secrets:

```diff
steps:
- name: pypi_publish
  image: plugins/pypi
  settings:
-    username: john
-    password: secret
+    username:
+      from_secret: pypi_username
+    password:
+      from_password: pypi_password
```

# Parameter Reference

username
: Username to be used for the pypi publish.

password
: Password for the pypi publish.

repository
: The URL of the repository to be published to. (Optional, will default to https://upload.pypi.org/legacy/)

distributions
: List of distribution types to publish. (Optional, will default to only sdist)

setupfile
: The relative path from the workspace root to the setup.py file to be used. (Optional, will default to setup.py)

skip_build
: Skip the build and only upload pre-build files from `dist/*` (Optional, will default to False)
