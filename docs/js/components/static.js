const etch = require('etch')
const showdown = require('showdown')

class Static{
  static propsForComponent(newPath, newProps){
    if(document.getElementById('content').dataset.path == newPath){
      newProps.content = document.getElementById('content').innerHTML
      newProps.title = document.getElementById('title').innerHTML
    }else{
      newProps.content = window.pages[newPath].content
      newProps.title = window.pages[newPath].title
    }

    return newProps
  }

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
    return etch.dom.div(
      {className: 'static', ref: 'content'},
      etch.dom.h1({}, this.props.title),
      etch.dom.div({innerHTML: this.markdown.makeHtml(this.props.content)})
    )
  }
}

module.exports = Static
