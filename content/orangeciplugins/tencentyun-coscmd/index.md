---
date: 2019-08-29T00:00:00+00:00
title: tencentyun-coscmd
author: orange-ci
tags: [ cos, upload]
logo: tencentyun-coscmd.svg
image: orangeciplugins/tencentyun-coscmd
---

Using this tencentyun-coscmd plugin, the user can upload, download and delete the object (Object) of tencent cloud cos through simple command line instructions.

Document address: https://cloud.tencent.com/document/product/436/10976

```yaml
steps:
- name: tencentyun-coscmd
  image: orangeciplugins/tencentyun-coscmd
  commands:
    # configure
    - coscmd config -a AChT4ThiXAbpBDEFGhT4ThiXAbp**** -s WE54wreefvds3462refgwewe**** -b examplebucket-1250000000 -r ap-beijing
    # upload
    - coscmd upload <localpath> <cospath>
```

For more configuration items, please refer to: https://cloud.tencent.com/document/product/436/10976#.E4.B8.8A.E4.BC.A0.E6.96.87.E4.BB.B6.E6.88.96.E6.96.87.E4.BB.B6.E5.A4.B9


# Command Line Parameter Reference

coscmd -h  // show more usages