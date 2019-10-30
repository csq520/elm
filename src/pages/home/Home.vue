<template>
<div class="Home">
  <Header :seller="seller"></Header>
  <tab :seller="seller"></tab>
  <router-view :seller="seller"></router-view>
</div>
</template>

<script>
import axios from 'axios';
import Header from '../header/Header.vue';
import tab from '../tab/tab.vue';

export default {
  name: 'Home',
  components: {
    Header,
    tab,
  },
  data() {
    return {
      seller: {},
      ratings: {},
      goods: {},
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
      // console.log(res);
      if (res.ret && res.data) {
        const { data } = res;
        // console.log(res.data.seller.id);
        // console.log(res.data);
        // console.log(res.data.avatar);
        this.seller = data.seller;
        this.ratings = data.ratings;
        this.goods = data.goods;
      }
    },
  },
  mounted() {
    this.getHeaderInfo();
  },
};
</script>

<style lang="stylus" scoped>
</style>
