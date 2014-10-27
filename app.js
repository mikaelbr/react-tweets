/** @jsx React.DOM */

var React = require('react');
var TweetsApp = require('./components/TweetsApp.react');

var immstruct = require('immstruct');

// Snag the initial state that was passed from the server side
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

var structure = immstruct(initialState);

// Render the components, picking up where react left off on the server
var app = document.getElementById('react-app');
function render() {
  React.renderComponent(TweetsApp(structure.cursor()), app);
}

render();
structure.on('swap', render);
