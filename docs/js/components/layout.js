/** @jsx etch.dom */
const etch = require('etch')
const {Link} = require('etch-router')

const Sidebar = require('./sidebar')

class Layout{
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
    return <div className='layout'>
      <div className='header'>
        <div className='container'>
          <i className='fa fa-code-fork' />
          <h1>
            <Link to='/' router={this.props.router}>Etch Router</Link>
          </h1>
          <a href='https://github.com/Arcath/etch-router'>
            <i className='fa fa-github' />
          </a>
          <a href='https://npmjs.com/package/etch-router'>
            <i className='fa fa-download' />
          </a>
        </div>
      </div>
      <div className='container'>
        <Sidebar router={this.props.router} />
        <div className='content'>{this.children}</div>
      </div>
    </div>
  }
}

module.exports = Layout
