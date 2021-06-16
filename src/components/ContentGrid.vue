<template>
  <div class="content-grid">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContentGrid",
  data() {
    return {
      breakpoints: [767, 991, 1400],
      gridColumns: 0,
    };
  },
  methods: {
    calculateGridItemWidth(size) {
      const computedSize = size > this.gridColumns ? this.gridColumns : size;
      return `span ${computedSize}`;
    },
    setGridColumnQuantity() {
      this.gridColumns =
        this.breakpoints.findIndex((b) => {
          return window.innerWidth < b;
        }) + 1 || 3;
    },
  },
  created() {
    this.setGridColumnQuantity();
  },
};
</script>

<style scoped>
.content-grid {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: dense;
  padding: 0 0 20px 0;
}
@media only screen and (max-width: 991px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 767px) {
  .content-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
