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
