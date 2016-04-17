<template>
  <div id="app">
    <div class="write-content"
        @drop="handleDrag"  
        @dragover="handleDragover"
        @dragleave="handleDragleave"
        :class="{focused:isFocus, dragoverd: isDrogover}">
      <textarea 
        @paste="handleTPaste" 
        @focus="handleTFocus"
        @blur="handleTBlur"
        v-model="text"
        placeholder="Write a comment or drag your files here..."></textarea>  
        <p class="drag-and-drop">
          <span class="default">
            Attach files by dragging &amp; dropping,
            <input type="file" multiple="multiple" 
              class="manual-file-chooser js-manual-file-chooser"
              @click="fileInputClick"
              @change="fileInputChange">
            <button class="btn-link manual-file-chooser-text">selecting them</button>, or pasting
            from the clipboard.
          </span>
          <span class="loading">
            Uploading your files…
          </span>
        </p>
    </div>
    
    <ul>
      <li v-for="img in images">
        <img v-bind:src="img.url">    
      </li>
    </ul>
    
  </div>
</template>

<script>
import mixinDragDrop from './mixin/drag-drop'
import mixinUpload from './mixin/upload'
import mixinPatse from './mixin/patse'
import mixinForm from './mixin/form'

export default {
  mixins: [mixinDragDrop, mixinUpload, mixinPatse, mixinForm],
  data () {
    return {
      text: '',
      images: [],
      isFocus: false,
      isDrogover: false
    }
  },
  filters: {
  },
  ready: function () {
  },
  methods: {
    handleTFocus (e) {
      this.isFocus = true
    },
    handleTBlur (e) {
      this.isFocus = false
    },
    uploading () {

    },
    uploadComplete (err, data) {
      if (err) {
        return
      }
      this.images.push({
        url: data.url
      })
      this.text += '![image]($src)'.replace('$src', data.url)
    }
  }
}

</script>



<style>
*{
  box-sizing: border-box;
}
.write-content {
  position: relative;
  width: 600px;
  margin: 0 auto;
}
.write-content textarea {
  width: 100%;
  min-height: 200px;
  max-height: 500px;
  padding: 10px;
  resize: vertical;
  display: block;
  border: 1px solid #ddd;
  border-bottom: 1px dashed #ddd;
  font-size: 14px;
  line-height: 1.6;
  background-color: #fafafa;
  border-radius: 3px 3px 0 0;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);
}
.write-content textarea:focus{
  background-color: #fff;
  border-color: #51a7e8;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.075),0 0 5px rgba(81,167,232,0.5);
}
.write-content.focused .drag-and-drop{
  border-color: #51a7e8;
  box-shadow: rgba(81,167,232,0.5) 0 0 3px;
}
.dragoverd textarea, 
.dragoverd .drag-and-drop {
    box-shadow: #c9ff00 0 0 3px;
}
.drag-and-drop{
  padding: 7px 10px;
  margin: 0;
  font-size: 13px;
  line-height: 16px;
  color: #767676;
  background-color: #fafafa;
  border: 1px solid #ccc;
  border-top: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.drag-and-drop .default{
  display: inline-block;
}
.manual-file-chooser {
  position: absolute;
  width: 240px;
  padding: 5px;
  margin-left: -80px;
  cursor: pointer;
  opacity: 0.0001;
}
.manual-file-chooser-text{
  display: inline-block;
  padding: 0;
  font-size: inherit;
  color: #4078c0;
  white-space: nowrap;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 0;
  -webkit-appearance: none;
  text-transform: none;
}
.manual-file-chooser-text:hover, 
.manual-file-chooser-text:focus {
  text-decoration: underline;
  outline: none;
}
.drag-and-drop .loading{
  display: none;
}
</style>
