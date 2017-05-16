const etch = require('etch')
const {Link} = require('etch-router')
const jQuery = require('jquery')

class Releases{
  constructor(props, children){
    this.props = props
    this.children = children

    if(!this.props.releases){
      this.props.releases = []
    }

    etch.initialize(this)

    var _ = this
    jQuery.getJSON('https://api.github.com/repos/arcath/etch-router/releases', function(data){
      _.update({
        releases: data
      })
    })
  }

  update(props, children){
    this.props.releases = props.releases
    if(children){
      this.children = children
    }

    return etch.update(this)
  }

  render(){
    if(this.children.length){
      return etch.dom.div({className: 'releases'}, ...this.children)
    }else{
      return etch.dom.div(
        {className: 'releases'},
        etch.dom.h1({}, this.props.releases.length + ' Releases'),
        etch.dom.ul(
          {},
          ...this.entries()
        )
      )
    }
  }

  entries(){
    var entries = []

    for(var release of this.props.releases){
      entries.push(
        etch.dom.li(
          {},
          etch.dom(Link, {to: '/releases/' + release.id, router: this.props.router}, release.name)
        )
      )
    }

    return entries
  }
}

module.exports = Releases
