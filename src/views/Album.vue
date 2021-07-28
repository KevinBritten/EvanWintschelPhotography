<template>
  <div>
    <!-- <NotFound v-if="$store.state.albums.length < 1" /> -->
    <!-- <ContentGrid v-else> -->
    <ContentGrid>
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
    />
    <!-- <SiteFooter v-show="album" /> -->
  </div>
</template>

<script>
import TitleCard from "../components/TitleCard.vue";
import ContentGrid from "../components/ContentGrid.vue";
import ImageCard from "../components/ImageCard.vue";
import Lightbox from "../components/Lightbox.vue";
// import SiteFooter from "../components/SiteFooter.vue";

export default {
  name: "Album",
  // components: { TitleCard, ContentGrid, ImageCard, Lightbox, NotFound },
  components: { TitleCard, ContentGrid, ImageCard, Lightbox },
  // components: { TitleCard, ContentGrid, ImageCard, Lightbox, SiteFooter },
  data() {
    return {
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

  // beforeMount() {
  //   document.scrollingElement.scrollTop = 0;
  // },
  async beforeRouteLeave(to, from, next) {
    await this.closeAllOverlays();
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    await this.closeAllOverlays();
    next();
  },
  // beforeCreate() {
  //   console.log(
  //     this.$store.state.albums.map((a) => {
  //       return a.title.toLowerCase();
  //     })
  //   );
  //   console.log(this.$route.params.album.toLowerCase());
  //   document.scrollingElement.scrollTop = 0;
  //   if (
  //     !this.$store.state.albums
  //       .map((a) => {
  //         a.title.toLowerCase();
  //       })
  //       .includes(this.$route.params.album.toLowerCase())
  //   ) {
  //     this.$router.push("../NotFound");
  //   }
  // },
  created() {
    this.gridColumns =
      this.$store.state.breakpoints.findIndex((b) => {
        return window.innerWidth < b;
      }) + 1 || 3;
  },
  // async beforeCreate() {
  //   console.log(this.$route.params);
  //   document.scrollingElement.scrollTop = 0;
  //   async function checkAlbum() {
  //     if (
  //       !this.$store.state.albums
  //         .map((a) => {
  //           a.title.toLowerCase();
  //         })
  //         .includes(this.$route.params.album.toLowerCase())
  //     ) {
  //       this.$router.push("../NotFound");
  //     }
  //   }
  // if (
  //   !this.$store.state.albums
  //     .map((a) => {
  //       a.title.toLowerCase();
  //     })
  //     .includes(this.$route.params.album.toLowerCase())
  // ) {
  //   this.$router.push("../NotFound");
  // }
  //   await checkAlbum();
  // },

  methods: {
    openLightbox(index) {
      if (this.gridColumns > 1) {
        this.currentIndex = index;
        this.$store.commit("toggleLightbox");
      }
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
