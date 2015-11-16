# Real Time Twitter Stream with Node and React

Code repository for the tutorial by @kenwheeler: [Build A Real-Time Twitter Stream with Node and React.js](http://scotch.io/tutorials/javascript/build-a-real-time-twitter-stream-with-node-and-react-js)

This is a fork changed to use [Omniscient.js](https://github.com/omniscientjs/omniscient):
> A library providing an abstraction for React components that allows for fast top-down rendering embracing immutable data. Using cursors into immutable data structures, components can easily swap their own piece of data inside the larger immutable data structure. As data is immutable, re-rendering can be fast.

## Requirements

- node and npm
- MongoDB

## How to Use

1. Clone the repo: `git clone git@github.com:mikaelbr/react-tweets`
2. Go into folder: `cd react-tweets`
3. Install dependencies: `npm install`
4. Create a local MongoDB database called **react-tweets** (configured in `server.js`)
5. Replace credentials for Twitter API (configured in `config.js`)
6. Start the app: `node server.js`
7. View in browser at: `http://localhost:8080`
8. Tweet away!
