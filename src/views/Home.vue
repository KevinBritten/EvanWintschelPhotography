<template>
  <div>
    <content-grid>
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
  margin: 20%;
  text-align: center;
  display: flex;
  flex-direction: column;
}
</style>
