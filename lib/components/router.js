const etch = require('etch')
const lodash = require('lodash')
const pathToRegexp = require('path-to-regexp')
const SODB = require('sodb')

const EtchRouterError = require('../classes/error')
const Output = require('./output')

class Router{
  constructor(props, ...children){
    this.props = props || {}
    this.refTree = {}
    this.entries = children

    if(!this.props.hasOwnProperty('propsForComponent')){
      this.props.propsForComponent = function(component, newPath, newProps){
        return newProps
      }
    }

    this.routes = new SODB()

    if(this.entries.length == 0){
      throw new EtchRouterError('Router requires routes')
    }else{
      for(var child of this.entries) {
        if(child.tag != 'Route' && child.tag != 'MissingRoute'){
          throw new EtchRouterError(child.tag + ' is not a valid child of Router')
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

    if(this.props.browser){
      history.replaceState({
        path: this.currentPath
      }, '', this.currentPath)

      var _ = this
      window.onpopstate = function(event){
        _.update({
          currentPath: event.state.path
        })
      }
    }

    this.getCurrent()

    try{
      etch.initialize(this)
    }catch(e){
      throw new EtchRouterError('Rendering Error: ' + e.message)
    }

    this.refTree = this.buildRefs(this.refs)
  }

  update(newProps){
    var changePath = false
    this.refTree = {}

    if(newProps.currentPath){
      this.runHook('beforeChangePath', [this.currentPath, newProps.currentPath])
      this.currentPath = newProps.currentPath
      this.getCurrent()

      if(this.props.browser){
        history.pushState({
          path: this.currentPath
        }, '', this.currentPath)
      }

      changePath = true
    }

    this.runHook('beforeDOMUpdate', [this.currentPath])

    var promise = etch.update(this, true)

    var _ = this
    promise.then(function(){
      _.refTree = _.buildRefs(_.refs)
      _.runHook('afterDOMUpdate', [])
      if(changePath){
        _.runHook('afterChangePath', [_.currentPath])
      }
    })

    promise.catch(function(e){
      throw new EtchRouterError('Rendering Error: ' + e.message)
    })

    return promise
  }

  render(){
    return etch.dom(Output, {route: this.currentRoute, router: this, ref: 'output'})
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
      return this.props[name](...args)
    }
  }

  isActive(path){
    return (this.currentPath == path)
  }

  buildRefs(refTree){
    var refs = {}

    for(var node in refTree){
      if(refTree.hasOwnProperty(node)){
        if(refTree[node].tag == 'Output' || node == 'component'){
          refs = lodash.extend(refs, this.buildRefs(refTree[node].refs))
        }else{
          refs[node] = refTree[node]
        }
      }
    }

    return refs
  }
}

module.exports = Router
