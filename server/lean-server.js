/**
 * simple leancloud server for upload 
 *
 * @param
 */
var fs = require('fs')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var AV = require('leanengine')
var app = express()
var busboy = require('connect-busboy')

var APP_ID = process.env.LC_APP_ID
var APP_KEY = process.env.LC_APP_KEY
var MASTER_KEY = process.env.LC_APP_MASTER_KEY
var PORT = parseInt(process.env.LC_APP_PORT || 3002)

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

// 使用这个中间件
app.use(busboy())
app.use(express.static(path.join(__dirname, '../public/')))

app.post('/upload', function(req, res) {
  if (req.busboy) {
    var base64data = [];
    var pubFileName = '';
    var pubMimeType = '';
    req.busboy.on('file', (fieldname, file, fileName, encoding, mimeType) => {
      var buffer = '';
      pubFileName = fileName;
      pubMimeType = mimeType;
      file.setEncoding('base64');
      file.on('data', function(data) {
        buffer += data;
      }).on('end', function() {
        base64data.push(buffer);
      });
    }).on('finish', function() {
      var f = new AV.File(pubFileName, {
        // 仅上传第一个文件（多个文件循环创建）
        base64: base64data[0]
      });
      try {
        f.save().then(function(fileObj) {
          // 向客户端返回数据
          res.send({
            fileId: fileObj.id,
            mimeType: fileObj.metaData().mime_type,
            name: fileObj.name(),
            url: fileObj.url()
          });
        });
      } catch (err) {
        console.log('uploadFile - ' + err);
        res.status(502);
      }
    })
    req.pipe(req.busboy);
  } else {
    console.log('uploadFile - busboy undefined.');
    res.status(502);
  }
})

app.listen(PORT, function() {
  console.log('Node app is running, port:', PORT);
});
