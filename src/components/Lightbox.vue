<template>
  <div class="lightbox">
    <span class="close-button" @click="$emit('closeLightbox')"> X </span>
    <Splide :options="{ rewind: true, start: currentIndex, type: 'loop' }">
      <SplideSlide v-for="image in album.images" :key="image.imageName.name">
        <img
          :data-srcset="`
                    ${imageUrlFor(image.image).width(600)} 600w,
                    ${imageUrlFor(image.image).width(800)} 800w,          
                    ${imageUrlFor(image.image).width(1200)} 1200w,          
                    ${imageUrlFor(image.image).width(1600)} 1600w,          
                    ${imageUrlFor(image.image).width(2000)} 2000w,          
                    ${imageUrlFor(image.image).width(2400)} 2400w,          
           `"
          sizes="90vw,"
          v-lazy="`${imageUrlFor(image.image)}`"
          :alt="image.imageName.name"
        />
      </SplideSlide>
    </Splide>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(sanity);
import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
  components: { Splide, SplideSlide },
  name: "Lightbox",
  props: ["album", "currentIndex"],
  data() {
    return {
      loadedImages: [],
    };
  },
  created() {
    window.addEventListener("keydown", (e) => this.closeLightbox(e));
  },
  destroyed() {
    window.removeEventListener("keydown", (e) => this.closeLightbox(e));
  },

  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    closeLightbox(key) {
      if (key.keyCode === 27) {
        this.$emit("closeLightbox");
      }
    },
  },
};
</script>

<style scoped>
.lightbox {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: white;
}

.close-button {
  position: fixed;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  z-index: 15;
  cursor: pointer;
  user-select: none;
  right: 3rem;
  top: 4rem;
}

@media only screen and (max-width: 991px) {
  .close-button {
    right: auto;
    left: 20px;
    top: 15px;
  }
}
</style>>
