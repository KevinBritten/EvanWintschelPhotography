<template>
  <div>
    <ContentGrid :class="{ 'scrollbars-hidden': $store.state.lightboxOpen }">
      <TitleCard :title="`${album.title}`" :grid-columns="gridColumns" />
      <ImageCard
        v-for="(image, index) in album.images"
        :key="image.key"
        :image="image"
        :index="index"
        :ref="index"
        :grid-columns="gridColumns"
        @openLightbox="openLightbox"
      />
    </ContentGrid>
    <Lightbox
      v-if="$store.state.lightboxOpen"
      :album="album"
      @closeLightbox="$store.commit('toggleLightbox')"
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
  data() {
    return {
      breakpoints: [767, 991, 1400],
      gridColumns: 0,
      currentIndex: 0,
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
    this.$store.commit("closeLightbox");
    this.gridColumns =
      this.breakpoints.findIndex((b) => {
        return window.innerWidth < b;
      }) + 1 || 3;
  },
  async beforeRouteUpdate(to, from, next) {
    if (to !== from) {
      await this.$store.commit("closeLightbox");
      next();
    } else {
      next();
    }
  },
  beforeMount() {
    console.log("awdaw");
    document.scrollingElement.scrollTop = 0;
  },

  methods: {
    openLightbox(index) {
      this.currentIndex = index;
      this.$store.commit("toggleLightbox");
    },
    incrementSlide(direction) {
      const albumSize = this.album.images.length;
      const updatedIndex = (this.currentIndex += direction);
      this.currentIndex =
        updatedIndex < 0 || updatedIndex >= albumSize
          ? (updatedIndex + albumSize) % albumSize
          : updatedIndex;
    },
  },
};
</script>

<style scoped>
.scrollbars-hidden {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbars-hidden::-webkit-scrollbar {
  display: none;
}
</style>
