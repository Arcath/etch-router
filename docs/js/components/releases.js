/** @jsx etch.dom */
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
      return <div className='releases'>{this.children}</div>
    }else{
      return <div className='releases'>
        <h1>{this.props.releases.length} Releases</h1>
        <ul>
          {this.entries()}
        </ul>
      </div>
    }
  }

  entries(){
    var entries = []

    for(var release of this.props.releases){
      entries.push(
        <li>
          <Link to={'/releases/' + release.id} router={this.props.router}>{release.name}</Link>
        </li>
      )
    }

    return entries
  }
}

module.exports = Releases
