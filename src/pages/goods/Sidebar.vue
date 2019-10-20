<template>
  <div ref="wrapper">
    <div>
      <div class="sidebar">
        <ul>
          <li v-for="item of goods"
              :key="item.id"
              @click="handleLetterClick"
              class="sidebar-item">
               <span class="text border-1px">
          <!--<support-ico v-show="item.type>0" :size="3"-->
                 <!--:type="seller.supports[index].type class="icon"></support-ico>-->
          {{item.name}}
        </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
// import supportIco from '../support-ico/support-ico';

export default {
  name: 'Sidebar',
  props: {
    goods: {
      type: Array,
      default() {
        return {};
      },
    },
  },
  components: {
    // supportIco,
  },
  mounted() {
    const options = {
      scrollX: true,
      mouseWheel: true,
      click: true,
      taps: true,
    };
    this.scroll = new Bscroll(this.$refs.wrapper, options);
  },
  methods: {
    handleLetterClick(e) {
      this.$emit('change', e.target.innerText);
      // console.log(e.target.innerText);
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import "../../common/styles/stylus/mixin.styl"
    .sidebar
      width: 80px;
      background: #f3f5f7;
      .sidebar-item
        display: table;
        height: 54px;
        width: 56px;
        line-height 14px
        padding: 0 12px;
        .text
          display table-cell
          width: 56px;
          vertical-align middle
          border-1px(rgba(7,17,27,0.1))
          font-size 12px
</style>
