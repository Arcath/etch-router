const etch = require('etch')

class Route{
  constructor(props, ...children){
    this.children = children
    this.props = props
    this.tag = 'Route'

    for(var child of this.children) {
      if(child.tag != 'Route'){
        throw(child.tag + ' is not a valid child of Route')
      }else{
        child.parentRoute = this
        child.completePath = this.props.path.replace(/\/$/, "") + child.props.path
      }
    }

    etch.initialize(this)
  }

  update(props, children){
    this.props = props
    return etch.update(this)
  }

  addSubRoutesToRouter(router, level){
    for(var child of this.children) {
      router.routes.add({path: child.completePath, route: child, level: level})
      child.addSubRoutesToRouter(router, level + 1)
    }
  }

  render(){
    return ''
  }

  destroy(){
    return etch.destroy(this)
  }
}

module.exports = Route
