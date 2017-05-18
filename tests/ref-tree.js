/** @jsx etch.dom */
const etch = require('etch')
const stateless = require('etch-stateless')

const {Router, Route} = require('../index')

describe('Ref Tree', function(){
  it('should build the ref tree', function(){
    var router = new Router(
      {currentPath: '/'},
      new Route({
        path: '/',
        component: stateless(etch, function(props, children){
          return <div className='layout' ref='layoutDiv'>{children}</div>
        })
      })
    )

    expect(router.refTree.layoutDiv.nodeName).to.equal('DIV')
  })

  it('should build the ref tree over N children', function(){
    var router = new Router(
      {currentPath: '/'},
      new Route(
        {
          path: '/',
          component: stateless(etch, function(props, children){
            return <div className='layout' ref='layoutDiv'>{children}</div>
          })
        },
        new Route({
          path: '/',
          component: stateless(etch, function(props, children){
            return <div className='home' ref='home' />
          })
        })
      )
    )

    expect(router.refTree.home.nodeName).to.equal('DIV')
  })

  it('should handle collisions', function(){
    var router = new Router(
      {currentPath: '/'},
      new Route(
        {
          path: '/',
          component: stateless(etch, function(props, children){
            return <div className='layout' ref='home'>{children}</div>
          })
        },
        new Route({
          path: '/',
          component: stateless(etch, function(props, children){
            return <p className='home' ref='home' />
          })
        })
      )
    )

    expect(router.refTree.home.nodeName).to.equal('DIV')
  })
})
