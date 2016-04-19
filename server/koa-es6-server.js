import _ from 'lodash'
import fs from 'fs'
import path from 'path'
// koa
import koa from 'koa'
import serve from 'koa-static'
import route from 'koa-route'
import koaJson from 'koa-json'
// other
import coParse from 'co-busboy'

var app = koa()
const PORT = process.env.PORT || 3002

var upload = function * (next) {
  var parts = coParse(this)
  var part
  
  while (part = yield parts) {
    var url = '/upload/' + part.filename
    var stream = fs.createWriteStream(path.join(__dirname, '../public', url))
    part.pipe(stream)
    console.log('uploading %s -> %s', part.filename, stream.path)
  }

  this.body = {
    status: 'success',
    url: url
  }
}

// or use absolute paths
app.use(koaJson())
app.use(serve(path.join(__dirname, '../public/')))
app.use(route.post('/upload', upload))


app.listen(PORT)
console.log('listening on port ', PORT)
