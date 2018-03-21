---
date: 2018-02-11T00:00:00+00:00
title: Pypi
author: gjtempleton
tags: [ python, pypi ]
repo: gjtempleton/drone-pypi
logo: pypi.svg
image: gjtempleton/drone-pypi
---

This plugin allows you to publish Python pypi packages as part of your pipeline.

Basic example:

```yaml
pipeline:
  pypi_publish:
    image: gjtempleton/drone-pypi
    username: guido
    password: secret
```

This block will first generate the relevant .pypirc file with the provided details generating a _repo_ block, then execute the following command:

```
python3 setup.py sdist upload -r repo
```

You can also specify the distribution types you want to upload, as well as the repository URL and relative path of the setup python file.
```diff
pipeline:
    pypi_publish:
        image: gjtempleton/drone-pypi
        username: guido
        password: secret
+       repository: https://your-private-pypi.com/pypi
+       distributions:
+       - sdist
+       - bdist_wheel
+       setupfile: testdata/setup.py
```

# Parameter Reference

username
: Username to be used for the pypi publish. Can also be injected via secrets as _username_.

password
: Password for the pypi publish.  Can also be injected via secrets as _password_.

repository
: The URL of the repository to be published to. (Optional, will default to https://pypi.python.org/pypi)

distributions
: List of distribution types to publish. (Optional, will default to only sdist.)

setupfile
: The relative path from the workspace root to the setup.py file to be used. (Optional, will default to setup.py)
