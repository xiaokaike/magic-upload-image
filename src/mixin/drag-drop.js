import _ from '../util'

var project_uploads_path = '/upload'
var imageFieldName = 'upfile'

export default {
  methods: {
    handleDrag (e) {
      var that = this

      // 获取文件列表
      var fileList = e.dataTransfer.files
      var img = document.createElement('img')
      var hasImg = false

      _.each(fileList, function (f, i) {
        if (/^image/.test(f.type)) {
          // 创建图片的base64

          var xhr = new window.XMLHttpRequest()
          xhr.open('post', project_uploads_path + '?type=ajax', true)
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

          // 模拟数据
          var fd = new window.FormData()
          fd.append(imageFieldName, f)

          xhr.send(fd)
          xhr.addEventListener('load', function (e) {
            var r = e.target.response
            that.uploadComplete(JSON.parse(r))
            if (i === fileList.length - 1) {
              img.remove()
            }
          })
          hasImg = true
        }
      })

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
