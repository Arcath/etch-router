/** @jsx etch.dom */
const etch = require('etch')
const {Link} = require('etch-router')
const showdown = require('showdown')

const loadJSON = require('../functions/loadjson')

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
    loadJSON('https://api.github.com/repos/arcath/etch-router/releases/' + this.props.params.id, function(data){
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
    return <div className='releases'>
      <h1>{this.props.release.name}</h1>
      <div innerHTML={this.markdown.makeHtml(this.props.release.body)} />
    </div>
  }
}

module.exports = Releases
