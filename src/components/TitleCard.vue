<template>
  <div class="title-card" :style="{'grid-column-end':titlePosition, 'grid-column-start': titlePosition}">
<h1>{{title}}</h1>
  </div>
</template>

<script>
export default {
  props: ["title", "gridColumns"],
  data() {
    return {
      titlePosition: Math.floor(Math.random() * (this.gridColumns + 1))
    };
  }
};
</script>

<style scoped>
.title-card {
  display: flex;
  flex-direction: column;
  /* align-content: center; */
  /* align-content: space-around; */
  justify-content: space-around;
}
h1 {
  text-align: center;
  font-size: 5em;
}
</style>
