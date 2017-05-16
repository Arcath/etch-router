require('typeface-raleway')
require('typeface-lato')
require('../node_modules/font-awesome/css/font-awesome.min.css')
require('../node_modules/nprogress/nprogress.css')
require('../less/style.less')

const etch = require('etch')
const {Router, Route, Link, MissingRoute} = require('etch-router')
const jQuery = require('jquery')
const NProgress = require('nprogress')

const Components = require('./components/components')
const Hooks = require('./components/hooks')
const Layout = require('./components/layout')
const Missing = require('./components/missing')
const Release = require('./components/release')
const Releases = require('./components/releases')
const Static = require('./components/static')

var bindLinksToRouter = function(){
  var links = document.querySelectorAll('.static a')

  for(var link of links){
    if(!link.href.indexOf(window.location.origin)){
      link.addEventListener('click', function(event){
        event.preventDefault()
        var target = event.target.href.replace(window.location.origin, '')
        window.app.update({currentPath: target})
      })
    }
  }
}


document.addEventListener('DOMContentLoaded', function(){
  jQuery.getJSON('/content.json', function(data){
    window.pages = data.pages
  })

  window.app = new Router(
    {
      browser: true,
      currentPath: window.location.pathname,
      beforeChangePath: function(){
        NProgress.start()
      },
      afterChangePath: function(newPath){
        if(window.pages[newPath] && document.title != window.pages[newPath].title){
          document.title = window.pages[newPath].title
        }
        NProgress.done()
      },
      propsForComponent: function(component, newPath, newProps){
        if(component.name === Static.name){
          if(document.getElementById('content').dataset.path == newPath){
            newProps.content = document.getElementById('content').innerHTML
            newProps.title = document.getElementById('title').innerHTML
          }else{
            newProps.content = window.pages[newPath].content
            newProps.title = window.pages[newPath].title
          }
        }

        return newProps
      },
      afterDOMUpdate: bindLinksToRouter
    },
    new Route(
      {path: '/', component: Layout, name: 'Layout'},
      new Route({path: '/', component: Static, name: 'Home'}),
      new Route(
        {path: '/components', component: Components, name: 'Components'},
        new Route({path: '/router', component: Static, name: 'Router'}),
        new Route({path: '/route', component: Static, name: 'Route'}),
        new Route({path: '/link', component: Static, name: 'Link'}),
        new Route({path: '/missing-route', component: Static, name: 'MissingRoute'})
      ),
      new Route(
        {path: '/hooks', component: Hooks, name: 'Hooks'},
        new Route({path: '/before-change-path', component: Static, name: 'beforeChangePath'}),
        new Route({path: '/before-dom-update', component: Static, name: 'beforeDOMUpdate'}),
        new Route({path: '/after-change-path', component: Static, name: 'afterChangePath'}),
        new Route({path: '/after-dom-update', component: Static, name: 'afterDOMUpdate'}),
        new Route({path: '/props-for-component', component: Static, name: 'propsForComponent'})
      ),
      new Route(
        {path: '/releases', component: Releases, name: 'Releases'},
        new Route({path: '/:id', component: Release, name: 'Release'})
      )
    ),
    new MissingRoute({component: Missing})
  )

  document.body.appendChild(window.app.element)
  bindLinksToRouter()
})
