const etch = require('etch')
const {Router, Route, Link} = require('../index')

class Layout{
  constructor(props, children){
    this.children = children
    etch.initialize(this)
  }

  update(props, children){
    this.children = children
    return etch.update(this)
  }

  render(){
    return etch.dom.div({className: 'layout'}, (this.children || null))
  }

  destroy(){
    return etch.destroy(this)
  }
}

class Home{
  constructor(props, children){
    etch.initialize(this)
  }

  update(props, children){
    return etch.update(this)
  }

  render(){
    return etch.dom.div({className: 'home', ref: 'homePage'}, 'Home')
  }

  destroy(){
    return etch.destroy(this)
  }
}

class About{
  constructor(props, children){
    etch.initialize(this)
  }

  update(props, children){
    return etch.update(this)
  }

  render(){
    return etch.dom.div({className: 'about', ref: 'aboutPage'}, 'About')
  }

  destroy(){
    return etch.destroy(this)
  }
}

describe('The Router', function(){
  it('should throw an error if it has no children', function(){
    expect(function(){
      var router = new Router()
    }).to.throw(/Router requires routes/)
  })

  it('should only take routes as children', function(){
    expect(function(){
      var router = new Router(
        {},
        etch.dom.div({}, 'No supposed to be here'),
        etch.dom.div({}, 'Or here')
      )
    }).to.throw(/div is not a valid child of Router/)
  })

  it('should accept a route', function(){
    var router = new Router(
      {},
      new Route({path: '/', component: Layout})
    )
  })

  it('should select the / route when new', function(){
    var router = new Router(
      {},
      new Route(
        {path: '/', component: Layout, name: 'Index'},
        new Route({path: '/', component: Home, name: 'Home'}),
        new Route({path: '/about', component: About, name: 'About'})
      )
    )

    expect(router.currentPath).to.equal('/')
  })

  it('should allow access to the current page component', function(){
    var router = new Router(
      {},
      new Route(
        {path: '/', component: Layout, name: 'Index'},
        new Route({path: '/', component: Home, name: 'Home'}),
        new Route({path: '/about', component: About, name: 'About'})
      )
    )

    expect(router.currentRoute.props.path).to.equal('/')
  })

  it('should load the correct page', function(){
    var router = new Router(
      {currentPath: '/about'},
      new Route(
        {path: '/', component: Layout, name: 'Index'},
        new Route({path: '/', component: Home, name: 'Home'}),
        new Route({path: '/about', component: About, name: 'About'})
      )
    )

    expect(router.currentRoute.props.path).to.equal('/about')
  })

  it('should render the correct component', function(){
    var router = new Router(
      {currentPath: '/about'},
      new Route(
        {path: '/', component: Layout, name: 'Index'},
        new Route({path: '/', component: Home, name: 'Home'}),
        new Route({path: '/about', component: About, name: 'About'})
      )
    )

    expect(router.element.outerHTML).to.equal('<div class="layout"><div class="about">About</div></div>')
  })

  it('should change component', function(done){
    var router = new Router(
      {currentPath: '/about'},
      new Route(
        {path: '/', component: Layout, name: 'Index'},
        new Route({path: '/', component: Home, name: 'Home'}),
        new Route({path: '/about', component: About, name: 'About'})
      )
    )

    expect(router.element.outerHTML).to.equal('<div class="layout"><div class="about">About</div></div>')

    router.update({currentPath: '/'}).then(function(){
      expect(router.currentRoute.props.path).to.equal('/')
      expect(router.element.outerHTML).to.equal('<div class="layout"><div class="home">Home</div></div>')

      done()
    })
  })

  it('should link to components', function(done){
    var testComponent

    class Test{
      constructor(props, children){
        this.props = props

        etch.initialize(this)
        testComponent = this
      }

      update(props, children){
        return etch.update(this)
      }

      render(){
        return etch.dom.div({className: 'test'}, etch.dom(Link, {to: '/about', ref: 'link', router: this.props.router}, 'Click Me'))
      }
    }

    var router = new Router(
      {currentPath: '/test'},
      new Route(
        {path: '/', component: Layout, name: 'Index'},
        new Route({path: '/', component: Home, name: 'Home'}),
        new Route({path: '/about', component: About, name: 'About'}),
        new Route({path: '/test', component: Test, name: 'Test'})
      )
    )

    expect(testComponent.refs.link.element.textContent).to.equal('Click Me')

    document.body.appendChild(router.element)

    done()

    //testComponent.refs.link.element.dispatchEvent(new MouseEvent('click'))
  })
})
