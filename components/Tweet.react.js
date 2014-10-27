/** @jsx React.DOM */

var React = require('react');
var component = require('omniscient');

module.exports = component('Tweet', function(cursor){
  return (
    <li className={"tweet" + (cursor.get('active') ? ' active' : '')}>
      <img src={cursor.get('avatar')} className="avatar"/>
      <blockquote>
        <cite>
          <a href={"http://www.twitter.com/" + cursor.get('screenname') }>{cursor.get('author')}</a>
          <span className="screen-name">@{cursor.get('screenname')}</span>
        </cite>
        <span className="content">{cursor.get('body')}</span>
      </blockquote>
    </li>
  )
});
