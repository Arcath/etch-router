---
layout: 'default'
title: 'Browser'
permalink: '/guides/browser'
---
Etch Router can handle the browsers state for you!

Simply pass `browser: true` to the router when you create it.

```javascript
var app = new Router(
  {
    browser: true,
    currentPath: window.location.pathname
  }
  // Routes Here
)
```

As the entry point for the app is unknown you need to use the current urls path to start up the router, hence setting `currentPath` to `window.location.pathname`.

Using the [beforeChangePath](/hooks/before-change-path) and [afterChangePath](/hooks/after-change-path) hooks you can easily add loading animations like [NProgress](http://ricostacruz.com/nprogress/).

```javascript
beforeChangePath: function(){
  window.scrollTo(0, 0) // Without this pages could start scrolled
  NProgress.start()
},
afterChangePath: function(newPath){
  NProgress.done()
}
```
