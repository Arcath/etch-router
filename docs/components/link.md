---
layout: 'default'
title: 'Link'
permalink: '/components/link'
---
`Link` is a simple component that updates `currentPath` on the supplied [Router](/components/router).

## Props

 - `to` the target of the link.
 - `router` the router to pass the path update to.

## Examples

```javascript
etch.dom(Link, {to: '/', router: this.props.router}, 'Home')
```

This would produce a link to `/` with the text `Home`. When clicked the supplied router will be passed a new path and will update the DOM.
