---
layout: 'default'
title: 'Refs'
permalink: '/guides/refs'
---
Your components refs are merged through the tree into `router.refTree`

Going back to the components from the [quick start guide](/guides/quick-start) the Home and About pages have refs on the main div. If you are viewing `/` the routers `refTree` will have a subkey of `homePage` which works like a normal ref in etch.
