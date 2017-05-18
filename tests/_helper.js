/** @jsx etch.dom */
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
    return <div className='test'>
      <p>
        <Link to='/' router={this.props.router} ref='link' activeClassName='active'>link</Link>
      </p>
      {this.children}
    </div>
  }
}

beforeEach(function(){
  document.body.innerHTML = ''
})
