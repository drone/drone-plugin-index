---
date: 2018-04-19T00:00:00+00:00
title: Webhook
author: drone-plugins
tags: [ notifications, trigger, webhook ]
logo: webhook.svg
repo: drone-plugins/drone-webhook
image: plugins/webhook
---

Use the Webhook plugin to notify services via Webhook when a build completes. You will need to supply Drone with outgoing Webhook URLs. The below pipeline configuration demonstrates simple usage:

```yaml
pipeline:
  webhook:
    image: plugins/webhook
    urls: https://your.webhook/...
```

Example configuration with multiple URLs:

```diff
pipeline:
  webhook:
    image: plugins/webhook
-   urls: https://your.webhook/...
+   urls:
+     - https://your.webhook/...
+     - https://your.other.webhook/...
```

Example configuration with Basic Authentication:

```diff
pipeline:
  webhook:
    image: plugins/webhook
    username: myusername
    password: mypassword
    urls: https://your.webhook/...
```

Example configuration with custom body:

```diff
pipeline:
  webhook:
    image: plugins/webhook
    username: myusername
    password: mypassword
    urls: https://your.webhook/...
+   content_type: application/json
+   template: |
+     {
+       "owner": "{{ repo.owner }}",
+       "repo": "{{ repo.name }}",
+       "status": "{{ build.status }}",
+     }
```

A list of the mustache-like parameters that the temaplate can accpet is in the source code, which is a little different from [the official given parameters to the plugins](https://github.com/drone/drone-plugin-starter/blob/master/main.go#L25).
```go
func run(c *cli.Context) error {
	plugin := Plugin{
		Repo: Repo{
			Owner: c.String("repo.owner"),
			Name:  c.String("repo.name"),
		},
		Build: Build{
			Tag:     c.String("build.tag"),
			Number:  c.Int("build.number"),
			Event:   c.String("build.event"),
			Status:  c.String("build.status"),
			Commit:  c.String("commit.sha"),     // write commit.* fields into build
			Ref:     c.String("commit.ref"),     // so if you want to print sha hash of the commit
			Branch:  c.String("commit.branch"),  // use {{ build.sha }}
			Author:  c.String("commit.author"),
			Message: c.String("commit.message"),
			Link:    c.String("build.link"),
			Started: c.Int64("build.started"),
			Created: c.Int64("build.created"),
		},
		Job: Job{
			Started: c.Int64("job.started"),
		},
		Config: Config{
			Method:      c.String("method"),
			Username:    c.String("username"),
			Password:    c.String("password"),
			ContentType: c.String("content-type"),
			Template:    c.String("template"),
			Headers:     c.StringSlice("headers"),
			URLs:        c.StringSlice("urls"),
			Debug:       c.Bool("debug"),
			SkipVerify:  c.Bool("skip-verify"),
		},
	}

	return plugin.Exec()
}
```

Example configuration to debug response:

```diff
pipeline:
  webhook:
    image: plugins/webhook
    username: myusername
    password: mypassword
    urls: https://your.webhook/...
+   debug: true
```

# Secret Reference

webhook_urls
: Payload gets sent to this list of URLs

webhook_username
: Username for basic auth

webhook_password
: Password for basic auth

# Parameter Reference

urls
: Payload gets sent to this list of URLs

username
: Username for basic auth

password
: Password for basic auth

method
: HTTP submission method, defaults to POST

content_type
: Sontent type, defaults to application/json

template
: Custom template for webhook

headers
: Map of custom headers

skip_verify
: Skip SSL verification

debug
: Enable debug information
