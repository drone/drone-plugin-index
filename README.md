[![Netlify Status](https://api.netlify.com/api/v1/badges/b423dc68-c658-4452-8a62-04c6397ee9a1/deploy-status)](https://app.netlify.com/sites/drone-plugins/deploys)
[![Build Status](https://harness.drone.io/api/badges/drone/drone-plugin-index/status.svg)](https://harness.drone.io/drone/drone-plugin-index)

The master branch of this repo is currently deployed [here](https://plugins.drone.io).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

First, install the dependencies

```bash
npm i
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Plugin Docs

Inside the `plugins` folder you will find a folder for each individual plugin.

Inside the individual plugin folders you will find a `content.yaml` file that defines the docs.

Each `content.yaml` is validated against a JSON schema `plugin-validation/plugin-schema.json`.

The plugin example in the content.yaml is also validated against a JSON schema `plugin-validation/example-schema.json`.

To run the validation script:

```bash
npm run validate
```

Plugin logos can be found here `public/logos`, the file name should be referred to in the `content.yaml`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
