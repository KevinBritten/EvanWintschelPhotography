<template>
  <div>
  <div v-for="album in albums" :key="album.title" class="album-container">
  <div v-for="image, index in album.images" :key="image.key" :style="{'grid-row-end': `span ${imageSizes[index] || 1}`,'grid-column-end': `span ${imageSizess[index] || 1}`}">
  <img :src="imageUrlFor(image.image)"> 
  </div>
  <!-- <img v-for="image, index in album.images" :key="image.key" :src="imageUrlFor(image.image)" :style="index == 3 ? {'opacity': '0'}: null"> -->
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
      albums: [],
      // imageSizes: [2, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1],
      imageSizes: [],
      imageSizess: []
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
      console.log(source);
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

<style>
body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

body::-webkit-scrollbar {
  display: none;
}
.album-container {
  height: 100vh;
  /* overflow: hidden; */
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 2% 2%;
  grid-template-areas: ". . .";
}
.album-container div {
  display: flex;
  justify-content: center;
}

img {
  margin: 10px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
