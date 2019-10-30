<template>
  <div>
    <div class="tab">
      <div class="tab-item">
        <router-link class="tab-link" v-bind:to="'/Goods'">
          <div>商品</div>
          <!--<div class="line"></div>-->
        </router-link>
      </div>
      <div class="tab-item">
        <router-link class="tab-link" to="/Ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link class="tab-link" to="/Sellers" >商家</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tab',
  props: {
    seller: {
      type: Object,
    },
  },
};
</script>

<style lang="stylus" scoped>
  .tab
    display: flex;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom 1px solid rgba(7,17,27,0.1)
    .tab-item
      flex: 1;
      text-align: center;
      .tab-link
        display: block;
        color: rgb(77,85,93);
        font-size: 16px;
        .line
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 125px;
          background-color: #f01414;
        &.active
         color: rgb(240,20,20)
      /*.line*/
        /*width: 138px;border-bottom: rgb(240,20,20);
        transform: translateX(0px) translateZ(0px)*/
</style>
