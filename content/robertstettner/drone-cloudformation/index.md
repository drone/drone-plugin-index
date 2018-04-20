---
date: 2017-07-18T00:00:00+00:00
title: AWS CloudFormation
author: robertstettner
tags: [ deploy, amazon, aws, cloudformation ]
logo: amazon_cloudformation.svg
repo: robertstettner/drone-cloudformation
image: robertstettner/drone-cloudformation
---
The CloudFormation plugin can be used to create/update or delete stacks, and to validate templates. The below pipeline configuration demonstrates simple deployment usage:

```yaml
pipeline:
  deploy:
    image: robertstettner/drone-cloudformation
    stackname: my-awesome-stack
    template: templates/stack.yml
    params:
      Version: 123
      Environment: staging
    when:
      event: deployment
```

Deployment of multiple stacks example below:
```diff
pipeline:
  deploy:
    image: robertstettner/drone-cloudformation
+   batch:
+     - stackname: my-database-stack
+       template: templates/db.yml
+       params:
+         Environment: staging
+     - stackname: my-app-stack
+       template: templates/app.yml
+       params:
+         Version: 123
+         Environment: staging
    when:
      event: deployment
```

Template validation example below:
```yaml
pipeline:
  validate-template:
    image: robertstettner/drone-cloudformation
    mode: validate
    template: templates/stack.yml
```

Parallel template validation example below:
```diff
pipeline:
  validate-template:
    image: robertstettner/drone-cloudformation
+   parallel: true
+   batch:
+     - mode: validate
+       template: templates/db.yml
+     - mode: validate
+       template: templates/app.yml
```


# Parameter Reference

mode
: the mode to run the plugin (see below), defaults to `createOrUpdate`.

stackname
: the name of the CloudFormation stack. Required for all but `validate` mode.
 
template
: the path location of the template file. Required for all but `delete` mode.

params
: object of parameters to feed into the template. Optional. Not needed for `validate` and `delete` modes.

region
: the AWS region to deploy to, defaults to `eu-west-1`.

access_key
: the AWS access key. Optional.

secret_key
: the AWS secret key. Optional.

batch
: an array of configurations.

parallel
: a boolean denoting parallel execution of batch configs, defaults to `false`.


# Modes

There are four modes that the plugin can be run with:

createOrUpdate
: automatically determines whether to create or update a stack.

create
: creates a stack.

delete
: deletes a stack.

validate
: validates a template.
