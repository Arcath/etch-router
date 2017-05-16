const etch = require('etch')
const {Link} = require('etch-router')
const jQuery = require('jquery')
const showdown = require('showdown')

class Releases{
  constructor(props, children){
    this.props = props
    this.children = children

    if(!this.props.release){
      this.props.release = {
        name: '',
        body: ''
      }
    }

    this.markdown = new showdown.Converter()

    etch.initialize(this)

    var _ = this
    jQuery.getJSON('https://api.github.com/repos/arcath/etch-router/releases/' + this.props.params.id, function(data){
      _.update({
        release: data
      })
    })
  }

  update(props, children){
    this.props.release = props.release

    document.title = "Release " + this.props.release.name

    return etch.update(this)
  }

  render(){
    return etch.dom.div(
      {className: 'releases'},
      etch.dom.h1({}, this.props.release.name),
      etch.dom.div({innerHTML: this.markdown.makeHtml(this.props.release.body)})
    )
  }
}

module.exports = Releases
