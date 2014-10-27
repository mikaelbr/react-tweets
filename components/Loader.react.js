/** @jsx React.DOM */

var React = require('react');
var component = require('omniscient');

module.exports = component(function(cursor){
  return (
    <div className={"loader " + (cursor.deref() ? "active" : "")}>
      <img src="svg/loader.svg" />
    </div>
  )
});
