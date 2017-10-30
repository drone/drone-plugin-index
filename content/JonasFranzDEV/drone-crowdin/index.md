---
date: 2017-09-23T00:00:00+00:00
title: Crowdin
author: JonasFranzDEV
tags: [ publish, translation ]
repo: JonasFranzDEV/drone-crowdin
logo: crowdin.svg
image: jonasfranz/crowdin
---

The Crowdin plugin allows you to submit translation files to Crowdin.

Information about API keys: https://support.crowdin.com/api/api-integration-setup/

The following is a sample configuration in your .drone.yml file:

```yaml
pipeline:
  crowdin:
    image: jonasfranz/crowdin
    project_identifier: example
    project_key: 1bc29b36f623ba82aaf6724fd3b16718
    files:
      example: options/example.ini
      example2: options/example2.ini
```

This configuration will use the git branch as Crowdin branch. If you want to ignore the git branch simply add:

```diff
pipeline:
  crowdin:
    image: jonasfranz/crowdin
    project_identifier: example
    project_key: 1bc29b36f623ba82aaf6724fd3b16718
    files:
      example: options/example.ini
      example2: options/example2.ini
+   ignore_branch: true
```

This configuration will upload the given files to Crowdin but will not download any file from Crowdin. To download files from Crowdin add:

```diff
pipeline:
  crowdin:
    image: jonasfranz/crowdin
    project_identifier: example
    project_key: 1bc29b36f623ba82aaf6724fd3b16718
    files:
      example: options/example.ini
      example2: options/example2.ini
+   download: true
+   export_dir: lang/
```

**Hint: The downloaded files will not be commited automatically. Please use the [drone-git-push plugin](https://github.com/appleboy/drone-git-push) to push the downloaded files.**

To download only specific languages (here: German and English) from Crowdin please use:

```diff
pipeline:
  crowdin:
    image: jonasfranz/crowdin
    project_identifier: example
    project_key: 1bc29b36f623ba82aaf6724fd3b16718
    files:
      example: options/example.ini
      example2: options/example2.ini
    download: true
    export_dir: lang/
+   languages:
+     - de
+     - en
```


If you only want to download files from Crowdin and not upload remove these lines:
```diff
pipeline:
  crowdin:
    image: jonasfranz/crowdin
    project_identifier: example
    project_key: 1bc29b36f623ba82aaf6724fd3b16718
-   files:
-     example: options/example.ini
-     example2: options/example2.ini
    download: true
    export_dir: lang/
    languages:
     - de
     - en
```

# Secret Reference

crowdin_identifier
: Identifier provided by Crowdin

crowdin_key
: API key provided by Crowdin

# Parameter Reference

project_identifier
: Identifier provided by Crowdin

project_key
: API key provided by Crowdin

files
: Map of translatable files with the Crowdin file name as key and the real filepath as value. The plugin will not upload any files if this list is empty.

ignore_branch
: It will send the Drone branch to Crowdin if it is `false`. (Default: `false`)

download
: Downloads translated files from Crowdin if it is `true`. (Default: `false`)

export_dir
: Export directory of the translated strings

languages
: Languages which should be downloaded/exported from Crowdin. (Default: `all`)