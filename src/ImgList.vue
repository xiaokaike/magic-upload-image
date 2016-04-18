<template>
  <ul class="img-list">
    <li class="img-item" v-for="img in lists">
      <img v-bind:src="img.url">    
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array
    }
  }
}
</script>

<style>
  .img-list {
    margin: 10px auto;
    padding: 0;
    width: 600px;
    overflow: hidden;
  }
  .img-item {
    float: left;
    margin: 0 10px 10px 0;
    width: 112px;
    height: 112px;
    border: 1px solid #ccc;
    padding: 3px;
    border-radius: 3px;
    overflow: hidden;
  }
  .img-item:nth-child(5n){
    margin-right: 0px;
  }
  .img-item img{
    width: 100%;
  }
</style>