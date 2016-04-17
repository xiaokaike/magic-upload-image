
export default {
  methods: {
    fileInputClick (e) {
      console.log('fileInputClick', e)
    },
    fileInputChange (e) {
      var myFiles = e.target.files
      // this.fileUpload(myFiles)
      console.log('fileInputChange', myFiles, e)
    }
  }
}
