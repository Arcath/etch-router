const etch = require('etch')
const hljs = require('highlight.js')
const showdown = require('showdown')

showdown.extension('codehighlight', function() {
  function htmlunencode(text) {
    return (
      text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
      );
  }
  return [
    {
      type: 'output',
      filter: function (text, converter, options) {
        console.dir(text)
        // use new shodown's regexp engine to conditionally parse codeblocks
        var left  = '<pre><code\\b[^>]*>',
            right = '</code></pre>',
            flags = 'g',
            replacement = function (wholeMatch, match, left, right) {
              // unescape match to prevent double escaping
              match = htmlunencode(match);
              return left + hljs.highlightAuto(match).value + right;
            };
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      }
    }
  ];
})

class Static{
  static propsForComponent(newPath, newProps){
    if(document.getElementById('content').dataset.path == newPath){
      newProps.content = document.getElementById('content').innerHTML
      newProps.title = document.getElementById('title').innerHTML
    }else{
      newProps.content = window.pages[newPath].content
      newProps.title = window.pages[newPath].title
    }

    return newProps
  }

  constructor(props, children){
    this.props = props
    this.children = children

    this.markdown = new showdown.Converter({extensions: ['codehighlight'], tables: true})

    etch.initialize(this)
  }

  update(props, children){
    this.props = props
    this.children = children

    return etch.update(this)
  }

  render(){
    return etch.dom.div(
      {className: 'static', ref: 'content'},
      etch.dom.h1({}, this.props.title),
      etch.dom.div({innerHTML: this.markdown.makeHtml(this.props.content)})
    )
  }
}

module.exports = Static
