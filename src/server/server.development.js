'use strict';

require('dotenv').config()

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require("babel-register")({
  // Setting this to false will disable the cache.
  cache: true,
  presets: ["zero"]
});

require("./app.js");