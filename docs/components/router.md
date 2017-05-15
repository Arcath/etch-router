---
layout: 'default'
title: 'Router'
permalink: '/components/router'
---

The Router is the main component of Etch Router.

Your application starts as a `new Router` which  at a minimum needs the prop `currentPath`.

## Props

 - `currentPath` _String_ tells the router which route to render. When using Etch Router in the browser you probably want to set this to `window.location.pathname`
 - `browser` _Boolean_ is etch-router running in the browser? If set to true etch-router will handle push/pop state for you.
 - `beforeChangePath` _Function_ See [beforeChangePath](/hooks/before-change-path) hook.
 - `beforeDOMUpdate` _Function_ See [beforeDOMUpdate](/hooks/before-dom-update) hook.
 - `afterDOMUpdate` _Function_ See [afterDOMUpdate](/hooks/after-dom-update) hook.
 - `afterChangePath` _Function_ See [afterChangePath](/hooks/after-change-path) hook.
 - `propsForComponent` _Function_ See [propsForComponent](/hooks/props-for-component) hook.

## Examples

### Simple in Browser Router

```javascript
var app = new Router(
  {
    currentPath: window.location.pathname,
    browser: true
  },
  new Route(
    {path: '/', component: Layout, name: 'Layout'},
    new Route({path: '/', component: Home, name: 'Home'}),
    new Route({path: '/about', component: About, name: 'About'})
  )
)
```
