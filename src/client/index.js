import React from 'react';
import ReactDOM from 'react-dom';
import ConfoundApp from './components/ConfoundApp.jsx';
global.jQuery = global.$ = require('jquery');

console.log("Confound entry point.")
require("./main.css")


ReactDOM.render(<ConfoundApp />, document.getElementById('root'));
require("./main.js")