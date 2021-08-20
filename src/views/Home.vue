<template>
  <div>
    <content-grid>
      <div class="homepage-item-container" id="title">
        <h1 style="font-size: 4rem; text-align: center">EVAN<br />WINTSCHEL</h1>
      </div>
      <div class="homepage-item-container" id="bio" ref="bioContainer"></div>
    </content-grid>
  </div>
</template>

<script>
import ContentGrid from "../components/ContentGrid.vue";
import sanity from "../sanity";
const blocksToHtml = require("@sanity/block-content-to-html");
const query = `*[_type == "homepage"][0]`;

export default {
  name: "home",
  components: { ContentGrid },
  data() {
    return {
      bio: [],
    };
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      return sanity.fetch(query).then(
        (homepage) => {
          return homepage;
        },
        (error) => {
          this.error = error;
        }
      );
    },

    async setHomepage() {
      const payload = await this.fetchData();
      this.bio = payload.bio;
      this.$refs.bioContainer.innerHTML = blocksToHtml({ blocks: payload.bio });
    },
  },
  mounted() {
    this.setHomepage();
  },
};
</script>

<style scoped>
.homepage-item-container {
  /* padding: 10%; */
  /* margin: 10%; */
  text-align: center;
  display: flex;
  flex-direction: column;
}

#title {
  grid-column-start: 2;
}
#bio {
  grid-column-start: 3;
  grid-row-start: 2;
}

@media only screen and (max-width: 767px) {
  #title {
    grid-column-start: 1;
  }
  #bio {
    grid-column-start: 1;
  }
}
</style>
