<template>
<div class="Home">
  <Header :seller="seller"></Header>
  <Tab class="tab"></Tab>
  <Goods class="Goods"></Goods>
</div>
</template>

<script>
import axios from 'axios';
import Header from '../header/Header';
import Tab from '../tab/Tab';
import Goods from '../goods/Goods';

export default {
  name: 'Home',
  components: {
    Header,
    Tab,
    Goods,
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

<style lang="stylus" scoped>
.tab
  position: fixed
  top: 136px
  left: 0
  right: 0
  bottom: 0
.Goods
  position: relative;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
</style>
