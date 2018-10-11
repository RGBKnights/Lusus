const path = require('path');
const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

const buildPath = path.join(__dirname, '../../build');
app.use(serve(buildPath));

const port = process.env.PORT || 3001;
console.log(`App running on http://localhost:${port}/`)
app.listen(port);