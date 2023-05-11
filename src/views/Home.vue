<template>
  <div class="container">
    <electricity />
  </div>
</template>

<script>
import electricity from "../views/electricity/index.vue"
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
    electricity
  }
}
</script>
<style>
  .container{
    background-color: #E1E5EC;
    height: 100%;
  }
</style>
