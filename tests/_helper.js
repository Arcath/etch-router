const chai = require('chai')
const etch = require('etch')
const {Link} = require('../index')

global.expect = chai.expect

global.TestableComponent = class{
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
    return etch.dom.div(
      {className: 'test'},
      etch.dom.p(
        {},
        etch.dom(Link, {to: '/', router: this.props.router, ref: 'link', activeClassName: 'active'}, 'link')
      ),
      ...this.children
    )
  }
}

beforeEach(function(){
  document.body.innerHTML = ''
})
