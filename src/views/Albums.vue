<template>
  <div>
  <div v-for="album in albums" :key="album.title">
  <p >{{album.title}}</p>
  <!-- <img :src="imageUrlFor(album.poster)"> -->
  </div>
  
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "album"]{
  title,
  images
}`;

export default {
  name: "Albums",
  data() {
    return {
      albums: []
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      sanity.fetch(query).then(
        albums => {
          console.log(albums);
          this.albums = albums;
        },
        error => {
          this.error = error;
        }
      );
    }
  }
};
</script>

<style scoped>
</style>
