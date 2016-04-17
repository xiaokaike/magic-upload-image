
export default {
  methods: {
    handleDrag (e) {
      // 获取文件列表
      var fileList = e.dataTransfer.files
      var hasImg = this.fileUpload(fileList)
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
