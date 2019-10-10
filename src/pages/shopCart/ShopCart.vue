<template>
  <div>
    <div class="shopCart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="iconfont iconCar">&#xe61a;</i>
            </div>
            <div class="num" >
            </div>
          </div>
          <div class="price">￥</div>
          <div class="desc">另需配送费￥元</div>
        </div>
        <div class="content-right">
          <div class="pay">
            ¥20元起送
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShopCart',
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
  .shopCart
    position fixed
    top 516px
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%
    width 100%
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
            background: #333
            &.highlight
              background: rgb(0, 160, 220)
            .iconCar
              line-height: 44px
              font-size: 20px
              color: #999
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
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
          background: #333;
          &.not-enough
            background: #999
          &.enough
            background: #00b43c
            color: #999
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
</style>
