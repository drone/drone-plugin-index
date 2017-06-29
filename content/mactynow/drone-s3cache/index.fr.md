---
date: 2017-06-29T00:00:00+00:00
title: Drone-s3cache
author: mactynow
tags: [ s3, cache ]
repo: mactynow/drone-s3cache
logo: amazon_s3.svg
image: quay.io/honestbee/drone-kubernetes
---

{{% alert error %}}
Ce plugin nécessite un compte AWS. 
{{% /alert %}}

Ce plugin peut être utilisé pour sauvegarder des fichiers et répertoires d'un build à l'autre en les conservant sur AWS s3. Le pipeline ci-dessous en démontre un usage simple.

{{% alert info %}}
Ce plugin est inspiré par et contient des morceaux de https://github.com/Drillster/drone-volume-cache. Si vous comptez conserver votre cache uniquement sur votre machine hôte, utilisez leur plugin!
{{% /alert %}}

Exemple de configuration de pipeline:

```yaml
pipeline:
  restore-cache:
    image: mactynow/drone-s3cache
    aws_access_key_id: ${AWS_ACCESS_KEY_ID}
    aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}
    region: us-east-1
    bucket: drone-cache
    restore: true
    cache: 
      - vendor/bundle
  
  build:
    image: ruby
    commands:
      - bundle install

  rebuild-cache:
    image: mactynow/drone-s3cache
    aws_access_key_id: ${AWS_ACCESS_KEY_ID}
    aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}
    region: us-east-1
    bucket: drone-cache
    rebuild: true
    cache: 
      - vendor/bundle
```

Le flag `rebuild` fait copier les fichiers de l'environement de build sur s3. Cette section doit se situer à la fin de votre pipeline.

```diff
pipeline:
  rebuild-cache:
    image: mactynow/drone-s3cache
    aws_access_key_id: ${AWS_ACCESS_KEY_ID}
    aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}
    region: us-east-1
    bucket: drone-cache
    rebuild: true
    cache: 
      - vendor/bundle
```

Le flag `restore` fait copier les fichiers de s3 dans l'environement de build. Cette section doit être déclarée au début du pipeline, avant les étapes de build.

```diff
pipeline:
  restore-cache:
    image: mactynow/drone-s3cache
    aws_access_key_id: ${AWS_ACCESS_KEY_ID}
    aws_secret_access_key: ${AWS_SECRET_ACCESS_KEY}
    region: us-east-1
    bucket: drone-cache
    restore: true
    cache: 
      - vendor/bundle
```

# Effectuer un build sans cache

Il est possible de forcer un build à s'effectuer sans cache en spécifiant `[NO CACHE]` dans le message de commit.

# Effacer le cache

Il est possible de nettoyer le cache pour le repository en spécifiant `[CLEAR CACHE]` dans le message de commit.

# Référence des paramêtres

aws_access_key_id
: Votre Amazon Web Services key id (qu'il vaut mieux spécifier en tant que secret).

aws_secret_access_key
: Votre Amazon Web Services secret key (qu'il vaut mieux spécifier en tant que secret).

region
: Votre region Amazon Web Services.

bucket
: Votre bucket Amazon Web Services s3.

restore
: Restaurer le cache depuis s3 (booléen).

rebuild
: Uploader le cache sur s3 (booléen).

cache
: Répertoires à ajouter au cache.
