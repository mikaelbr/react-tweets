/** @jsx React.DOM */

var React = require('react');
var Tweet = require('./Tweet.react.js');
var component = require('omniscient');

module.exports = component('Tweets', function(cursor){
  // Build list items of single tweet components using map
  var content = cursor.map(function(tweet, key){
    return Tweet(tweet.get('twid'), tweet);
  }).toArray();

  // Return ul filled with our mapped tweets
  return (
    <ul className="tweets">{content}</ul>
  )
});
