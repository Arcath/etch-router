---
layout: 'default'
title: 'Params'
permalink: '/guides/params'
---
Etch Router uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) under the hood to parse routes. This means that any params it supports can be used in your app.

Any route params are passed to that routes componet as `props.params`.

Takes the [releases](/releases) pages on this site.

```javascript
new Route(
  {path: '/releases', component: Releases, name: 'Releases'},
  new Route({path: '/:id', component: Release, name: 'Release'})
)
```

The route for an individual release has the path of `/releases/:id`. In the `Release` component we have access to `this.props.params.id` to use the ID from the URL.
