/** @jsx etch.dom */
const etch = require('etch')
const {Link} = require('etch-router')

class Sidebar{
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
    return <div className='sidebar'>
      <h4>Etch Router</h4>
      <ul>
        <li><Link to='/' router={this.props.router}>Home</Link></li>
        <li><Link to='/releases' router={this.props.router}>Releases</Link></li>
        <li><Link to='/examples' router={this.props.router}>Examples</Link></li>
      </ul>
      <h4>Guides</h4>
      <ul>
        <li><Link to='/guides/quick-start' router={this.props.router}>Quick Start</Link></li>
        <li><Link to='/guides/navigating' router={this.props.router}>Navigating</Link></li>
        <li><Link to='/guides/refs' router={this.props.router}>Refs</Link></li>
      </ul>
      <h4>Components</h4>
      <ul>
        <li><Link to='/components/router' router={this.props.router}>Router</Link></li>
        <li><Link to='/components/route' router={this.props.router}>Route</Link></li>
        <li><Link to='/components/link' router={this.props.router}>Link</Link></li>
        <li><Link to='/components/missing-route' router={this.props.router}>MissingRoute</Link></li>
      </ul>
      <h4>Hooks</h4>
      <ul>
        <li><Link to='/hooks/before-change-path' router={this.props.router}>beforeChangePath</Link></li>
        <li><Link to='/hooks/before-dom-update' router={this.props.router}>beforeDOMUpdate</Link></li>
        <li><Link to='/hooks/after-dom-update' router={this.props.router}>afterDOMUpdate</Link></li>
        <li><Link to='/hooks/after-change-path' router={this.props.router}>afterChangePath</Link></li>
        <li><Link to='/hooks/props-for-component' router={this.props.router}>propsForComponent</Link></li>
      </ul>
    </div>
  }
}

module.exports = Sidebar
