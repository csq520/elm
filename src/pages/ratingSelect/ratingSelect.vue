<template>
  <div class="ratingSelect"  @increment="incrementTotal" :only-content="onlyContent" :desc="desc" :ratings="food.ratings">
    <div class="rating-type" border-1px>
      <span class="block positive"
            @click="select(2,$event)"
            :class="{'active':sType === 2}"
      >
        {{desc.all}}
        <span class="count">47</span>
      </span>
      <span class="block positive"
            @click="select(0,$event)"
            :class="{'active':sType === 0}"
      >
        {{desc.positive}}
        <span class="count">40</span>
      </span>
      <span class="block negative"
            @click="select(1,$event)"
            :class="{'active':sType === 1}"
      >
        {{desc.negative}}
        <span class="count">47</span>
      </span>
    </div>
    <div @click="toggleContent($event)"  class="switch" :class="{'on':oContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ratingSelect',
  data() {
    return {
      sType: this.selectType,
      oContent: this.onlyContent,
    };
  },
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
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.sType = type;
      console.log(`ratingSelect.vue ${type}`);
      this.$emit('increment', 'selectType', this.sType);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.oContent = !this.oContent;
      console.log(`ratingSelect.vue${this.oContent}`);
      // this.$emit('toggle-content', this.oContent);
      this.$emit('increment', 'onlyContent', this.oContent);
    },
  },
};
</script>

<style scoped>

</style>
