---
date: 2021-02-21T00:00:00+00:00
title: SemVer
author: cedrichopf
tags: [semantic-versioning]
logo: github.svg
repo: cedrichopf/drone-semver
image: cedrichopf/drone-semver
---

This plugin will fetch the current semantic version of the repository and store it into a file named semver. If no semantic version is available, the plugin will generate an initial version based on the configuration.

Additionally, the plugin can be configured to automatically increment the semantic version based on the content of a file, e.g. CHANGELOG.md.

```yaml
---
kind: pipeline
type: docker
name: semantic-version

trigger:
  event:
    - tag

steps:
  - name: semver
    image: cedrichopf/drone-semver
    settings:
      initial_version: 1.0.0
      autoincrement: true
      file: CHANGELOG.md
```

# Parameter Reference

initial_version
: Initial version to use for semantic versioning if no version exists. Defaults to `1.0.0`

autoincrement
: Enable/Disable the automatic incremention of the semantic version. Defaults to `false`

file
: File to use for semantic versioning. Defaults to `CHANGELOG.md`

use_regex
: Enabel/Disable the regular expression to split the file's content. Defaults to `true`

file_regex
: Regular expression used to split the file's content. Defaults to `\[(\d\.){2}\d\]` which will split the content of the file by `[x.x.x]`, e.g. `[1.0.0]`

major_keyword
: Keyword for a Major update. Defaults to `Major`

minor_keyword
: Keyword for a Minor update. Defaults to `Minor`

# Auto-Increment

The plugin can automatically increment the semantic version by checking the content of a
given file. Per default, it will look for a file called `CHANGELOG.md` in the root folder
of the repository. The content of the file will be divided by the given regular expression
configured using `PLUGIN_FILE_REGEX`. The default expression is dividing the content by
versions in the format `[*.*.*]`.

## Example

The following content shows an example of a changelog file containing a major update:

```markdown
# [Unreleased]

- Something else
- **Major** New update

# [1.0.0]

- Something
```

The plugin will evaluate the following section:

```markdown
# [Unreleased]

- Something else
- **Major** New update
```

Since this section contains the keyword `Major`, which is the default keyword configured
using `PLUGIN_MAJOR_KEYWORD`, it will increment the semantic version using a major update.
