const etch = require('etch')
const {Link} = require('etch-router')

class Sidebar{
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
      {className: 'sidebar'},
      etch.dom.h4({}, 'Etch Router'),
      etch.dom.ul(
        {},
        etch.dom.li({}, etch.dom(Link, {to: '/', router: this.props.router}, 'Home')),
        etch.dom.li({}, etch.dom(Link, {to: '/releases', router: this.props.router}, 'Releases'))
      ),
      etch.dom.h4({}, 'Components'),
      etch.dom.ul(
        {},
        etch.dom.li({}, etch.dom(Link, {to: '/components/router', router: this.props.router}, 'Router')),
        etch.dom.li({}, etch.dom(Link, {to: '/components/route', router: this.props.router}, 'Route')),
        etch.dom.li({}, etch.dom(Link, {to: '/components/link', router: this.props.router}, 'Link')),
        etch.dom.li({}, etch.dom(Link, {to: '/components/missing-route', router: this.props.router}, 'MissingRoute'))
      ),
      etch.dom.h4({}, 'Hooks'),
      etch.dom.ul(
        {},
        etch.dom.li({}, etch.dom(Link, {to: '/hooks/before-change-path', router: this.props.router}, 'beforeChangePath')),
        etch.dom.li({}, etch.dom(Link, {to: '/hooks/before-dom-update', router: this.props.router}, 'beforeDOMUpdate')),
        etch.dom.li({}, etch.dom(Link, {to: '/hooks/after-dom-update', router: this.props.router}, 'afterDOMUpdate')),
        etch.dom.li({}, etch.dom(Link, {to: '/hooks/after-change-path', router: this.props.router}, 'afterChangePath')),
        etch.dom.li({}, etch.dom(Link, {to: '/hooks/props-for-component', router: this.props.router}, 'propsForComponent'))
      )
    )
  }
}

module.exports = Sidebar
