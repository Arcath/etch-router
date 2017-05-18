/** @jsx etch.dom */
const etch = require('etch')
const {Link} = require('etch-router')

const Layout = require('./layout')

class Missing{
  constructor(props, children){
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
    var path = ''
    if(this.props.router){
      path = this.props.router.currentPath
    }

    return <Layout router={this.props.router}>
      <div className='missing'>
        <h2>Error 404</h2>
        <p>Coud not find the page <i>{path}</i>.</p>
        <p>Head back to the <Link to='/' router={this.props.router}>home page</Link>.</p>
      </div>
    </Layout>
  }
}

module.exports = Missing
