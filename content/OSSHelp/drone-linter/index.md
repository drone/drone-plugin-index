---
version: '1.3.2'
date: 2021-02-06-T00:00:00+00:00
title: Linter
author: OSSHelp
tags: [ linter, hadolint, shellcheck, yamllint, flake8, markdownlint ]
logo: git.svg
repo: osshelp/drone-linter
image: osshelp/drone-linter
---

This plugin contains following linters:

* hadolint (Dockerfile)
* shellcheck (bash scripts)
* yamllint (YAML files)
* flake8 (Python scripts)
* markdownlint (Markdown)
* jsonlint (JSON files)

# Usage examples

## Find and lint files automatically

``` yaml
steps:
  - name: lint
    image: osshelp/drone-linter
```

## Specific files to check

``` yaml
steps:
  - name: lint
    image: osshelp/drone-linter
    settings:
      yml_files:
        - file1.yml
        - dir/file2.yml
      sh_files:
        - entrypoint.sh
      dockerfiles:
        - Dockerfile
      markdown_files:
        - README.md
      python_files:
        - test.py
      json_files:
        - file.json
```

## Skip checks

``` yaml
steps:
  - name: lint
    image: osshelp/drone-linter
    settings:
      skip_yml: true
      skip_sh: true
      skip_dockerfile: true
      skip_markdown: true
      skip_python: true
      skip_json: true
```

## Exclude files by exclude_regex

``` yaml
steps:
  - name: lint
    image: osshelp/drone-linter
    settings:
      exclude_regex: '(regex1|regex2)'
```

# Parameter Reference

## Specific files

yml_files
: list of YAML files or to check

sh_files
: list of shell scripts to check

dockerfiles
: list of Dockerfiles to check

markdown_files
: list of files with Markdown syntax inside to check

python_files
: list of python scripts to check

json_files
: list of JSON files to check

## Disable linters

skip_yml
: skip checking YAML files

skip_sh
: skip checking shell scripts

skip_dockerfile
: skip checking Dockerfiles

skip_markdown
: skip checkimg MD files

skip_python
: skip checking Python scripts

skip_json
: skip checking JSON files

## Excluding files

exclude_regex
: regular expression to to exclude files from checking


## Linters documentations

* [hadolint](https://github.com/hadolint/hadolint)
* [shellcheck](https://github.com/koalaman/shellcheck)
* [yamllint](https://yamllint.readthedocs.io/en/stable/)
* [flake8](http://flake8.pycqa.org/en/latest/user/error-codes.html)
* [markdownlint](https://github.com/DavidAnson/markdownlint)
* [jsonlint](https://github.com/zaach/jsonlint)

## Links

* [Plugin sources at Github](https://github.com/OSSHelp/drone-linter)
* [Plugin image at DockerHub](https://hub.docker.com/r/osshelp/drone-linter)
