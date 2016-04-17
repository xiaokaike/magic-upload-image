
export default {
  methods: {
    fileInputClick (e) {
      console.log('fileInputClick', e)
    },
    fileInputChange (e) {
      var myFiles = e.target.files
      this.fileUpload(myFiles)
    }
  }
}
