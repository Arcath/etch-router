const etch = require('etch')

class MissingRoute{
  constructor(props, children){
    this.props = props
    this.children = children
    this.tag = 'MissingRoute'

    etch.initialize(this)
  }

  update(props, children){
    this.props = props
    this.children = children

    return etch.update(this)
  }

  render(){
    return ''
  }
}

module.exports = MissingRoute
