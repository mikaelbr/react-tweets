/** @jsx React.DOM */

var React = require('react');
var Tweets = require('./Tweets.react.js');
var Loader = require('./Loader.react.js');
var NotificationBar = require('./NotificationBar.react.js');
var component = require('omniscient');
var EventEmitter = require('events').EventEmitter;

var Immutable = require('immutable');
var events = new EventEmitter();


var swapCursorValueMixin = {
  swapProps: function (value) {
    return this.props.cursor.update(function (previous) {
      return previous.merge(value);
    });
  }
};

// Export the TweetsApp component
var mixins = {
  // Method to get JSON from server by page
  getPage: function (page){
    // Setup our ajax request
    var request = new XMLHttpRequest(), self = this, cursor = this.props.cursor;
    request.open('GET', 'page/' + cursor.get('page') + '/' + cursor.get('skip'), true);
    request.onload = function() {
      // If everything is cool...
      if (request.status >= 200 && request.status < 400){
        // Load our next page
        self.loadPagedTweets(JSON.parse(request.responseText));
      } else {
        self.swapProps({ paging: false, done: true });
      }
    };

    // Fire!
    request.send();
  },

  // Method to load tweets fetched from the server
  loadPagedTweets: function  (tweets) {
    if(!tweets.length) {
      this.swapProps({ paging: false, done: true });
    }

    var previous = this.props.cursor.deref();
    this.swapProps({
      tweets: previous.get('tweets').concat(Immutable.fromJS(tweets)).toVector(),
      paging: false
    });
  },

  scroller: function () {
    var cursor = this.props.cursor;

    // Get scroll pos & window data
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var s = (document.body.scrollTop || document.documentElement.scrollTop || 0);
    var scrolled = (h + s) > document.body.offsetHeight;

    // If scrolled enough, not currently paging and not complete...
    if(scrolled && !cursor.get('paging') && !cursor.get('done')) {

      cursor = this.swapProps({
        paging: true,
        page: cursor.get('page') + 1
      });

      // Get the next page of tweets from the server
      this.getPage(cursor.get('page'));
    }
  },

  // Called directly after component rendering, only on client
  componentDidMount: function() {
    // Initialize socket.io
    var socket = io.connect();

    // When showNewTweets event is emitted.
    events.on('showNewTweets', this.showNewTweets);

    // On tweet event emission...
    socket.on('tweet', this.addTweet);

    // Attach scroll event to the window for infinity paging
    window.addEventListener('scroll', this.scroller);
  },

  showNewTweets: function () {
    this.props.cursor
      .update('count', function () {
        return 0;
      })
      .update('tweets', function (previous) {
        return previous.map(function (tweet) {
          return tweet.set('active', true);
        }).toVector();
      });
  },

  addTweet: function (tweet) {
    var previous = this.props.cursor.deref();
    this.swapProps({
      tweets: previous.get('tweets').unshift(Immutable.Map(tweet)).toVector(),
      count: previous.get('count') + 1,
      skip: previous.get('skip') + 1
    });
  }
};

module.exports = component('TweetsApp', [swapCursorValueMixin, mixins], function (cursor) {
  return (
    <div className="tweets-app">
      {Tweets(cursor.cursor('tweets'))}
      {Loader(cursor.cursor('paging'))}
      {NotificationBar(cursor.cursor('count'), {
        events: events
      })}
    </div>
  )
});
