<template>
  <div>
    <h1>404</h1>
    <h2>
      This page doesn't exist! Click
      <router-link :to="'/'" class="home-link">here</router-link> to return to
      the homepage.
    </h2>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div {
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h1,
h2 {
  text-align: center;
}

a {
  color: initial;
}
</style>