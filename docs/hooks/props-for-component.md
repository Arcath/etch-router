---
layout: 'default'
title: 'propsForComponent'
permalink: '/hooks/props-for-component'
---
`propsForComponent` is called by the router to generate the props for the component.

`propsForComponent` has to return the props object.

## Arguments

 - `component` _Etch Component Class_ the component class.
 - `newPath` _String_ the routers new path.
 - `newProps` _Object_ the current props for the object.

# In component

`propsForComponent` can also be defined on one of your components. If you only need to filter/build the props for a single component define the static method `propsForComponent` in your components class.

```javascript
class Component{
  constructor(props, children){
    this.props = props
    this.children = children

    etch.initialize(this)
  }

  ...

  static propsForComponent(newPath, newProps){
    newProps.path = newPath

    return newProps
  }
}
```
