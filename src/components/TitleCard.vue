<template>
  <div
    class="title-card"
    :style="{
      'grid-column-end': titlePosition,
      'grid-column-start': titlePosition,
    }"
  >
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: ["title", "gridColumns"],
  data() {
    return {
      titlePosition: Math.floor(Math.random() * (this.gridColumns + 1)),
    };
  },
};
</script>

<style scoped>
.title-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 60px;
}
h1 {
  text-align: center;
  font-size: 5em;
}

@media only screen and (max-width: 991px) {
  .title-card {
    padding: 20px;
  }
}
</style>
