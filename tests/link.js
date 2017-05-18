/** @jsx etch.dom */
const etch = require('etch')
const {Router, Route, Link} = require('../index')

describe('Link', function(){
  it('should have an is active function', function(){
    var router = new Router(
      {currentPath: '/foo'},
      new Route({path: '/foo', component: TestableComponent})
    )

    expect(router.refTree.link.isActive()).to.equal(false)
  })

  it('should support active class name', function(){
    var router = new Router(
      {currentPath: '/'},
      new Route({path: '/', component: TestableComponent})
    )

    expect(router.refTree.link.element.className).to.equal(' active')
  })
})
