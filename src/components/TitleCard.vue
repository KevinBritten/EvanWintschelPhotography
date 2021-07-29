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
  props: ["title"],
  computed: {
    titlePosition() {
      return Math.floor(Math.random() * (this.$store.getters.gridColumns + 1));
    },
  },
};
</script>

<style scoped>
.title-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 200px;
}
h1 {
  text-align: center;
  font-size: 5em;
}

@media only screen and (max-width: 991px) {
  .title-card {
    min-height: 100px;
  }
}

@media only screen and (max-width: 767) {
  .title-card {
    min-height: 0;
  }
}
</style>
