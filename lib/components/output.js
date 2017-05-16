const etch = require('etch')
const lodash = require('lodash')
const pathToRegexp = require('path-to-regexp')

class Output{
  constructor(props, children){
    this.children = children
    this.props = {
      route: lodash.cloneDeep(props.route),
      router: props.router
    }
    this.tag = 'Output'

    etch.initialize(this)
  }

  update(props, children){
    this.props.route = lodash.cloneDeep(props.route)
    this.children = children
    return etch.update(this, true)
  }

  render(){
    var props = {
      router: this.props.router,
      params: {},
      ref: 'component'
    }

    if(this.props.route.props.path){
      var keys = []
      var re = pathToRegexp((this.props.route.completePath || this.props.route.props.path), keys)
      var result = re.exec(this.props.router.currentPath)

      var count = 1
      for(var key of keys){
        props.params[key.name] = result[count]
        count++
      }
    }

    var componentProps = this.props.router.runHook(
      'propsForComponent',
      [
        this.props.route.props.component,
        this.props.router.currentPath,
        props
      ]
    )

    var component = etch.dom(this.props.route.props.component, componentProps, ...this.children)

    if(this.props.route.parentRoute){
      return etch.dom(Output, {route: this.props.route.parentRoute, router: this.props.router, ref: 'output-' + this.props.route.props.component.name}, component)
    }else{
      return component
    }
  }

  destroy(){
    return etch.destroy(this)
  }
}

module.exports = Output
