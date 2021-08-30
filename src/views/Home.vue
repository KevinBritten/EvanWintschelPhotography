<template>
  <div class="homepage">
    <h1>EVAN<br />WINTSCHEL</h1>
    <div ref="bioContainer"></div>
  </div>
</template>

<script>
import sanity from "../sanity";
const blocksToHtml = require("@sanity/block-content-to-html");
const query = `*[_type == "homepage"][0]`;

export default {
  name: "Home",
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
.homepage {
  text-align: center;
  padding: 0 300px;
}
.homepage-item-container {
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

@media only screen and (max-width: 991px) {
  .homepage {
    padding: 0 50px;
  }
}

@media only screen and (max-width: 767px) {
  .homepage {
    padding: 0 10px;
  }
}
</style>
