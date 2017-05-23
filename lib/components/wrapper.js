const etch = require('etch')

class Wrapper{
  constructor(props, ...children){
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
    var tag = (this.props.tag || 'div')
    var props = {}

    if(this.props.className) props.className = this.props.className

    return etch.dom(tag, props, ...this.children)
  }
}

module.exports = Wrapper
