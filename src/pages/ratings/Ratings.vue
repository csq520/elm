<template>
  <div ref="wrapper" class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect
        @increment="incrementTotal"
        :select-type="selectType"
        :only-content="onlyContent"
        :desc="desc"
        :ratings="ratings"
      ></ratingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" :key="rating.id" class="rating-item"
              v-show="needShow(rating.rateType,rating.text)"
          >
            <div class="avatar">
              <img :src="rating.avatar" width="28px" height="28px">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">
                  {{rating.deliveryTime}}
                </span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <i class="iconfont icon">&#xe60c;</i>
                <span class="item" v-for="item in rating.recommend" :key="item.id">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
import axios from 'axios';
import star from '../star/star';
import ratingSelect from '../ratingSelect/ratingSelect';
import split from '../split/split';
import { formatDate } from '../../common/js/date';

const ALL = 2;

export default {
  name: 'Ratings',
  components: {
    star,
    ratingSelect,
    split,
  },
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
      ratings: [],
      showFood: false,
      selectType: ALL,
      onlyContent: true,
    };
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
        this.ratings = data.ratings;
      }
    },
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.selectType = type;
      this.$emit('increment', 'selectType', this.selectType);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.onlyContent = !this.onlyContent;
      this.$emit('increment', 'onlyContent', this.onlyContent);
    },
    incrementTotal(type, data) {
      this[type] = data;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      }
      return type === this.selectType;
    },
  },
  mounted() {
    this.getFoodInfo();
    const options = {
      scrollX: true,
      probeType: 3,
      mouseWheel: true,
      click: true,
      taps: true,
    };
    this.scroll = new Bscroll(this.$refs.wrapper, options);
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
  },
};
</script>

<style lang="stylus" scoped>
  .ratings
    position: absolute;
    top 174px
    bottom:0
    left: 0;
    width: 100%;
    overflow hidden
    .overview
      display: flex;
      padding 18px 0
      .overview-left
        padding-bottom 6px 0
        flex 0 0 137px
        width 137px // 防止出现兼容性问题
        border-right 1px solid rgba(7,17,27,0.1)
        text-align center
        @media only screen and (max-width 320px)
          flex 0 0 110px
          width 110px
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width 320px)
          padding-left 6px
        .score-wrapper
          line-height 18px
          margin-bottom 8px
          font-size 0
          .title
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .star
            display inline-flex
            vertical-align top
            margin 0 12px
          .score
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(255, 153, 0)
        .delivery-wrapper
          font-size 0
          .title
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .delivery
            display inline-block
            margin-left 12px
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(147, 153, 159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-weight 700
            font-size 10px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 16px
              vertical-align top
            .delivery
              display inline-block
              vertical-align top
              font-size 10px
              line-height 12px
              color rgb(147, 153, 159)
          .text
            line-height 18px
            color rgb(7, 17, 27)
            font-size 12px
            margin-bottom 8px
          .recommend
            line-height 16px
            font-size 0
            .icon
              color: rgb(0, 160, 220);
            .icon, .item
              display inline-block
              margin 0 8px 4px 0
              font-size 12px
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              color rgb(147, 153, 159)
              background #fffff
          .time
            position absolute
            top 0
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
</style>
