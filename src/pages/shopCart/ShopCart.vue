<template>
  <div>
    <div class="shopCart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="iconfont iconCar" :class="{'highlight':totalCount>0}">&#xe61a;</i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition name="drop"
                      @before-enter="beforeDrop"
                      @enter="dropping"
                      @after-enter="afterDrop"
          >
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fade" appear="true">
        <div class="shopCart-list" v-show="listShow">
          <div class="list-header">
            <div class="title">购物车</div>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="wrapper">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <CartControl :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
import CartControl from '../cartControl/CartControl';

function createBalls() {
  const balls = [];
  for (let i = 0; i < 10; i++) {
    balls.push({ show: false });
  }
  return balls;
}
export default {
  name: 'shopCart',
  data() {
    return {
      balls: createBalls(),
      fold: true,
    };
  },
  created() {
    this.dropBalls = [];
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      },
    },
    seller: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CartControl,
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.seller.minPrice}元起送`;
      } if (this.totalPrice < this.seller.minPrice) {
        const diff = this.seller.minPrice - this.totalPrice;
        return `还差¥${diff}元起送`;
      }
      return '去结算';
    },
    payClass() {
      if (this.totalPrice < this.seller.minPrice) {
        return 'not-enough';
      }
      return 'enough';
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      const show = !this.fold;
      if (show) { // true为展示状态
        this.$nextTick(() => {
          if (!this.scroll) {
            const options = {
              click: true,
              taps: true,
            };
            this.scroll = new Bscroll(this.$refs.wrapper, options);
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    },
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1];
      const rect = ball.el.getBoundingClientRect();
      const x = rect.left - 32;
      const y = -(window.innerHeight - rect.top - 22);
      el.style.display = '';
      el.style.transform = `translate3d(0,${y}px,0)`;
      el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      const inner = el.getElementsByClassName('inner-hook')[0];
      inner.style.transform = `translate3d(${x}px,0,0)`;
      inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
    },
    dropping(el) {
      this._reflow = document.body.offsetHeight
      this.$nextTick(() => {
        el.style.transform = 'translate3d(0,0,0)';
        el.style.webkitTransform = 'translate3d(0,0,0)';
        const inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.transform = 'translate3d(0,0,0)';
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        // el.addEventListener('transitionend', done);
      });
    },
    afterDrop(el) {
      const ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty() {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    },
    hideList() {
      this.fold = true;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`支付￥${this.totalPrice}元`);
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import "../../common/styles/stylus/mixin.styl"
  .shopCart
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px
    .content
      display: flex
      background: rgba(7, 17, 27, 1)
      font-size: 0
      color: #999
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: rgba(7, 17, 27, 1)
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c;
            &.highlight
              background: rgb(0, 160, 220)
            .iconCar
              line-height: 44px
              font-size: 20px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius 16px
            font-size 9px
            font-weight 700
            color: #fff;
            background: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-weight: 700
          font-size: 16px
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-weight: 700
          font-size: 12px
          &.not-enough
            background: #2b333b;
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopCart-list
      position absolute
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%
      transform translate3d(0,-100%,0)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s ease-in-out
        transform translate3d(0,-100%,0)
      &.fade-enter, &.fade-leave-active
        transform translate3d(0,0,0)
      .list-header
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          float: left;
          font-size 14px
          color: rgb(7,17,27);
        .empty
          float: right;
          font-size 12px
          color: rgb(0,160,220);
      .list-content
        padding:0 18px
        max-height:217px
        overflow hidden
        background: #fff;
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7,17,27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-weight: 700
            font-size: 14px
            color: rgb(240,20,20)
          .cart-control-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(5px) // 模糊效果
    -webkit-backdrop-filter blur(5px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
      opacity: 1
      background: rgba(7, 17, 27, 0.6)
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
