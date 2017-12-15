---
layout: 'default'
title: 'Route'
permalink: '/components/route'
---

`Route` is used as a child of `Router`. It can have other routes as children but can not be used by itself.

## Props

 - `path` _String_ the routes path relative to the parent route.
 - `component` _Etch Component_ the etch component to display when this route is active.
 - `name` _String_ the name of the route.
 - `props` _Object_ the props object to pass to the component. Is merged with the props in etch-router and then passed to [propsForComponent](/hooks/props-for-component)

## Examples

### Nesting

```javascript
new Route(
  {path: '/', component: Layout, name: 'Layout'},
  new Route({path: '/', component: Home, name: 'Home'}),
  new Route({path: '/about', component: About, name: 'About'})
  new Route({path: '/contact', component: Contact, name: 'Contact'})
)
```

Etch Router nests components the same as routes. In this example loading `/` would be the same as:

```javascript
etch.dom(
  Layout,
  {router: app},
  etch.dom(
    Home,
    {router: app}
  )
)
```
