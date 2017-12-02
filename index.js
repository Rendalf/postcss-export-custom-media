var postcss = require('postcss')

var EXPORT_FUNC_IDENTIFIER = 'export-custom-media'
var EXPORT_DECL_START = EXPORT_FUNC_IDENTIFIER + '('

function exportCustomMedia (options) {
  return function (styles, result) {
    var customMediasMap = {}

    styles.walkAtRules(function (rule) {
      if (rule.name !== "custom-media") {
        return
      }

      // TODO deal with circular and other stuff (see postcss-custom-media)
      var params = rule.params.split(' ')
      // @custom-media <extension-name> <media-query-list>;
      // customMediasMap[<extension-name>] = <media-query-list>
      customMediasMap[params.shift()] = params.join(' ')
    })

    styles.walkDecls(function (decl) {
      var value = decl.value
      if (value.indexOf(EXPORT_DECL_START) !== 0) {
        return
      }

      // ignore last ')' and remove white spaces
      var mediaQueryName = value.slice(EXPORT_DECL_START.length, -1).trim()
      if (mediaQueryName === '') {
        result.warn(
          EXPORT_FUNC_IDENTIFIER + '() should contain non-whitespace custom media query',
          { node: decl }
        )
        decl.remove()
        return
      }

      if (!customMediasMap.hasOwnProperty(mediaQueryName)) {
        result.warn(
          'Cannot resolve custom media ' + mediaQueryName,
          { node: decl }
        )
        decl.remove()
        return
      }

      var clone = decl.cloneBefore()
      clone.value = customMediasMap[mediaQueryName]
      decl.remove()
    })
  }
}

module.exports = postcss.plugin('postcss-export-custom-media', exportCustomMedia)
