<template>
  <div class="ratingSelect">
    <div class="rating-type border-1px">
      <span class="block positive"
            @click="select(2,$event)"
            :class="{'active':selectType === 2}"
      >
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive"
            @click="select(0,$event)"
            :class="{'active':selectType === 0}"
      >
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative"
            @click="select(1,$event)"
            :class="{'active':selectType === 1}"
      >
        {{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div @click="toggleContent($event)"  class="switch" :class="{'on':onlyContent}">
      <span class="iconfont icon">&#xe621;</span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: 'ratingSelect',
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      },
    },
    selectType: {
      type: Number,
      default: ALL,
    },
    onlyContent: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意',
        };
      },
    },
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => rating.rateType === POSITIVE);
    },
    negatives() {
      return this.ratings.filter((rating) => rating.rateType === NEGATIVE);
    },
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.selectType = type;
      // console.log(`ratingSelect.vue ${type}`);
      this.$emit('increment','selectType', this.selectType);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.onlyContent = !this.onlyContent;
      // console.log(`ratingSelect.vue${this.onlyContent}`);
      // this.$emit('toggle-content', this.onlyContent);
      this.$emit('increment', 'onlyContent', this.onlyContent);
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import "../../common/styles/stylus/mixin.styl"

  .ratingSelect
    .rating-type
      padding:18px 0;
      margin: 0 18px;
      border-1px(rgba(7,17,27,0,1))
      font-size: 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        line-height 16px
        border-radius 1px
        font-size 12px
        color: rgb(77,85,93);
        &.active
          color: #fff;
        .count
          font-size 8px
          margin-left 2px
        &.positive
          background: rgba(0,160,220,0.2);
          &.active
            background: rgb(0,160,220);
        &.negative
          background: rgba(77,85,93,0.2);
          &.active
            background: rgb(77,85,93);
    .switch
      padding: 12px 18px
      line-height: 24px;
      border-bottom: 1px solid rgba(7,17,27,0.1)
      color: rgb(147,153,159);
      font-size 0
      &.on
        .icon
          color: #00c850;
      .icon
        display: inline-block;
        margin-right: 4px
        vertical-align top
        font-size 24px
      .text
        display: inline-block;
        vertical-align top
        font-size 12px
</style>
