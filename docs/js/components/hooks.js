const etch = require('etch')
const {Link} = require('etch-router')

const Sidebar = require('./sidebar')

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
    return etch.dom.div(
      {className: 'hooks'},
      etch.dom(Sidebar, {router: this.props.router}),
      etch.dom.div(
        {className: 'content'},
        etch.dom.p(
          {className: 'notice'},
          'Hooks are passed to ',
          etch.dom(Link, {to: '/components/router', router: this.props.router}, 'Router'),
          ' as props.'
        ),
        ...this.children
      )
    )
  }
}

module.exports = Hooks
