<template>
  <div class="sidebars">
    <div class="sidebar" v-for="item of goods" :key="item.id" @click="handleLetterClick">
      {{item.name}}
    </div>
  </div>
</template>

<script>
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
  methods: {
    handleLetterClick(e) {
      this.$emit('change', e.target.innerText);
      // console.log(e.target.innerText);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .sidebar
    width: 80px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    font-size: 12px;
    overflow: hidden;
    background: #f3f5f7;
</style>
