const etch = require('etch')
const {Wrapper} = require('../')

describe('Wrapper', function(){
  it('should use defaults', function(){
    var wrapper = new Wrapper({}, etch.dom.i({}, 'test'))

    expect(wrapper.element.outerHTML).to.equal('<div><i>test</i></div>')
  })

  it('should change the tag', function(){
    var wrapper = new Wrapper({tag: 'p'}, etch.dom.i({}, 'test'))

    expect(wrapper.element.outerHTML).to.equal('<p><i>test</i></p>')
  })
})
