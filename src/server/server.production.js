'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require("babel-register")({
  // Setting this to false will disable the cache.
  cache: true,
  presets: ["zero"]
});

require("./app.js");