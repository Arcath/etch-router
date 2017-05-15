const etch = require('etch')
const showdown = require('showdown')

class Static{
  constructor(props, children){
    this.props = props
    this.children = children

    this.markdown = new showdown.Converter()

    etch.initialize(this)
  }

  update(props, children){
    this.props = props
    this.children = children

    return etch.update(this)
  }

  render(){
    return etch.dom.div({className: 'static', ref: 'content', innerHTML: this.markdown.makeHtml(this.props.content)})
  }
}

module.exports = Static
