const ReactDOMServer = require('react-dom/server')
const React = require("react");
const render = require('./ssr/js/app')
const context = {}
console.log(render.default('/', context))