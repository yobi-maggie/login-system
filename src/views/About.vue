<template>
  <div class="about">
    <div v-html="dom"></div>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'About',
  data() {
    return {
      dom: null,
    };
  },
  created() {
    axios.get('http://localhost:3333/vue-mall-readme').then((res) => {
      console.log(res.data);
      this.dom = res.data;
    });
  },
};
</script>
