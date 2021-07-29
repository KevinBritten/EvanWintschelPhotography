<template>
  <div>
    <!-- <LoadingAnimation v-if="!currentImageLoaded" /> -->
    <div
      ref="lightbox"
      class="lightbox"
      :class="{ '--visible': currentImageLoaded }"
    >
      <!-- <div ref="lightbox" class="lightbox --visible"> -->
      <span class="close-button" @click="$emit('closeLightbox')"> X </span>
      <span
        class="nav-arrow"
        :class="{ '--disabled': disableIncrementSlide.previous }"
        @click="incrementSlide(-1)"
      >
        &lt;
      </span>
      <span
        class="nav-arrow --next"
        :class="{ '--disabled': disableIncrementSlide.next }"
        @click="incrementSlide(1)"
      >
        >
      </span>
      <div
        v-for="(image, index) in album.images"
        :key="image.imageName.name"
        :ref="`image${index}`"
        class="image-contianer"
        :class="{ 'image-container--last': isLastImage(index) }"
      >
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
          @load="loadedImages.push(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(sanity);
import LoadingAnimation from "./LoadingAnimation.vue";

export default {
  name: "Lightbox",
  props: ["album", "currentIndex"],
  data() {
    return {
      loadedImages: [],
    };
  },
  components: { LoadingAnimation },
  created() {
    window.addEventListener("keydown", (e) => this.incrementSlideKey(e));
    window.addEventListener("scroll", (e) => e.preventDefault());
    window.addEventListener("scroll", (e) => console.log(e));
  },
  destroyed() {
    window.removeEventListener("scroll", (e) => console.log(e));
    window.removeEventListener("keydown", (e) => this.incrementSlideKey(e));
  },
  computed: {
    currentImageLoaded() {
      return this.loadedImages.includes(this.currentIndex);
    },
    disableIncrementSlide() {
      return {
        previous: this.currentIndex <= 0,
        next: this.currentIndex >= this.album.images.length - 1,
      };
    },
  },
  watch: {
    currentIndex: "updateScrollPosition",
    currentImageLoaded: "updateScrollPosition",
    lightboxScroll: () => {
      this.$Lazyload.lazyLoadHandler();
      console.log("awdawd");
    },
  },

  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    updateScrollPosition() {
      const scrollPosition =
        this.$refs[`image${this.currentIndex}`][0].offsetLeft;
      this.$refs["lightbox"].scrollLeft = scrollPosition;
      this.$Lazyload.lazyLoadHandler();
    },
    incrementSlideKey(e) {
      if (e.keyCode === 39) {
        this.incrementSlide(1);
      } else if (e.keyCode === 37) {
        this.incrementSlide(-1);
      } else if (e.keyCode === 27) {
        this.$emit("closeLightbox");
      }
    },
    incrementSlide(direction) {
      const directionName = direction == 1 ? "next" : "previous";
      if (!this.disableIncrementSlide[directionName]) {
        this.currentIndex += direction;
      }
    },
    isLastImage(index) {
      return index == this.album.images.length - 1;
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
  display: flex;
  overflow: scroll;
  padding: 8rem 0 50px;
  background-color: white;
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.63, 0.18, 0.95, 0.18);
  z-index: 20;
  overflow-y: hidden;
}

.--visible {
  opacity: 1;
  scroll-behavior: smooth;
}

.loading-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 10em;
  background-color: white;
  z-index: 100;
  opacity: 0.3;
}

.close-button,
.nav-arrow {
  position: fixed;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
  z-index: 15;
  cursor: pointer;
  user-select: none;
}
.close-button {
  right: 3rem;
  top: 3.5rem;
}

.nav-arrow {
  top: 50%;
  left: 3rem;
}

.--next {
  left: auto;
  right: 3rem;
}

.--disabled {
  opacity: 0.5;
  cursor: initial;
}

.image-contianer {
  display: flex;
  justify-content: space-around;
  height: 100%;
  min-width: 100%;
  position: relative;
}

img {
  object-fit: contain;
  max-width: 96%;
}

@media only screen and (max-width: 991px) {
  .nav-arrow {
    display: none;
  }
  .image-contianer {
    min-width: none;
    margin-right: 100px;
    padding: 2%;
  }
  .image-container--last {
    margin-right: 0;
  }
  .lightbox {
    overflow: scroll;
  }
  .close-button {
    right: auto;
    left: 20px;
    top: 15px;
  }
}

.fade-enter-active {
  transition: opacity 4s;
}
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 0.4;
}
.fade-leave-to {
  opacity: 0;
}
</style>>
