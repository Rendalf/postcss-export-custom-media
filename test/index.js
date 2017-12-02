var fs = require('fs')
var path = require('path')
var postcss = require('postcss')
var plugin = require(path.resolve(__dirname, '..'))
var assert = require('assert')

function fixtureFilename (filename) {
  return path.resolve(__dirname, 'fixtures', filename)
}

postcssOpts = {}
postcssOpts.from = fixtureFilename('export.css')

var result = postcss()
  .use(plugin())
  .process(fs.readFileSync(postcssOpts.from, 'utf8'), postcssOpts)

var actual = result.css
var expectedPath = fixtureFilename('export.expected.css')
var expected = fs.readFileSync(expectedPath, 'utf8')

assert(actual, expected, 'Actual doesn\'t equals expected')
