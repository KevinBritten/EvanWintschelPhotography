<template>
  <div
    class="image-container"
    :class="{ '--visible': imageLoaded }"
    :style="{
      'grid-column-end': calculateGridItemWidth(image.width),
      'grid-row-end': `span ${image.height || 1}`,
    }"
    @click="openLightbox"
  >
    <img
      :data-srcset="`${imageUrlFor(image.image).width(300)} 300w,
                    ${imageUrlFor(image.image).width(600)} 600w,
                    ${imageUrlFor(image.image).width(800)} 800w,          
                    ${imageUrlFor(image.image).width(1200)} 1200w,          
                    ${imageUrlFor(image.image).width(1600)} 1600w,          
                    ${imageUrlFor(image.image).width(2000)} 2000w,          
           `"
      sizes="(min-width: 767px) 50vw,
           (min-width: 991px) 33vw,
           100vw,"
      v-lazy="`${imageUrlFor(image.image)}`"
      :alt="image.imageName.name"
      @load="imageLoaded = true"
    />
  </div>
</template>

<script>
import sanity from "../sanity";

import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);
export default {
  props: ["image", "index"],
  data() {
    return {
      imageLoaded: false,
    };
  },
  computed: {
    gridColumns() {
      return this.$store.getters.gridColumns;
    },
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    calculateGridItemWidth(size) {
      const computedSize = size > this.gridColumns ? this.gridColumns : size;
      return `span ${computedSize}`;
    },
    openLightbox() {
      this.$emit("openLightbox", this.index);
    },
  },
};
</script>

<style scoped>
.image-container {
  display: flex;
  padding: 5px 2px;
  margin: 10px;
  min-height: 100px;
  opacity: 0;
  transition: opacity 2s;
}

img {
  display: block;
  width: 100%;
  object-fit: contain;
  cursor: pointer;
}

.--visible {
  opacity: 1;
}

@media only screen and (max-width: 767px) {
  img {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>