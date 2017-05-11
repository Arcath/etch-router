const etch = require('etch')

class MissingRoute{
  constructor(props, children){
    this.props = props
    this.tag = 'MissingRoute'

    etch.initialize(this)
  }

  update(props, children){
    return etch.update(this)
  }

  render(){
    return etch.dom(this.props.component, {})
  }
}

module.exports = MissingRoute
