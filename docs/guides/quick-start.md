---
layout: 'default'
title: 'Quick Start'
permalink: '/guides/quick-start'
---
Etch Router is designed to be quick and easy to use whilst being flexible enough to use anywhere.

# Install

The first step is to install `etch-router` and `etch` from NPM.

```plain
npm install --save etch-router etch
```

_Notice that you have to install `etch` as well. This gives you control of the etch version._

# Your Components

For this example we are going to have 3 Etch components that make up the app. `Layout`, a wrapper that puts the site name and a sidebar around its child components. `Home`, the home page. `About`, the about page.

```javascript
const etch = require('etch')

class Layout{
  constructor(props, children){
    this.props = props
    this.children = children
    etch.initialize(this)
  }

  update(props, children){
    this.props = props
    this.children = children
    return etch.update(this)
  }

  render(){
    return etch.dom.div({className: 'layout'}, (this.children || null))
  }

  destroy(){
    return etch.destroy(this)
  }
}

class Home{
  constructor(props, children){
    this.props = props
    etch.initialize(this)
  }

  update(props, children){
    this.props = props
    return etch.update(this)
  }

  render(){
    return etch.dom.div({className: 'home', ref: 'homePage'}, 'Home')
  }

  destroy(){
    return etch.destroy(this)
  }
}

class About{
  constructor(props, children){
    this.props = props
    etch.initialize(this)
  }

  update(props, children){
    this.props = props
    return etch.update(this)
  }

  render(){
    return etch.dom.div({className: 'about', ref: 'aboutPage'}, 'About')
  }

  destroy(){
    return etch.destroy(this)
  }
}
```

With those 3 components the routing structure we are aiming for is:

 - `/` renders `Home` inside `Layout`
 - `/about` renders `About` inside `Layout`

# The Router

At a minimum you need to require `Router` and `Route` from `etch-router`

```javascript
const {Router, Route} = require('etch-router')
```

With those required you create a `Router` with a collection of `Route`s as children.

```javascript
var router = new Router(
  {},
  new Route(
    {path: '/', component: Layout, name: 'Index'},
    new Route({path: '/', component: Home, name: 'Home'}),
    new Route({path: '/about', component: About, name: 'About'})
  )
)
```

[Router](/components/router) takes a few options all of which are optional. In this example the router will have assumed that in the absense of an explicit `currentPath` that it should render `/`.

The [Routes](/components/route) take a couple of options that are required. `path` is the path the route is for relative to the parent route. `component` is the etch component to render when that route is active. `name` can be omitted.

The router will always find the deepest child for a given route, which in that example asking for `/` will return the route for the Home component not the Layout component. When rendering the output the router passes up the chain nesting components in their parents.

You can then output the current router to the DOM with:

```javascript
document.body.appendChild(router.element)
```

The current HTML output will be:

```HTML
<div class="layout">
  <div class="home">Home</div>
</div>
```

Now you have a working router its time to start [Navigating](/guides/navigating) it.
