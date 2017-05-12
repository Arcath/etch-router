const etch = require('etch')
const pathToRegexp = require('path-to-regexp')
const SODB = require('sodb')
const Output = require('./output')

class Router{
  constructor(props, ...children){
    this.props = props
    this.entries = children

    this.routes = new SODB()

    if(this.entries.length == 0){
      throw('Router requires routes')
    }else{
      for(var child of this.entries) {
        if(child.tag != 'Route' && child.tag != 'MissingRoute'){
          throw(child.tag + ' is not a valid child of Router')
        }else if(child.tag == 'Route'){
          this.routes.add({path: child.props.path, route: child, level: 0})
          child.addSubRoutesToRouter(this, 1)
        }else if(child.tag == 'MissingRoute'){
          this.missingRoute = child
        }
      }
    }

    if(this.props.currentPath){
      this.currentPath = this.props.currentPath
    }else{
      this.currentPath = '/'
    }

    this.getCurrent()

    etch.initialize(this)
  }

  update(newProps){
    var changePath = false

    if(newProps.currentPath){
      this.runHook('beforeChangePath', [this.currentPath, newProps.currentPath])
      this.currentPath = newProps.currentPath
      this.getCurrent()
      changePath = true
    }

    this.runHook('beforeDOMUpdate', [this.currentPath])

    var promise = etch.update(this, true)

    var _ = this
    promise.then(function(){
      _.runHook('afterDOMUpdate', [])
      if(changePath){
        _.runHook('afterChangePath', [_.currentPath])
      }
    })

    return promise
  }

  render(){
    return etch.dom(Output, {route: this.currentRoute, router: this})
  }

  getCurrent(){
    var _ = this
    var route = this.routes.order({path: {func: function(field, objects){
      return objects.filter(function(entry){
        var re = pathToRegexp(entry.path)
        return (re.exec(_.currentPath) != null)
      })
    }}}, 'level').reverse()[0]

    if(!route){
      this.currentRoute = this.missingRoute
    }else{
      this.currentRoute = route.route
    }
  }

  destroy(){
    return etch.destroy(this)
  }

  runHook(name, args){
    if(this.props.hasOwnProperty(name)){
      this.props[name](...args)
    }
  }
}

module.exports = Router
