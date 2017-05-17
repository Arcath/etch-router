---
layout: 'default'
title: 'Navigating'
permalink: '/guides/navigating'
---
Navigating in Etch Router is as simple as updating the `currentPath` prop on the router.

Taking the router from the [Quick Start Guide](/guides/quick-start) moving to the about can be done using the `update` method (like any etch component).

```javascript
router.update({currentPath: '/about'})
```

That's it! You will now see the about page instead.

## Link

To make navigating easier Etch Router provides as `Link` component that triggers the update for you.

Lets update the home component to link to the about component

```javascript
const {Link} = require('etch-router')

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
    return etch.dom.div(
      {className: 'home', ref: 'homePage'},
      etch.dom.h1({}, 'Home'),
      etch.dom(Link, {to: '/about', router: this.props.router}, 'About Us')
    )
  }

  destroy(){
    return etch.destroy(this)
  }
}
```

[Link](/components/link) needs to be given the `router` it should be updating and the path `to` update to.

_Etch Router passes the current router to the components it renders as a prop of `router`._
