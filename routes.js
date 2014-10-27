var JSX = require('node-jsx').install(),
  React = require('react'),
  TweetsApp = require('./components/TweetsApp.react'),
  Tweet = require('./models/Tweet'),
  immstruct = require('immstruct');

module.exports = {

  index: function(req, res) {
    // Call static model method to get tweets in the db
    Tweet.getTweets(0,0, function(tweets, pages) {

      var structure = immstruct({
        tweets: tweets,
        count: 0,
        page: 0,
        paging: false,
        skip: 0,
        done: false
      });

      // Render React to a string, passing in our fetched tweets
      var markup = React.renderComponentToString(
        TweetsApp(structure.cursor())
      );

      // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
        state: JSON.stringify(structure.current.toJSON()) // Pass current state to client side
      });
    });
  },

  page: function(req, res) {
    // Fetch tweets by page via param
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {

      // Render as JSON
      res.send(tweets);

    });
  }
}
