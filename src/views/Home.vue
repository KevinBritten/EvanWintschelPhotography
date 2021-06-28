<template>
  <div>
    <content-grid>
      <p>
        This is Evan's bio. He can edit in some text here, about phoptography
        and other things.
      </p>
      <ul>
        <li></li>
      </ul>
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

<style>
</style>
