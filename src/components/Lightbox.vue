<template>
  <div>
    <div v-if="!allImagesLoaded" class="loading">jwalkdjwlakjwdwa</div>
    <div
      ref="lightbox"
      class="lightbox"
      :class="{ '--visible': allImagesLoaded }"
    >
      <span class="close-button" @click="$emit('closeLightbox', $event)">
        X
      </span>
      <span class="nav-arrow" @click="$emit('incrementSlide', -1)"> &lt; </span>
      <span class="nav-arrow --next" @click="$emit('incrementSlide', 1)">
        >
      </span>
      <div
        v-for="(image, index) in album.images"
        :key="image.imageName.name"
        :ref="`image${index}`"
        class="image-contianer"
      >
        <img
          :srcset="`
                    ${imageUrlFor(image.image).width(600)} 600w,
                    ${imageUrlFor(image.image).width(800)} 800w,          
                    ${imageUrlFor(image.image).width(1200)} 1200w,          
                    ${imageUrlFor(image.image).width(1600)} 1600w,          
                    ${imageUrlFor(image.image).width(2000)} 2000w,          
                    ${imageUrlFor(image.image).width(2400)} 2400w,          
           `"
          sizes="90vw,"
          :src="`${imageUrlFor(image.image)}`"
          :alt="image.imageName.name"
          @load="loadedImages++"
        />
      </div>
    </div>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(sanity);

export default {
  name: "Lightbox",
  props: ["album", "currentIndex"],
  data() {
    return { loadedImages: 0 };
  },
  computed: {
    allImagesLoaded() {
      return this.loadedImages == this.album.images.length;
    },
  },
  watch: {
    currentIndex: "updateScrollPosition",
    allImagesLoaded: "updateScrollPosition",
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    updateScrollPosition() {
      const scrollPosition =
        this.$refs[`image${this.currentIndex}`][0].offsetLeft;
      this.$refs["lightbox"].scrollLeft = scrollPosition;
    },
  },
};
</script>

<style scoped>
.lightbox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  padding: 8rem 0 50px;
  background-color: white;
  opacity: 0;
  transition: opacity 500ms ease-in;
}

.--visible {
  opacity: 1;
  scroll-behavior: smooth;
}

.close-button,
.nav-arrow {
  position: fixed;
  font-size: 50px;
  z-index: 15;
}
.close-button {
  right: 2rem;
  top: 3.5rem;
}

.nav-arrow {
  top: 50%;
  left: 3.5rem;
}

.--next {
  left: auto;
  right: 3.5rem;
}

.image-contianer {
  display: flex;
  justify-content: space-around;
  height: 100%;
  min-width: 100%;
  position: relative;
}

img {
  height: 100%;
  object-fit: contain;
}
</style>>
