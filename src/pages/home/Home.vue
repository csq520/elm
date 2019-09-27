<template>
<div class="Home">
  <Header :seller="seller"></Header>
</div>
</template>

<script>
import axios from 'axios';
import Header from '../header/Header';

export default {
  name: 'Home',
  components: {
    Header,
  },
  data() {
    return {
      seller: {},
    };
  },
  methods: {
    getHeaderInfo() {
      axios.get('/api/data')
        .then(this.getHeaderInfoSucc)
        .catch((error) => {
          console.log(error);
        });
    },
    getHeaderInfoSucc(res) {
      res = res.data;
      if (res.data) {
        const { data } = res;
        this.seller = data.seller;
      }
    },
  },
  mounted() {
    this.getHeaderInfo();
  },
};
</script>

<style scoped>

</style>
