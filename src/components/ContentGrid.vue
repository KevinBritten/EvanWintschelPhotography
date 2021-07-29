<template>
  <div>
    <div class="content-grid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentGrid",
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
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .content-grid::-webkit-scrollbar {
    display: none;
  }
}
@media only screen and (max-width: 767px) {
  .content-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
