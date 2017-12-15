/** @jsx etch.dom */

const etch = require('etch')
const {Router, Route} = require('../')
const stateless = require('etch-stateless')

describe('Route', function(){
  it('should pass props to the component', function(){
    var router = new Router(
      {},
      new Route({path: '/', component: stateless(etch, function(props, children){
        return <div>{props.path}</div>
      })})
    )

    expect(router.element.outerHTML).to.equal('<div>/</div>')
  })

  it('should pass route props to the component', function(){
    var router = new Router(
      {},
      new Route({path: '/', props: {test: 'passed'}, component: stateless(etch, function(props, children){
        return <div>{props.test}</div>
      })})
    )

    expect(router.element.outerHTML).to.equal('<div>passed</div>')
  })
})
