<template>
  <div class="FoodDetail">
    <div>
      <div>
        <div class="headerImg">
          <div class="back">
            <i class="iconfont icon" @click="handleCloseFood">&#xe641;</i>
          </div>
          <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750" alt="">
        </div>
        <div class="content">
          hello world
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoodDetail',
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    handleCloseFood() {
      this.$emit('close');
    },
  },
};
</script>

<style  lang="stylus" scoped>
  .FoodDetail
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    .headerImg
      position: relative;
      width: 100%
      img
        width: 100%;
      .back {
        position: absolute;
        width: 30px;
        height: 30px;
        color: #fff;
        padding 10px
        clear: both;
        .iconfont {
          font-size: 30px;
        }
      }
</style>
