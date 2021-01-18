# drone-plugin-index

[![Build Status](https://cloud.drone.io/api/badges/drone/drone-plugin-index/status.svg)](https://beta.drone.io/drone/drone-plugin-index)

This repository contains the source for the public index of Drone plugins at [plugins.drone.io](http://plugins.drone.io).
To generate the documentation you will need to download and install the [hugo](https://gohugo.io/overview/installing/) static website engine and the theme.

Clone the theme:

```bash
git clone https://github.com/drone/drone-hugo-theme.git themes/drone-hugo-theme
```

Generate and serve the documentation at `http://localhost:1313/`:

```bash
hugo server -b localhost:1313 -w
```
