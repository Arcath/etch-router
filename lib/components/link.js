const etch = require('etch')

class Link{
  constructor(props, children){
    this.children = children
    this.props = props
    this.tag = 'Link'

    etch.initialize(this)
  }

  update(props, children){
    this.props = props
    this.children = children
    return etch.update(this)
  }

  render(){
    var className

    if(this.props.className){
      className = this.props.className
    }else{
      className = ''
    }

    if(this.isActive() && this.props.activeClassName){
      className += ' ' + this.props.activeClassName
    }

    return etch.dom.a({
      href: this.props.to,
      onClick: this.didClick,
      className: className
    }, this.children)
  }

  didClick(event){
    event.preventDefault()

    this.props.router.update({
      currentPath: this.props.to
    })
  }

  isActive(){
    return this.props.router.isActive(this.props.to)
  }
}

module.exports = Link
