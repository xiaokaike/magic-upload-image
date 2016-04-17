
export default {
  methods: {
    handleDrag (e) {
      // 获取文件列表
      var fileList = e.dataTransfer.files
      var hasImg = false

      for (let key in fileList) {
        var file = fileList[key]
        if (/^image/.test(file.type)) {
          // 创建图片的base64
          this.fileUpload(file, (err, data) => {
            this.uploadComplete(err, data)
          })

          hasImg = true
        }
      }
      if (hasImg) {
        this.isDrogover = false
        e.preventDefault()
      }
    },
    handleDragover (e) {
      this.isDrogover = true
      e.preventDefault()
    },
    handleDragleave (e) {
      this.isDrogover = false
      e.preventDefault()
    }
  }
}
