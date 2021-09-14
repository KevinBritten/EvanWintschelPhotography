<template>
  <div>
    <ContentGrid>
      <TitleCard :title="`${album.title}`" />
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
    />
  </div>
</template>

<script>
import TitleCard from "../components/TitleCard.vue";
import ContentGrid from "../components/ContentGrid.vue";
import ImageCard from "../components/ImageCard.vue";
import Lightbox from "../components/Lightbox.vue";

export default {
  name: "Album",
  components: { TitleCard, ContentGrid, ImageCard, Lightbox },
  data() {
    return {
      gridColumns: 0,
      currentIndex: 0,
    };
  },
  beforeMount() {
    document.scrollingElement.scrollTop = 0;
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

  async beforeRouteLeave(to, from, next) {
    await this.closeAllOverlays();
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    await this.closeAllOverlays();
    next();
  },

  methods: {
    openLightbox(index) {
      this.currentIndex = index;
      this.$store.commit("toggleLightbox");
    },
    async closeAllOverlays() {
      this.$store.commit("mobileMenuOpen", false);
      this.$store.commit("closeLightbox");
    },
    async checkAlbum() {
      if (
        !this.$store.state.albums
          .map((a) => {
            a.title.toLowerCase();
          })
          .includes(this.$route.params.album.toLowerCase())
      ) {
        this.$router.push("../NotFound");
      }
    },
  },
};
</script>
