<template>
  <div>
    <content-grid>
      <title-card :title="`${album[0].title}`" :grid-columns="gridColumns"></title-card>
      <div
        class="image-container"
        :key="image.key"
        v-for="image in album[0].images"
        :style="{
  'grid-column-end': calculateGridItemWidth(image.width),
    'grid-row-end':   `span ${image.height || 1}`,
   'border-top-color' : calculateBorderColor(index, 'top'),
   'border-bottom-color' : calculateBorderColor(index, 'bottom'),
   }"
      >



        <img :src="imageUrlFor(image.image)" />
      </div>

      
    </content-grid>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import TitleCard from "../components/TitleCard.vue";
import ContentGrid from "../components/ContentGrid.vue";

const imageBuilder = imageUrlBuilder(sanity);
export default {
  components: { TitleCard, ContentGrid },
  name: "album",
  data() {
    return {
      album: [],
      breakpoints: [767, 991, 1400],
      gridColumns: 0,
    };
  },
  created() {
    this.fetchData();
    this.gridColumns =
      this.breakpoints.findIndex((b) => {
        return window.innerWidth < b;
      }) + 1 || 3;
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
        (album) => {
          this.album = album;
        },
        (error) => {
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
      return borderColor;
    },
    calculateGridItemWidth(size) {
      const computedSize = size > this.gridColumns ? this.gridColumns : size;
      return `span ${computedSize}`;
    },
  },
};
</script>

<style scoped>
.image-container {
  display: flex;
  border-bottom: solid 3px;
  /* border-top: solid 2px; */
  padding: 20px 10px;
  margin: 10px;
}

img {
  display: block;
  width: 100%;
  /* height: 100%; */
  object-fit: contain;
}
</style>
