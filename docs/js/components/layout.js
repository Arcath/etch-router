const etch = require('etch')

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
    return etch.dom.div(
      {className: 'layout'},
      etch.dom.div(
        {className: 'header'},
        etch.dom.div(
          {className: 'container'},
          etch.dom.i({className: 'fa fa-code-fork'}),
          etch.dom.h1({}, 'Etch Router'),
          etch.dom.a(
            {href: 'https://github.com/Arcath/etch-router'},
            etch.dom.i({className: 'fa fa-github'})
          ),
          etch.dom.a(
            {href: 'https://npmjs.com/package/etch-router'},
            etch.dom.i({className: 'fa fa-download'})
          )
        )
      ),
      etch.dom.div(
        {className: 'container'},
        etch.dom.div({className: 'content'}, ...this.children)
      ),
      etch.dom.div({className: 'footer'})
    )
  }
}

module.exports = Layout
