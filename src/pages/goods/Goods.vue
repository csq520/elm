<template>
  <div class="wrapper">
    <swiper>
      <swiper-slide>
        <div class="goods">
          <Sidebar :goods="goods" @change="handleLetterChange"></Sidebar>
          <Foods :goods="goods" :letter="letter"></Foods>
          <ShopCart></ShopCart>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="ratings">
          <Ratings></Ratings>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sellers">
          <Sellers></Sellers>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from './Sidebar.vue';
import Foods from './Foods';
import ShopCart from '../shopCart/ShopCart';
import Ratings from '../ratings/Ratings';
import Sellers from '../sellers/Sellers';

export default {
  name: 'Goods',
  data() {
    return {
      goods: [],
      letter: {},
    };
  },
  components: {
    Sidebar,
    Foods,
    ShopCart,
    Ratings,
    Sellers,
  },
  methods: {
    getFoodInfo() {
      axios.get('/api/data')
        .then(this.getFoodInfoSucc)
        .catch((error) => {
          console.log(error);
        });
    },
    getFoodInfoSucc(res) {
      res = res.data;
      if (res.ret && res.data) {
        const { data } = res;
        this.goods = data.goods;
      }
    },
    handleLetterChange(letter) {
      this.letter = letter;
    },
  },
  mounted() {
    this.getFoodInfo();
  },
};
</script>

<style lang="stylus" scoped>
  .goods
    display: grid;
    grid-template-columns: 80px auto;
    grid-template-rows: 560px auto;
</style>
