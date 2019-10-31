<template>
<div  ref="wrapper" class="sellers">
  <div class="ratings-content">
    <div class="overview">
      <h1 class="title">{{seller.name}}</h1>
      <div class="desc">
        <star :size="36" :score="seller.score"></star>
        <span class="text">({{seller.ratingCount}})</span>
        <span class="text">月售{{seller.sellCount}}单</span>
      </div>
      <ul class="remark">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryTime}}</span>元
          </div>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="bulletin">
      <h1 class="title">公告与活动</h1>
      <div class="content-wrapper">
        <p class="content">{{seller.bulletin}}</p>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li class="support-item" v-for="(item,index) in seller.supports" :key="item.id">
          <support-ico :size=4 :type="seller.supports[index].type"></support-ico>
          <span class="text">{{seller.supports[index].description}}</span>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="pics">
      <h1 class="title">商家实景</h1>
      <div class="pic-wrapper" ref="picWrapper">
        <ul class="pic-list" ref="picList">
          <li class="pic-item" v-for="pic in seller.pics" :key="pic.id">
            <img :src="pic" width="120" height="90">
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="info">
      <div class="title ">商家信息</div>
      <ul>
        <li class="info-item" v-for="info in seller.infos" :key="info.id">{{info}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import Bscroll from 'better-scroll';
import split from '../split/split';
import star from '../star/star';
import supportIco from '../support-ico/support-ico';

export default {
  name: 'Sellers',
  data() {
    return {
      picScrollOptions: {
        scrollX: true,
        stopPropagation: true,
        directionLockThreshold: 0,
      },
    };
  },
  components: {
    split,
    star,
    supportIco,
  },
  props: {
    seller: {
      type: Object,
    },
  },
  methods: {
    initPics() {
      if (this.seller.pics) {
        const picWidth = 120;
        const margin = 6;
        const width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = `${width}px`;
        this.$nextTick(() => {
          if (!this.picScroll) {
            const options = {
              // click: true,
              scrollX: true,
              eventPassthrough: 'vertical',
            };
            this.picScroll = new Bscroll(this.$refs.picWrapper, options);
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
  },
  mounted() {
    const options = {
      click: true,
      scrollX: true,
    };
    this.scroll = new Bscroll(this.$refs.wrapper, options);
    this.initPics();
  },
};
</script>

<style lang="stylus" scoped>
  .sellers
    position: absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      padding 18px
      position relative
      .title
        margin-bottom 8px
        line-height 14px
        color rgb(7, 17, 27)
        font-size 14px
      .desc
        padding-bottom 18px
        font-size 0
        .star
          display inline-flex
          vertical-align top
          margin-right 8px
        .text
          display inline-block
          vertical-align top
          margin-right 12px
          line-height 18px
          font-size 10px
          color rgb(77, 85, 93)
      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border none
          h2
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 149)
          .content
            line-height 24px
            font-size 10px
            color rgb(7, 17, 27)
            .stress
              font-size 24px
    .bulletin
      padding: 18px 18px 0 18px
      white-space: normal
      .title
        margin-bottom: 8px
        line-height: 14px
        color: #333
        font-size: 14px
      .content-wrapper
        padding: 0 12px 16px 12px
        .content
          line-height: 24px
          font-size: 12px
          color: #f01414
      .supports
        .support-item
          padding 16px 12px
          font-size 0
          color: rgba(7, 17, 27, 0.1);
          .support-ico
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
          .text
            display inline-block
            font-size 12px
            line-height 16px
            color rgb(7, 17, 27)
    .pics
      padding 18px
      .title
        margin-bottom 12px
        line-height 14px
        color rgb(7, 17, 27)
        font-size 14px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin 0
    .info
      padding: 18px 18px 0 18px
      color: #07111b
      .title
        padding-bottom: 12px
        line-height: 14px
        font-size: 14px
      .info-item
        padding: 16px 12px
        line-height: 16px
        font-size: 12px
</style>
