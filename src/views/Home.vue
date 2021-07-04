<template>
  <div>
    <content-grid>
      <div class="homepage-item-container">
        <p style="font-size: 4rem; text-align: center">EVAN<br />WINTSCHEL</p>
      </div>
      <div class="homepage-item-container">
        <p>
          This is Evan's bio. He can edit in some text here, about phoptography
          and other things.
        </p>
      </div>
      <div class="homepage-item-container">
        <p>
          This is Evan's bio. He can edit in some text here, about phoptography
          and other things.
        </p>
      </div>
    </content-grid>
  </div>
</template>

<script>
import ContentGrid from "../components/ContentGrid.vue";
export default {
  name: "home",
  components: { ContentGrid },
};
</script>

<style scoped>
.homepage-item-container {
  padding: 10%;
  margin: 10%;
  text-align: center;
  display: flex;
  flex-direction: column;
  border: double gray 6px;
}
</style>
