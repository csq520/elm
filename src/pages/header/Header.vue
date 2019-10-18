<template>
  <div class="header">
    <div class="content-wrapper" @click="handleHeaderClick">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!--<span class="support-ico"><img src="../support-ico/decrease_1@2x.png" alt=""></span>-->
          <support-ico :size=1 :type="seller.supports[0].type"></support-ico>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <HeaderDetail
      :seller="seller"
      v-show="showHeader"
      @close="handleHeaderCLose"
    >
    </HeaderDetail>
  </div>
</template>

<script>
import SupportIco from '../support-ico/support-ico';
import HeaderDetail from './HeaderDetail.vue';

export default {
  name: 'Header',
  data() {
    return {
      showHeader: false,
    };
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    HeaderDetail,
    SupportIco,
  },
  methods: {
    handleHeaderClick() {
      this.showHeader = true;
    },
    handleHeaderCLose() {
      this.showHeader = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import "../../common/styles/stylus/mixin.styl"
.header
  position: relative;
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
      flex: 1;
      .title
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        .brand
          width: 30px;
          height: 18px;
          vertical-align: top
          bg-image('brand')
          background-size: 30px 18px;
          background-repeat: no-repeat;
        .name
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold ;
      .description
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
      .support
        display: flex
        align-items: center
        .support-ico
          margin-right: 4px
        .text
          line-height: 12px;
          font-size: 10px;
    .support-count
      position: absolute;
      right: 12px;
      bottom: 14px;
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
      .icon-keyboard_arrow_right
        margin-left: 2px;
        line-height: 24px;
        font-size: 20px;
  .bulletin-wrapper
    position: relative;
    display: flex;
    align-items: center;
    height: 28px;
    line-height: 28px;
    padding: 0 8px;
    background: rgba(7, 17, 27, 0.2);
    .bulletin-title
      flex: 0 0 22px
      width: 22px
      height: 12px
      margin-right: 4px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-text
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 10px;
  .background
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px) ;
</style>
