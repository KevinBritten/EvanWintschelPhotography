<template>

<div class="album-container">
<title-card :title='`${album[0].title}`'></title-card>  <div  class='image-container' v-for="image, index in album[0].images" :key="image.key" 
  :style="{'grid-row-end': `span ${image.height || 1}`,
  'grid-column-end': `span ${image.width || 1}`,
   'border-top-color' : calculateBorderColor(index, 'top'),
   'border-bottom-color' : calculateBorderColor(index, 'bottom'),
   }" >
  <img :src="imageUrlFor(image.image)"> 
  </div>
</div>
  
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import TitleCard from "../components/TitleCard.vue";

const imageBuilder = imageUrlBuilder(sanity);
export default {
  components: { TitleCard },
  name: "album",
  data() {
    return {
      album: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      const query = `*[_type == "album" && title == '${
        this.$route.params.album
      }']`;

      this.error = this.post = null;
      sanity.fetch(query).then(
        album => {
          console.log(album);
          this.album = album;
        },
        error => {
          this.error = error;
        }
      );
    },
    calculateBorderColor(index, side) {
      const sideModifier = side === "top" ? 0.1 : 0.3;
      const borderColor =
        "rgb(0, 0, 0, " +
        parseFloat(index * 0.05 + sideModifier).toFixed(2) +
        ")";
      console.log(borderColor);
      return borderColor;
    }
  }
};
</script>

<style scoped>
.album-container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-auto-rows: minmax(0, 1fr); */
  grid-gap: 10px;
  margin: 20px;
  grid-auto-flow: dense;
  padding: 0 0 20px 0;
}
.image-container {
  display: flex;
  border-bottom: solid 3px;
  border-top: solid 3px;
  padding: 10px 2%;
}
img {
  display: block;
  width: 100%;
  /* height: 100%; */
  object-fit: contain;
}
</style>
