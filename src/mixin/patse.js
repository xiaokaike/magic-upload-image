
export default {
  methods: {
    handleTPaste (event) {
      var image
      if (event.clipboardData && event.clipboardData.items) {
        image = isImage(event.clipboardData.items)
        if (image) {
          event.preventDefault()
          var file = image.getAsFile()
          file.name = getFilename(event) || 'image-' + Date.now() + '.png'
          return this.fileUpload(file, (err, data) => {
            this.uploadComplete(err, data)
          })
        }
      }
    }
  }
}

function isImage (items) {
  var i = 0
  var item
  while (i < items.length) {
    item = items[i]
    if (item.type.indexOf('image') !== -1) {
      return item
    }
    i++
  }
  return false
}

function getFilename (e) {
  var value
  if (window.clipboardData && window.clipboardData.getData) {
    value = window.clipboardData.getData('Text')
  } else if (e.clipboardData && e.clipboardData.getData) {
    value = e.clipboardData.getData('text/plain')
  }
  value = value.split('\r')
  return value.first()
}
