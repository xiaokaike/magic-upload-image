
var win = window

export default {
  data () {
    return {
      headers: {},
      action: '/upload'
    }
  },
  methods: {
    fileUpload (myFiles, callback) {
      return this._handleUpload(myFiles, function (err, data) {
        callback(err, data)
      })
    },
    _handleUpload (file, callback) {
      var form = new win.FormData()
      var xhr = new win.XMLHttpRequest()
      this.$dispatch('beforeFileUpload', file)
      try {
        // form.append('Content-Type', file.type || 'application/octet-stream')
        // our request will have the file in the ['file'] key
        form.append('file', file, file.name)
      } catch (err) {
        this.$dispatch('onFileError', file, err)
        return
      }

      // xhr.upload.addEventListener('progress', this._onProgress, false)

      xhr.onreadystatechange = function () {
        if (xhr.readyState < 4) {
          return
        }
        if (xhr.status < 400) {
          var res = JSON.parse(xhr.responseText)
          this.$dispatch('onFileUpload', file, res)
          callback(null, res)
        } else {
          var err = JSON.parse(xhr.responseText)
          err.status = xhr.status
          err.statusText = xhr.statusText
          this.$dispatch('onFileError', file, err)
          callback(err)
        }
      }.bind(this)

      xhr.onerror = function () {
        var err = JSON.parse(xhr.responseText)
        err.status = xhr.status
        err.statusText = xhr.statusText
        this.$dispatch('onFileError', file, err)
        callback(err)
      }.bind(this)

      xhr.open('POST', this.action, true)
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      if (this.headers) {
        for (var header in this.headers) {
          xhr.setRequestHeader(header, this.headers[header])
        }
      }
      xhr.send(form)
      this.$dispatch('afterFileUpload', file)
    }
  }
}
