<template>
  <div
    class="image-container"
    :class="{ '--visible': imageLoaded }"
    :style="{
      'grid-column-end': calculateGridItemWidth(image.width),
      'grid-row-end': `span ${image.height || 1}`,
      'border-bottom-color': calculateBorderColor(index, 'bottom'),
    }"
  >
    <!-- <div
    class="image-container"
    :style="{
      'grid-column-end': calculateGridItemWidth(image.width),
      'grid-row-end': `span ${image.height || 1}`,
      'border-top-color': calculateBorderColor(index, 'top'),
      'border-bottom-color': calculateBorderColor(index, 'bottom'),
    }"
  > -->
    <!-- <div class="image-container"> -->
    <!-- <img
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
    /> -->
    <!-- <img
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
      :onload="$emit('imageLoaded', index)"
    /> -->
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
      @load="imageLoaded = true"
    />
  </div>
</template>

<script>
import sanity from "../sanity";

import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);
export default {
  props: ["image", "index", "grid-columns"],
  data() {
    return {
      imageLoaded: false,
    };
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    // calculateBorderColor(index, side) {
    //   const sideModifier = side === "top" ? 0.1 : 0.3;
    //   const borderColor =
    //     "rgb(0, 0, 0, " +
    //     parseFloat(index * 0.05 + sideModifier).toFixed(2) +
    //     ")";
    //   return borderColor;
    // },
    calculateBorderColor(index) {
      const borderColor =
        "rgb(0, 0, 0, " + parseFloat((index + 1) * 0.07).toFixed(2) + ")";
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
  /* border-bottom: solid 3px; */
  /* border-top: solid 2px; */
  padding: 20px 10px;
  margin: 10px;
  min-height: 100px;
  opacity: 0;
  transition: opacity 2s;
}

img {
  display: block;
  width: 100%;
  /* height: 100%; */
  object-fit: contain;
}

.--visible {
  opacity: 1;
}
</style>