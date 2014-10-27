/** @jsx React.DOM */

var React = require('react');
var component = require('omniscient');

var clickMixins = {
  handleClick: function () {
    this.props.statics.events.emit('showNewTweets');
  }
};

module.exports = NotificationBar = component('NotificationBar', clickMixins, function(cursor, statics){
  var count = cursor.deref();
  return (
    <div className={"notification-bar" + (count > 0 ? ' active' : '')}>
      <p>There are {count} new tweets! <a href="#top" onClick={this.handleClick}>Click here to see them.</a></p>
    </div>
  )
});
