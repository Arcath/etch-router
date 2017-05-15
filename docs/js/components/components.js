const etch = require('etch')

const Sidebar = require('./sidebar')

class Components{
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
      {className: 'components'},
      etch.dom(Sidebar, {router: this.props.router}),
      etch.dom.div({className: 'content'}, ...this.children)
    )
  }
}

module.exports = Components
