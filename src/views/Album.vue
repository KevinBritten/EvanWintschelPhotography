<template>
  <div>
    <ContentGrid v-if="album">
      <TitleCard :title="`${album.title}`" :grid-columns="gridColumns" />
      <!-- <transition-group name="fade" tag="div" class="instruments"> -->
      <ImageCard
        v-for="(image, index) in album.images"
        :key="image.key"
        :image="image"
        :index="index"
        :grid-columns="gridColumns"
        @imageLoaded="showImage"
      />
      <!-- </transition-group> -->
      <!-- <div
        class="image-container"
        :key="image.key"
        v-for="(image, index) in album.images"
        :style="{
          'grid-column-end': calculateGridItemWidth(image.width),
          'grid-row-end': `span ${image.height || 1}`,
          'border-top-color': calculateBorderColor(index, 'top'),
          'border-bottom-color': calculateBorderColor(index, 'bottom'),
        }"
      >
        <img
          :srcset="`${imageUrlFor(image.image).width(300)} 300w,
                    ${imageUrlFor(image.image).width(600)} 600w,
                    ${imageUrlFor(image.image).width(800)} 800w,          
                    ${imageUrlFor(image.image).width(1200)} 1200w,          
                    ${imageUrlFor(image.image).width(1600)} 1600w,          
                    ${imageUrlFor(image.image).width(2000)} 2000w,          
           `"
          sizes="(min-width: 767px) 50vw,
           (min-width: 991px) 33vw,
           100vw,"
          :src="`${imageUrlFor(image.image)}`"
          :alt="image.imageName.name"
        />
      </div> -->
    </ContentGrid>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import TitleCard from "../components/TitleCard.vue";
import ContentGrid from "../components/ContentGrid.vue";
import ImageCard from "../components/ImageCard.vue";

const imageBuilder = imageUrlBuilder(sanity);
export default {
  name: "Album",
  components: { TitleCard, ContentGrid, ImageCard },
  // components: { TitleCard, ContentGrid },
  data() {
    return {
      breakpoints: [767, 991, 1400],
      gridColumns: 0,
      loadedImages: [],
    };
  },
  computed: {
    album() {
      return this.$store.state.albums.find((album) => {
        return (
          this.$route.params.album.toLowerCase() == album.title.toLowerCase()
        );
      });
    },
  },
  created() {
    this.gridColumns =
      this.breakpoints.findIndex((b) => {
        return window.innerWidth < b;
      }) + 1 || 3;
  },
  methods: {
    showImage(index) {
      this.loadedImages.push(index);
    },
  },
  // methods: {
  //   // imageUrlFor(source) {
  //   //   return imageBuilder.image(source);
  //   // },
  //   calculateBorderColor(index, side) {
  //     const sideModifier = side === "top" ? 0.1 : 0.3;
  //     const borderColor =
  //       "rgb(0, 0, 0, " +
  //       parseFloat(index * 0.05 + sideModifier).toFixed(2) +
  //       ")";
  //     return borderColor;
  //   },
  //   calculateGridItemWidth(size) {
  //     const computedSize = size > this.gridColumns ? this.gridColumns : size;
  //     return `span ${computedSize}`;
  //   },
  // },
};
</script>

<style scoped>
/* .fade-enter-active {
  transition: all 0.8s ease;
} */

/* .fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
} */

/* .fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
} */
.instruments {
  height: 100%;
}
</style>
