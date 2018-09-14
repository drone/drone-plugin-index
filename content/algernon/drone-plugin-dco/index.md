---
date: 2018-09-14T00:00:00+00:00
title: drone-plugin-dco
author: algernon
tags: [ test ]
logo: term.svg
repo: https://git.madhouse-project.org/algernon/drone-plugin-dco
image: algernon/drone-plugin-dco
---

The `drone-plugin-dco` plugin can be used to enforce the [Developer Certificate of Origin][dco], by making sure that all commits conform to it. It verifies both that a `Signed-off-by` line is present, and that it is signed off by the commit author. Multiple signed-off lines are supported, but the plugin only verifies that the commit author is among them, it does not attempt to verify the rest.

 [drone]: https://drone.io/
 [dco]: https://developercertificate.org/

The pipeline below demonstrates its usage:

```yaml
pipeline:
  dco:
    image: algernon/drone-plugin-dco
```

If, for some reason the plugin misbehaves, or fails with an error, one can turn on debugging before reporting the problem:

```diff
pipeline:
  dco:
    image: algernon/drone-plugin-dco
+   debug: true
```

# Parameter Reference

debug
: Enable debug logging, for the purpose of reporting errors.

# Limitations

The plugin only works with git-based repositories at the moment.
