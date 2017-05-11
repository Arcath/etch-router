# Etch-Router

A Router for Etch that provides methods to link and pass props to Etch components

# Install

Install Etch-Router from npm

```
npm install --save etch etch-router
```

Etch has to be installed seperately, but npm will throw an error when Etch-Router is installed into a package without it.

# Usage

Require `Router` and `Route` from `etch-router`.

```javascript
const {Router, Route} = require('etch-router')
```

Router & Route a just Etch components that are mounted to the DOM. They have no HTML output and instead output the etch components passed to them in their props.

Define your Router as you would any Etch component:

```javascript
var router = new Router(
  {currentPath: '/'},
  new Route(
    {path: '/', component: Layout, name: 'Index'},
    new Route({path: '/', component: Home, name: 'Home'}),
    new Route({path: '/about', component: About, name: 'About'})
  )
)
```
