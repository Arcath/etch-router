const etch = require('etch')
const {Link} = require('etch-router')

const Layout = require('./layout')

class Missing{
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
    var path = ''
    if(this.props.router){
      path = this.props.router.currentPath
    }

    return etch.dom(
      Layout,
      {},
      etch.dom.div(
        {className: 'missing'},
        etch.dom.h2({}, 'Error 404'),
        etch.dom.p(
          {},
          'Could not find the page ',
          etch.dom.i({}, path),
          '.'
        ),
        etch.dom.p(
          {},
          'Head back to the ',
          etch.dom(Link, {to: '/', router: this.props.router}, 'home page'),
          '.'
        )
      )
    )
  }
}

module.exports = Missing
