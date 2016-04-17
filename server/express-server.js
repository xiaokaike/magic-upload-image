/**
 * simple server upload
 *
 * @param
 */
var fs = require('fs')
var express = require('express')
var path = require('path')
var multer = require('multer')
var app = express()

var APP_ID = process.env.LC_APP_ID
var APP_KEY = process.env.LC_APP_KEY
var MASTER_KEY = process.env.LC_APP_MASTER_KEY
var PORT = parseInt(process.env.LC_APP_PORT || 3002)

var upload = multer({ dest: 'uploads/' })
app.use(express.static(path.join(__dirname, '../public/')))

app.post('/upload', upload.array(), function (req, res) {
  var imageFile = req.file
  var bodyFile = req.body.file

  for(var o in bodyFile){
    console.log(o, bodyFile[o])
  }

  console.log(imageFile, bodyFile)
  if (imageFile) {

    res.send({
        data: 'url'
      })

  } else{
      res.send({
        error: '请选择一个文件。'
      })
  }
})

app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
});