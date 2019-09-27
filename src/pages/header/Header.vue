<template>
<div class="header">
  <div class="content-wrapper" @click="HandleClickHeader">
    <div class="avatar">
      <img width="64" hight="64" :src="seller.avatar" alt="">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand">
          <img src="./brand@2x.png" alt="">
        </span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <div class="support" v-if="seller.supports">
        <span class="support-ico"><img src="../support-ico/decrease_1@2x.png" alt=""></span>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
    </div>
  </div>
  <div class="support-count" v-if="seller.supports">
    <span class="count">{{seller.supports.length}}个</span>
    <i class="iconfont icon">&#xe601;</i>
  </div>
  <div class="bulletin-wrapper">
    <span class="bulletin-title"><img src="./bulletin@2x.png" alt=""></span>
    <span class="bulletin-text">{{seller.bulletin}}</span>
    <i class="iconfont icon">&#xe601;</i>
  </div>
  <div class="background">
    <img :src="seller.avatar" width="100%" height="100%">
  </div>
  <HeaderDetail
  :seller="seller"
  v-show="showHeader"
  @close="HandleCloseHeader"
  ></HeaderDetail>
</div>
</template>

<script>
import HeaderDetail from './HeaderDetail';

export default {
  name: 'Header',
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      showHeader: false,
    };
  },
  components: {
    HeaderDetail,
  },
  methods: {
    HandleClickHeader() {
      this.showHeader = true;
    },
    HandleCloseHeader() {
      this.showHeader = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
.header
  position relative
  overflow: hidden;
  color: #f3f5f7;
  background: rgba(7, 17, 27, 0.5);
  .content-wrapper
    position: relative;
    display: flex;
    align-items: center;
    padding: 24px 12px 18px 24px;
    .avatar
      flex: 0 0 64px;
      width: 64px;
      margin-right: 16px;
      img
        border-radius: 2px;
    .content
      flex 1
      .title
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        .brand
          width: 30px;
          height: 18px;
          background-size: 30px 18px;
          background-repeat: no-repeat;
          img
            width: 100%;
            height: 100%;
        .name
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
      .description
        margin-bottom: 6px;
        line-height: 12px;
        font-size: 12px;
      .support
        display: flex;
        align-items: center;
        .support-ico
          width: 12px;
          height: 12px;
          margin: 0 4px 4px 0;
          img
            width: 100%;
            height: 100%;
        .text
          line-height: 12px;
          font-size: 10px;
  .support-count
    position: absolute;
    right: 12px;
    bottom: 38px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 14px;
    background: rgba(7, 17, 27, 0.2);
    .count
      font-size: 12px;
    .icon
      margin-left: 2px;
      line-height: 24px;
      font-size: 8px;
  .bulletin-wrapper
    position: relative;
    display: flex;
    align-items: center;
    height: 28px;
    line-height: 28px;
    padding: 0 8px;
    background: rgba(7, 17, 27, 0.2);
    .bulletin-title
      flex: 0 0 22px;
      width: 22px;
      height: 12px;
      margin:0 4px 18px 0;
      background-size: 22px 12px;
      background-repeat: no-repeat;
      img
        width: 100%;
        height: 100%;
    .bulletin-text
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 10px;
    .icon
      flex: 0 0 10px;
      width: 10px;
      font-size: 8px;
  .background
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
</style>
