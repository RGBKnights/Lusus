'use strict';

require('dotenv').config()

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.env.MONGO_URI='mongodb://1c3a33114440da65f3a85085af50dd68:Lusus04!@10a.mongo.evennode.com:27017/1c3a33114440da65f3a85085af50dd68';
process.env.MONGO_DATABASE='1c3a33114440da65f3a85085af50dd68';

require("babel-register")({
  // Setting this to false will disable the cache.
  cache: true,
  presets: ["zero"]
});

require("./app.js");