
var _ = require('lodash')
var fs = require('fs')
var path = require('path')

// koa
var koa = require('koa')
var serve = require('koa-static')
var route = require('koa-route')
var koaJson = require('koa-json')

// other
var coParse = require('co-busboy')

/**
 * start
 */

var app = koa()

var port = process.env.PORT || 3002

var upload = function *(next){
  // ignore non-POSTs
  if ('POST' != this.method) return yield next;
  console.log('xxx')
  // multipart upload
  var parts = coParse(this);
  var part;
  
  while (part = yield parts) {
    var url = '/upload/' + part.filename
    var stream = fs.createWriteStream(path.join(__dirname, '/public', url));
    part.pipe(stream);
    console.log('uploading %s -> %s', part.filename, stream.path);
  }

  this.body = {
    status: 'success',
    url: url
  };
}


// or use absolute paths
app.use(koaJson())
app.use(serve(__dirname + '/public/'))
app.use(route.post('/upload', upload))


app.listen(port)
console.log('listening on port ', port)
