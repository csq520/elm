<template>
<div class="header">
  <div class="content-wrapper">
    <div class="avatar">
      <img width="64" hight="64" src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" alt="">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand">
          <img src="./brand@2x.png" alt="">
        </span>
        <span class="name">粥品香坊（回龙观）</span>
      </div>
      <div class="description">
        蜂鸟专送/38分钟送达
      </div>
      <div class="support">
        <span class="support-ico"><img src="../support-ico/decrease_1@2x.png" alt=""></span>
        <span class="text">在线支付满28减5</span>
      </div>
    </div>
  </div>
  <div class="support-count">
    <span class="count">5个</span>
    <i class="iconfont icon">&#xe601;</i>
  </div>
  <div class="bulletin-wrapper">
    <span class="bulletin-title"><img src="./bulletin@2x.png" alt=""></span>
    <span class="bulletin-text">
      粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。
      坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
    </span>
    <i class="iconfont icon">&#xe601;</i>
  </div>
  <div class="background">
    <img src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg" width="100%" height="100%">
  </div>
</div>
</template>

<script>
export default {
  name: 'Header',
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
        margin-bottom: 8px;
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
        margin-bottom: 8px;
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
