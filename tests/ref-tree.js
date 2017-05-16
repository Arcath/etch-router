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
          return etch.dom.div({className: 'layout', ref: 'layoutDiv'}, ...children)
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
            return etch.dom.div({className: 'layout', ref: 'layoutDiv'}, ...children)
          })
        },
        new Route({
          path: '/',
          component: stateless(etch, function(props, children){
            return etch.dom.div({className: 'home', ref: 'home'})
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
            return etch.dom.div({className: 'layout', ref: 'home'}, ...children)
          })
        },
        new Route({
          path: '/',
          component: stateless(etch, function(props, children){
            return etch.dom.p({className: 'home', ref: 'home'})
          })
        })
      )
    )

    expect(router.refTree.home.nodeName).to.equal('DIV')
  })
})
