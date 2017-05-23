---
layout: 'default'
title: 'Wrapper'
permalink: '/components/wrapper'
---
Wrapper is a stateless Etch component that is designed to be used for routes that only have sub routes.

```javascript
const {Router, Route, Wrapper} = require('etch-router')

var router = new Router(
  {},
  new Route(
    {path: '/', component: Wrapper, props: {className: 'wrapper'}},
    new Route({path: '/', component: Home}),
    new Route({path: '/about', component: About})
  )
)

document.body.append(router.element)
/*
<div class="wrapper">{Home}</div>
*/
```

Wrapper takes 2 props:

 - `className` _String_ passed to `className` on the container element
 - `tag` _String_ the html tag name to use e.g. `div` or `p`
