<template>
  <div>
    <!-- <transition name="fade-out" mode="out-in"> -->

    <!-- </transition> -->
    <ContentGrid>
      <TitleCard :title="`${album.title}`" :grid-columns="gridColumns" />
      <!-- <transition-group name="fade" tag="div" class="instruments"> -->
      <ImageCard
        v-for="(image, index) in album.images"
        :key="image.key"
        :image="image"
        :index="index"
        :ref="index"
        :grid-columns="gridColumns"
        @toggleLightbox="toggleLightbox"
      />
      <!-- <ImageCard
        v-for="(image, index) in album.images"
        :key="image.key"
        :image="image"
        :index="index"
        :grid-columns="gridColumns"
      /> -->
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
    <Lightbox
      v-if="lightboxOpen"
      :album="album"
      @closeLightbox="toggleLightbox"
      :currentIndex="currentIndex"
      @incrementSlide="incrementSlide"
    />
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
import TitleCard from "../components/TitleCard.vue";
import ContentGrid from "../components/ContentGrid.vue";
import ImageCard from "../components/ImageCard.vue";
import Lightbox from "../components/Lightbox.vue";

const imageBuilder = imageUrlBuilder(sanity);
export default {
  name: "Album",
  components: { TitleCard, ContentGrid, ImageCard, Lightbox },
  // components: { TitleCard, ContentGrid },
  data() {
    return {
      breakpoints: [767, 991, 1400],
      gridColumns: 0,
      lightboxOpen: false,
      currentIndex: 0,
      // loadedImages: {},
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
    // loadedImagesComputed() {
    //   return this.loadedImages;
    // },
  },
  // 10 -1 9 10 20 10
  created() {
    this.gridColumns =
      this.breakpoints.findIndex((b) => {
        return window.innerWidth < b;
      }) + 1 || 3;
  },
  methods: {
    toggleLightbox(index) {
      this.currentIndex = index;
      this.lightboxOpen = !this.lightboxOpen;
    },
    incrementSlide(direction) {
      const albumSize = this.album.images.length;
      const updatedIndex = (this.currentIndex += direction);
      this.currentIndex =
        updatedIndex < 0 || updatedIndex >= albumSize
          ? (updatedIndex + albumSize) % albumSize
          : updatedIndex;
    },
    // showImage(index) {
    //   console.log(index);
    //   this.loadedImages[index] = true;
    // },
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
/* .fade-out-leave-active {
  transition: all 3s;
}

.fade-out-leave-to {
  transform: translateX(10%);
} */
.lightbox {
  display: flex;
  height: 100vh;
}

.lightbox {
  height: 100%;
}
</style>
