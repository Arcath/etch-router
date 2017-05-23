/** @jsx etch.dom */
const etch = require('etch')

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
    return <div clasName='components'>{this.children}</div>
  }
}

module.exports = Components
