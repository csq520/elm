<template>
  <transition name="fade">
    <div class="food" v-show="showFood" ref="wrapper">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="iconfont icon">&#xe641;</i>
          </div>
        </div>
        <div class="content" >
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <CartControl :food="food"></CartControl>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst"
                 class="buy" v-show="food.count === 0 || !food.count">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info"> <!-- 并不是所有的商品都有info的 -->
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingSelect
            @increment="incrementTotal"
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
          ></ratingSelect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)"
                  v-for="(rating,index) in food.ratings"
                  :key="index" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" width="12" height="12" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span
                    :class="{'icondianzan':rating.rateType=== 0,'iconcai-f':rating.rateType=== 1}"
                  >
                  </span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Bscroll from 'better-scroll';
import Vue from 'vue';
import CartControl from '../cartControl/CartControl';
import split from '../split/split';
import ratingSelect from '../ratingSelect/ratingSelect';
import { formatDate } from '../../common/js/date';

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  name: 'Food',
  data() {
    return {
      showFood: false,
      selectType: ALL,
      onlyContent: '',
    };
  },
  props: {
    food: {
      type: Object,
    },
    desc: {
      all: '全部',
      positive: '推荐',
      negative: '吐槽',
    },
  },

  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
  },
  components: {
    CartControl,
    split,
    ratingSelect,
  },
  computed: {},
  methods: {
    show() {
      this.showFood = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          const options = {
            click: true,
          };
          this.scroll = new Bscroll(this.$refs.wrapper, options);
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFood = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('cart-add', event.target);
      Vue.set(this.food, 'count', 1);
    },
    incrementTotal(type, data) {
      this[type] = data;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
    // console.log(`this.selectType: ${  this.selectType  }  type: ${  type  } out  ${  text}`);
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      }
      return type === this.selectType;
    },
  },
  // created() {
  //   'selectType'(type) {
  //     this.selectType = type;
  //   };
  //   'toggle-content'(onlyContent) {
  //     this.onlyContent = onlyContent;
  //   }
  // }
};
</script>

<style  lang="stylus" scoped>
  @import "../../common/styles/stylus/mixin.styl"
  .food
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    bottom: 48px;
    width: 100%;
    background: #fff;
    &.fade-enter-active, &.fade-leave-active
      transition all .3s linear
      transform translate3d(0,0,0)
    &.fade-enter, &.fade-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)
    .food-content
      .image-header
        position relative
        width 100%
        height 0
        padding-top 100% // 百分比是相对于盒子的宽度来计算的，看起来就像是一个正方形
        img
          position absolute
          left 0
          top 0
          width 100%
          height 100%
        .back
          position absolute
          top 10px
          left 0
          .icon
            display block
            padding 10px //图片不要变大，但是点击区域会扩大
            font-size 20px
            color #ffffff
      .content
        padding 18px
        position relative
        .title
          line-height 14px
          margin-bottom 8px
          font-size 14px
          font-weight 700px
          color rgb(7,17,27)
        .detail
          margin-bottom 18px
          height 10px
          line-height 10px
          font-size 0 // 因为后面两个span是inline-block布局
          .sell-count, .rating
            font-size 10px
            color rgb(147,153,159)
          .sell-count
            margin-right 12px
        .price
          line-height 24px
          font-weight: 700
          .now
            margin-right 8px
            font-size 14px
            color rgb(240,20,20)
          .old
            text-decoration line-through
            color rgb(147,153,159)
            font-size 10px
        .cartControl-wrapper
          position absolute
          right 12px
          bottom 12px
        .buy
          position absolute
          right 18px
          bottom 18px
          z-index 10
          height 24px
          line-height 24px
          padding 0 12px
          box-sizing border-box
          font-size 10px
          border-radius 10px
          color #ffffff
          background rgb(0,160,220)
          &.fade-enter-active, &.fade-leave-active
            transition all 0.2s
            opacity 1
          &.fade-enter, &fade-leave-active
            opacity 0
      .info
        padding 18px
        .title
          line-height 14px
          margin-bottom 16px
          font-size 14px
          color rgb(7,17,27)
        .text
          line-height 24px
          padding 0 8px
          font-size 12px
          color rgb(77,85,93)
      .rating
        padding-top 18px
        .title
          line-height 14px
          margin-left 18px
          font-size 14px
          color rgb(7,17,27)
        .rating-wrapper
          padding: 0 18px;
          .rating-item
            position: relative
            padding 16px 0
            border-1px(rgba(7,17,27,0.1))
            .user
              position: absolute
              right: 0;
              top: 16px
              line-height: 12px;
              font-size 0
              .name
                display: inline-block
                vertical-align: top
                margin-right 6px
                font-size 10px
                color: rgb(147,153,159);
              .avatar
                border-radius 50%
            .time
              margin-bottom: 6px;
              line-height: 12px;
              font-size 10px
              color: rgb(147,153,159);
            .text
              line-height: 16px;
              font-size 12px
              color: rgb(7,17,27);
              .icondianzan, .iconcai-f
                margin-right 4px
                line-height: 16px;
                font-size 12px
              .icondianzan
                color: rgb(0,160,220);
              .iconcai-f
                color: rgb(147,153,159);
          .no-rating
            padding 16px 0
            font-size 12px
            color: rgb(147,153,159);
</style>
