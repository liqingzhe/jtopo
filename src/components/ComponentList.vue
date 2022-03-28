<template>
  <div class="component-list">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="list"
      draggable
      @dragstart="handleDragStart(item, $event)"
      :data-index="index"
    >
      <img :src="item.icon" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import componentList from "@/custom-component/component-list";

export default {
  data() {
    return {
      componentList,
    };
  },
  methods: {
    handleDragStart(item, e) {
      let dragData = { ...item };
      e.dataTransfer.setData("text", JSON.stringify(dragData));
    },
  },
};
</script>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;

  .list {
    width: 45%;
    border: 1px solid #ddd;
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    color: #333;
    padding: 2px 5px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    img {
      display: block;
      width: 40px;
      height: 40px;
      margin: 0 auto;
    }
  }
}
</style>