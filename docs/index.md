---
layout: 'default'
title: 'Etch Router'
permalink: '/'
---
Etch-Router is a routing system for [Etch](https://github.com/atom/etch).

### Get It

Install `etch-router` and `etch` from npm:

```shell
npm install etch etch-router
```

### Use it

```javascript
const {Router, Route} = require('etch-router')

var router = new Router(
  {currentPath: '/'},
  new Route(
    {path: '/', component: Layout, name: 'Index'},
    new Route({path: '/', component: Home, name: 'Home'}),
    new Route({path: '/about', component: About, name: 'About'})
  )
)

document.body.appendChild(router.element)
```
