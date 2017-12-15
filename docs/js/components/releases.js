/** @jsx etch.dom */
const etch = require('etch')
const {Link} = require('etch-router')

const loadJSON = require('../functions/loadjson')

class Releases{
  constructor(props, children){
    this.props = props
    this.children = children

    if(!this.props.releases){
      this.props.releases = []
    }

    etch.initialize(this)

    var _ = this
    loadJSON('https://api.github.com/repos/arcath/etch-router/releases', function(data){
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
        <ul className='list'>
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
          <h3><Link to={'/releases/' + release.id} router={this.props.router}>{release.name}</Link></h3>
          <img src={release.author.avatar_url} /><a href={release.author.html_url}>{release.author.login}</a>
        </li>
      )
    }

    return entries
  }
}

module.exports = Releases
