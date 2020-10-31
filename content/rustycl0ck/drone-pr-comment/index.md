---
title: GitHub Pull-Request Comment
author: rustycl0ck
tags: [ github, enterprise-github, bot ]
logo: github.svg
repo: rustycl0ck/drone-pr-comment
image: rustycl0ck/drone-pr-comment
---

This plugin can be used for posting customized messages on GitHub pull requests (like sending back test results). You will have to create a [GitHub App](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-a-github-app) and install it in your repository.
Provide `Read & Write` access on `Issues` and `Pull Requests` to the app. For authentication and authorizations, this plugin will use private key from the created GitHub App.

Below configuration demonstrates simple usage:

```yaml
steps:
- name: pr_comment
  image: rustycl0ck/drone-pr-comment
  settings:
    rsa_key:
      from_secret: pr_rsa_key
    app_id:
      from_secret: pr_app_id
    comment_file: test-results.txt
  when:
    event:
    - pull_request
```

Comments can be read as inline text as well:

```diff
  steps:
  - name: pr_comment
    image: rustycl0ck/drone-pr-comment
    settings:
      rsa_key:
        from_secret: pr_rsa_key
      app_id:
        from_secret: pr_app_id
-     comment_file: test-results.txt
+     comment_text: Some checks failed to pass. Please fix them and update the PR.
    when:
      event:
      - pull_request
+     status:
+     - failure
```

If you are using Enterprise GitHub:

```diff
  steps:
  - name: pr_comment
    image: rustycl0ck/drone-pr-comment
    settings:
      rsa_key:
        from_secret: pr_rsa_key
      app_id:
        from_secret: pr_app_id
      comment_file: test-results.txt
+     enterprise_gh_host: https://github.organization.com
    when:
      event:
      - pull_request
```

# Parameter Reference

rsa_key
: GitHub App private key contents. (Ref: [Create GitHub App](https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-a-github-app), [Generate App Keys](https://docs.github.com/en/free-pro-team@latest/developers/apps/authenticating-with-github-apps#generating-a-private-key))

rsa_key_file
: Path to GitHub App private key file (if `rsa_key` parameter is not provided)

app_id
: GitHub App ID (Ref: [Save Your Private Key and App ID](https://docs.github.com/en/free-pro-team@latest/developers/apps/setting-up-your-development-environment-to-create-a-github-app#step-3-save-your-private-key-and-app-id))

comment_text
: The text which will be posted as a comment on the Pull Request

comment_file
: Path to a file whose contents will be posted as a comment on the Pull Request

comment_wrap_as_code
: If `true`, the whole comment will be quoted within ` ``` ` and ` ``` `

enterprise_gh_host
: URL of the Enterprise GitHub. If omitted, public github is used.

skip_tls_verify
: Skip TLS certificate verification check on hosted GitHub instances

debug
: Verbose logging [WARNING: This will expose the `Installation ID` of the github app in logs]

log_format
: Either `json` or `logfmt` (default) log format

