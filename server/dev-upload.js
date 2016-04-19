'use strict'

var fs = require('fs')
var express = require('express')
var path = require('path')
var router = express.Router()
var config = require('../config')

var uploadPath = path.posix.join(
  config.build.assetsPublicPath, 
  config.build.assetsSubDirectory,
  config.build.uploadDirectory
)

/**
 * 简单的upload api, 上传上来的图片保存到 uploadPath
 *
 * @param
 */

router.post('/upload', function(req, res) {
  if (req.busboy) {
    var fName = ''
    req.busboy.on('file', (fieldname, file, fileName, encoding, mimeType) => {
      fName = fileName
      var stream = fs.createWriteStream(path.join(__dirname, '../', uploadPath, fileName))
      file.pipe(stream)
      console.log('uploading %s -> %s', fileName, stream.path)

    }).on('finish', function() {
      res.send({
        name: 'xxx',
        url: path.join(uploadPath, fName)
      })
    })

    req.pipe(req.busboy)
  } else {
    console.log('uploadFile - busboy undefined.')
    res.status(502)
  }
})


module.exports = router