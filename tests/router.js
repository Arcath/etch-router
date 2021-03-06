/** @jsx etch.dom */
const etch = require('etch')
const stateless = require('etch-stateless')

const EtchRouterError = require('../lib/classes/error')
const {Router, Route, Link, MissingRoute} = require('../index')

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
    return <div className='layout'>{this.children}</div>
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
    return <div className='home' ref='homePage'>Home</div>
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
    return <div className='about' ref='aboutPage'>About</div>
  }

  destroy(){
    return etch.destroy(this)
  }
}

describe('The Router', function(){
  it('should throw an error if it has no children', function(){
    expect(function(){
      var router = new Router()
    }).to.throw(EtchRouterError, /Router requires routes/)
  })

  it('should only take routes as children', function(){
    expect(function(){
      var router = new Router(
        {},
        <div>Not supposed to be here</div>
      )
    }).to.throw(EtchRouterError, /div is not a valid child of Router/)
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

  it('should support infinate depth', function(){
    var router = new Router(
      {currentPath: '/about'},
      new Route(
        {path: '/', component: Layout, name: 'Index'},
        new Route(
          {path: '/', component: Layout, name: 'Home'},
          new Route({path: '/about', component: About, name: 'About'})
        )
      )
    )

    expect(router.element.outerHTML).to.equal('<div class="layout"><div class="layout"><div class="about">About</div></div></div>')
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
        return <div className='test'>
          <Link to='/about' ref='link' router={this.props.router}>Click Me</Link>
        </div>
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

  it('should use a 404 route if provided', function(){
    class Missing{
      constructor(props, children){
        this.props = props

        etch.initialize(this)
      }

      update(props, children){
        return etch.update(this)
      }

      render(){
        return <Layout>Missing</Layout>
      }
    }

    var router = new Router(
      {currentPath: '/missing'},
      new Route(
        {path: '/', component: Layout, name: 'Index'},
        new Route({path: '/', component: Home, name: 'Home'}),
        new Route({path: '/about', component: About, name: 'About'})
      ),
      new MissingRoute({component: Missing})
    )

    expect(router.element.outerHTML).to.equal('<div class="layout">Missing</div>')
  })

  it('should pass params to a route', function(){
    class Test{
      constructor(props, children){
        this.props = props

        etch.initialize(this)
      }

      update(props, children){
        return etch.update(this)
      }

      render(){
        return <p>{this.props.params.slug}</p>
      }
    }

    var router = new Router(
      {currentPath: '/posts/foo'},
      new Route({path: '/posts/:slug', component: Test})
    )

    expect(router.element.outerHTML).to.equal('<p>foo</p>')
  })

  it('should provide the isActive function', function(){
    var router = new Router(
      {currentPath: '/foo'},
      new Route({path: '/bar', component: TestableComponent}),
      new Route({path: '/foo', component: TestableComponent})
    )

    expect(router.isActive('/foo')).to.equal(true)
    expect(router.isActive('/bar')).to.equal(false)
  })

  it('should throw render errors', function(){
    expect(function(){
      var router = new Router(
        {currentPath: '/foo'},
        new Route({path: '/foo', component: stateless(etch, function(){
          return etch.dom.foo({}, 'bar')
        })})
      )
    }).to.throw(EtchRouterError, /Rendering Error/)
  })

  describe('Hooks', function(){
    it('should support the beforeChangePath hook', function(done){
      var passed = false

      var router = new Router(
        {
          currentPath: '/',
          beforeChangePath: function(oldPath, newPath){
            passed = (oldPath == '/' && newPath == '/about')
          }
        },
        new Route(
          {path: '/', component: Layout, name: 'Index'},
          new Route({path: '/', component: Home, name: 'Home'}),
          new Route({path: '/about', component: About, name: 'About'})
        )
      )

      router.update({currentPath: '/about'}).then(function(){
        expect(passed).to.equal(true)
        done()
      })
    })

    it('should support the beforeDOMUpdate hook', function(done){
      var passed = false

      var router = new Router(
        {
          currentPath: '/',
          beforeDOMUpdate: function(newPath){
            passed = (newPath == '/about')
          }
        },
        new Route(
          {path: '/', component: Layout, name: 'Index'},
          new Route({path: '/', component: Home, name: 'Home'}),
          new Route({path: '/about', component: About, name: 'About'})
        )
      )

      router.update({currentPath: '/about'}).then(function(){
        expect(passed).to.equal(true)
        done()
      })
    })

    it('should support the propsForComponent hook', function(done){
      var passed = false

      var router = new Router(
        {
          currentPath: '/',
          propsForComponent: function(component, newPath, newProps){
            passed = (newPath == '/about')

            return newProps
          }
        },
        new Route(
          {path: '/', component: Layout, name: 'Index'},
          new Route({path: '/', component: Home, name: 'Home'}),
          new Route({path: '/about', component: About, name: 'About'})
        )
      )

      router.update({currentPath: '/about'}).then(function(){
        expect(passed).to.equal(true)
        done()
      })
    })

    it('should support the afterDOMUpdate hook', function(done){
      var passed = false

      var router = new Router(
        {
          currentPath: '/',
          afterDOMUpdate: function(){
            passed = true
          }
        },
        new Route(
          {path: '/', component: Layout, name: 'Index'},
          new Route({path: '/', component: Home, name: 'Home'}),
          new Route({path: '/about', component: About, name: 'About'})
        )
      )

      router.update({currentPath: '/about'}).then(function(){
        expect(passed).to.equal(true)
        done()
      })
    })

    it('should allow propsForComponent to be defined on the component', function(done){
      var passed = false

      class Test{
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
          return etch.dom.div({className: 'about'}, 'foo')
        }

        static propsForComponent(newPath, newProps){
          passed = true

          return newProps
        }
      }

      var router = new Router(
        {
          currentPath: '/'
        },
        new Route(
          {path: '/', component: Layout, name: 'Index'},
          new Route({path: '/', component: Home, name: 'Home'}),
          new Route({path: '/about', component: Test, name: 'About'})
        )
      )

      router.update({currentPath: '/about'}).then(function(){
        expect(passed).to.equal(true)
        done()
      })
    })

    it('should support the afterChangePath hook', function(){
      var passed = false

      var router = new Router(
        {
          currentPath: '/',
          afterChangePath: function(newPath){
            passed = (newPath == '/about')
          }
        },
        new Route(
          {path: '/', component: Layout, name: 'Index'},
          new Route({path: '/', component: Home, name: 'Home'}),
          new Route({path: '/about', component: About, name: 'About'})
        )
      )

      router.update({currentPath: '/about'}).then(function(){
        expect(passed).to.equal(true)
        done()
      })
    })
  })

  describe('Browser Mode', function(){
    it('should support browser mode', function(done){
      var router = new Router(
        {
          currentPath: '/about',
          browser: true
        },
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

        history.back()
        setTimeout(function(){
          expect(router.element.outerHTML).to.equal('<div class="layout"><div class="about">About</div></div>')
          done()
        }, 50)
      })
    })
  })
})
