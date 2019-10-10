<template>
  <div ref="wrapper" class="foods">
    <div>
      <ul class="foods-ul">
        <li class="foods-one" v-for="item of goods" :key="item.id" :ref="item.name">
          <h2 class="foods-h2" >{{item.name}}</h2>
          <div class="foods-list" v-for="innerItem of item.foods" :key="innerItem.id"
               @click="handleFoodClick">
            <img :src="innerItem.image" class="foods-img" alt="">
            <div class="content">
              <h2 class="name">{{innerItem.name}}</h2>
              <div class="desc">{{innerItem.description}}</div>
              <span class="desc">月售{{innerItem.sellCount}}份</span>
              <span class="desc">好评率{{innerItem.rating}}%</span>
              <div class="now">
                <span class="price">￥{{innerItem.price}}</span>
                <i class="iconfont icon" @click="handleshowNum">&#xe638;</i>
                <div class="num" v-show="showNum">1</div>
                <i class="iconfont icon2" v-show="showNum">&#xe617;</i>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <FoodDetail
      v-show="showFood"
      @close="closeFood"
    >
    </FoodDetail>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
import FoodDetail from './FoodDetail.vue';

export default {
  name: 'Foods',
  data() {
    return {
      showFood: false,
      showNum: false,
    };
  },
  components: {
    FoodDetail,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return {};
      },
    },
    letter: {},
  },
  methods: {
    handleFoodClick() {
      console.log(this.showFood);
      this.showFood = true;
      console.log(this.showFood);
    },
    closeFood() {
      this.showFood = false;
    },
    handleshowNum() {
      this.showNum = true;
    },
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper);
  },
  watch: {
    letter() {
      if (this.letter) {
        const element = this.$refs[this.letter][0];
        // console.log(element);
        this.scroll.scrollToElement(element);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .foods
    display: grid;
    overflow: hidden;
    .foods-ul
      .foods-one
        display: grid;
        grid-template-rows: 26px auto;
        .foods-h2
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          color: #666;
          background: #f3f5f7;
        .foods-list
          display: grid;
          grid-template-columns: 90px auto;
          .foods-img
            display: inline-block;
            width: 57px;
            height: 57px;
            line-height: 57px;
            text-align: center;
            margin: 20px 0 20px 20px;
          .name
            margin: 20px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: #333;
          .desc
            font-size: 10px;
            color: #999;
            margin-bottom: 10px;
          .now
            height: 24px;
            .price
              color: red;
              text-align: center;
            .icon
              position: absolute;
              right: 30px;
              font-size: 20px;
              color: dodgerblue;
            .num
              position: absolute;
              right: 58px;
              font-size: 10px;
              color: #666;
              margin-top: -10px;
            .icon2
              position: absolute;
              right: 70px;
              font-size: 20px;
              color: dodgerblue;
</style>
