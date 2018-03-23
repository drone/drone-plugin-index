---
date: 2018-02-15T00:00:00+00:00
title: Netlify
author: lucaperret
tags: [ deploy, netlify ]
repo: lucaperret/drone-netlify
logo: netlify.svg
image: lucap/drone-netlify
---

The netlify plugin deploy your build to [netlify.com](https://netlify.com).

The below pipeline configuration demonstrates simple usage to deploy the current working directory:

```yaml
pipeline:
  netlify:
    image: lucap/drone-netlify
    token: xxxxx
    site_id: xxxxxxx-xxxx-xxx-xxxxxxxx
```

Example configuration for assigning [Netlify subdomain](https://www.netlify.com/docs/custom-domains/):

```diff
pipeline:
  netlify:
    image: lucap/drone-netlify
    token: xxxxx
    site_id: xxxxxxx-xxxx-xxx-xxxxxxxx
+   site_name: my-deployment-alias
```

Example configuration with [Custom domain](https://www.netlify.com/docs/custom-domains/):

```diff
pipeline:
  netlify:
    image: lucap/drone-netlify
    token: xxxxx
    site_id: xxxxxxx-xxxx-xxx-xxxxxxxx
-   site_name: my-deployment-alias
+   domain: my-custom-domain.com
```

Example configuration for specifying [environment](https://www.netlify.com/docs/continuous-deployment/#deploy-contexts):

```diff
pipeline:
  netlify:
    image: lucap/drone-netlify
    token: xxxxx
    site_id: xxxxxxx-xxxx-xxx-xxxxxxxx
-   domain: my-custom-domain.com
+   environment: production
```

Example configuration to deploy a specific folder or Zip (default current working directory):

```diff
pipeline:
  netlify:
    image: lucap/drone-netlify
    token: xxxxx
    site_id: xxxxxxx-xxxx-xxx-xxxxxxxx
-   environment: production
+   path: ./dist
```

Example configuration using token from secrets:

```diff
pipeline:
  netlify:
    image: lucap/drone-netlify
-   token: xxxxx
    site_id: xxxxxxx-xxxx-xxx-xxxxxxxx
+   secrets: [ netlify_token ]
```

# Secret Reference

netlify_token
: Netlify [token](https://app.netlify.com/applications)

# Parameter Reference

token
: `Required` Netlify [token](https://app.netlify.com/applications)

site_id
: `Required` Set the Site ID (or API ID in your Site settings dashboard)

site_name
: Set a Netlify subdomain

domain
: Set your custom domain

environment
: Specify an environment

path
: Path to a folder or zip file to deploy
