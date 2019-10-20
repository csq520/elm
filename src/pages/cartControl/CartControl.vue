<template>
    <div class="cartControl">
      <transition name="move">
        <div class="cart-decrease"
             @click.stop.prevent="decreaseCart"
             v-show="food.count>0"
        >
          <span class="iconfont inner">&#xe617;</span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="iconfont cart-add" @click.stop.prevent="addCart">&#xe638;</div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'CartControl',
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      },
    },
    food: {
      type: Object,
    },
  },
  created() {
    // console.log(this.food);
  },
  methods: {
    addCart(event) {
      // console.log('click');
      if (!this.food.count) {
        Vue.set(this.food, 'count', 0);
        // this.food.count = 1;
      }
      this.food.count++;
      this.$emit('cartAdd', event.target);
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.cartControl
  font-size 0
  .cart-decrease
    display: inline-block;
    padding 6px
    .inner
      display inline-block
      line-height: 24px;
      font-size: 20px;
      color: rgb(0,160,220);
      transition: all 0.4s linear
      transform rotate(0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s linear
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px,0,0)
      .inner
        transform rotate(180deg)
  .cart-count
    display: inline-block;
    vertical-align top
    width: 12px;
    padding-top 6px
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147,153,159);
  .cart-add
    display: inline-block;
    padding 6px
    line-height: 24px;
    font-size: 20px;
    color: rgb(0,160,220);
</style>
