/** @jsx etch.dom */
const etch = require('etch')
const {Link} = require('etch-router')

class Hooks{
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
    return <div className='hooks'>
      <p className='notice'>Hooks are passed to <Link to='/components/router' router={this.props.router}>Router</Link> as props.</p>
      {this.children}
    </div>
  }
}

module.exports = Hooks
