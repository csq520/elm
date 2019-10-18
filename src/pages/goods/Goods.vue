<template>
<div class="goods">
  <Sidebar :goods="goods" @change="handleLetterChange"></Sidebar>
  <div ref="wrapper">
    <div  class="foods">
      <ul>
        <li class="foods-list" v-for="item of goods" :key="item.id" :ref="item.name">
          <h1 class="title" >{{item.name}}</h1>
          <div class="foods-item border-1px foods-list-hook" v-for="food of item.foods" :key="food.id">
            <div class="icon">
              <img :src="food.image" class="foods-img" alt="">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cartControl-wrapper">
                <CartControl :food="food" @cartAdd="handleCartAdd"></CartControl>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--<FoodDetail-->
    <!--v-show="showFood"-->
    <!--@close="closeFood"-->
    <!--&gt;-->
    <!--</FoodDetail>-->
  </div>
  <shopCart :seller="seller" :select-foods="selectFoods"  ref="shopCart"></shopCart>
</div>
</template>

<script>
import axios from 'axios';
import Bscroll from 'better-scroll';
import Sidebar from './Sidebar.vue';
// import Foods from './Foods.vue';
import shopCart from '../shopCart/shopCart.vue';
import CartControl from '../cartControl/CartControl';

export default {
  name: 'Goods',
  data() {
    return {
      goods: [],
      seller: {},
      letter: {},
      food: [],
    };
  },
  components: {
    Sidebar,
    // Foods,
    shopCart,
    CartControl,
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
      // console.log(res);
      // console.log(res.data.goods['0'].name);
      if (res.ret && res.data) {
        const { data } = res;
        // console.log(data.goods['0'].name);
        // console.log(data.goods['0'].foods['0'].name);
        // console.log(data.goods['0'].foods['0']);
        this.goods = data.goods;
        this.seller = data.seller;
      }
    },
    handleLetterChange(letter) {
      this.letter = letter;
    },
    handleCartAdd(target) {
      // 异步执行下落
      this.$nextTick(() => {
        this.$refs.shopCart.drop(target);
      });
    },
    // getA() {
    //   axios.get('/api/goods')
    //     .then(this.getAInfoSucc)
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    // getAInfoSucc(res) {
    //   res = res.data;
    //   console.log(res);
    //   console.log(res.data);
    //   if (res.errno === 0 && res.data) {
    //     const { data } = res;
    //     console.log(data);
    //     console.log(data['0'].foods);
    //     // this.goods = data.goods;
    //   }
    // },
  },
  //   grid-template-columns: 80px auto;
  // grid-template-rows: 516px auto;
  mounted() {
    this.getFoodInfo();
    const options = {
      scrollX: true,
      mouseWheel: true,
      click: true,
      taps: true,
    };
    this.scroll = new Bscroll(this.$refs.wrapper, options);
    // this.getA();
  },
  computed: {
    // currentIndex() {
    //   for (let i = 0; i < this.listHeight; i++) {
    //     let height1 = this.listHeight[i];
    //     let height2 = this.listHeight[i + 1];
    //     if (!height2 || (this.scrollY > height1 && this.scrollY < height2)) {
    //       return i;
    //     }
    //   }
    //   return 0;
    // },
    selectFoods() {
      const foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    },
  },
  watch: {
    letter() {
      if (this.letter) {
        const element = this.$refs[this.letter][0];
        // console.log(element);
        this.scroll.scrollToElement(element);
      }
      if (this.scroll) {
        this.scroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
        // console.log(this.scrollY);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import "../../common/styles/stylus/mixin.styl"
.goods
  position: absolute
  width: 100%
  top: 174px
  bottom: 46px
  overflow: hidden
  display: flex
  .Sidebar
    flex: 0 0 80px
  .foods
    flex 1
    .title
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147,153,159);
      background: #f3f5f7;
    .foods-item
      display: flex;
      margin 18px
      padding-bottom 18px
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex: 0 0 57px
        margin-right 10px
        .foods-img
          width: 57px;
          height: 57px;
      .content
        flex: 1
        .name
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7,17,27);
        .desc, .extra
          font-size: 10px;
          line-height 10px
          color: rgb(147,153,159);
        .desc
          margin-bottom: 8px;
        .extra
          .count
            margin-right 12px
        .price
          font-weight: 700;
          line-height: 24px;
          .now
            color: rgb(240,20,20);
            font-size: 14px
            margin-right: 8px
          .old
            text-decoration line-through
            font-size: 10px;
            color: rgb(147,153,159);
        .cartControl-wrapper
          position: absolute;
          right: 0;
          bottom: 12px;
  .cartControl-wrapper
    position: absolute
    right: 0;
    bottom: 12px;
</style>
