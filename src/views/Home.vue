<template>
  <div class="homepage">
    <div class="homepage__title-container">
      <h1>EVAN WINTSCHEL</h1>
      <h2>PHOTOGRAPHY</h2>
    </div>
    <h3>albums:</h3>
    <hr />
    <div class="album-preview__container">
      <div
        v-for="album in $store.state.albums"
        :key="album.title + 'preview'"
        role="button"
        class="album-preview__single-container"
        :class="{ '--visible': currentImageLoaded }"
      >
        <router-link :to="'/album/' + album.title">
          <div class="album-preview__link-container">
            <img
              class="album-preview__image"
              :data-srcset="`${imageUrlFor(album.images[0].image).width(
                300
              )} 300w,
                    ${imageUrlFor(album.images[0].image).width(600)} 600w,
                    ${imageUrlFor(album.images[0].image).width(
                      800
                    )} 800w,          
                    ${imageUrlFor(album.images[0].image).width(
                      1200
                    )} 1200w,          
                    ${imageUrlFor(album.images[0].image).width(
                      1600
                    )} 1600w,          
                    ${imageUrlFor(album.images[0].image).width(
                      2000
                    )} 2000w,          
           `"
              sizes="(min-width: 767px) 50vw,
                     (min-width: 991px) 33vw,
                     100vw,"
              v-lazy="`${imageUrlFor(album.images[0].image)}`"
              :alt="album.images[0].imageName.name"
              @load="loadedImages.push(index)"
            />
            <div class="album-preview__title-overlay">
              <span class="album-preview__title">{{ album.title }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

export default {
  name: "Home",
  data() {
    return {
      loadedImages: [],
    };
  },
  computed: {
    currentImageLoaded() {
      return this.loadedImages.includes(this.currentIndex);
    },
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
  },
  mounted() {
    this.setHomepage();
  },
};
</script>

<style scoped>
.homepage {
  text-align: center;
  padding: 0 140px;
}
.homepage__title-container {
  margin-bottom: 150px;
}
.album-preview__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 300px;
  gap: 20px 20px;
  margin-top: 20px;
}
.album-preview__link-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.album-preview__title-overlay {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  opacity: 0;
  transition: opacity 200ms;
}
.album-preview__title-overlay:hover {
  opacity: 1;
}
.album-preview__image {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  transition: transform 200ms;
  object-fit: cover;
}
.album-preview__single-container {
  opacity: 0;
}

.album-preview__link-container:hover .album-preview__image {
  transform: scale(1.1);
}

.--visible {
  opacity: 1;
}

h1 {
  margin: 3rem 0 1.5rem;
}
h2 {
  margin-top: 0px;
}
a {
  text-decoration: none;
  font-style: normal;
  color: black;
  font-size: 2rem;
}
h3 {
  color: #bfbfbf;
  margin-bottom: 0px;
}
hr {
  margin-top: 0px;
  opacity: 0.5;
  width: 60%;
}

@media only screen and (max-width: 991px) {
  h1 {
    margin-bottom: 0.5rem;
  }
  .homepage {
    padding: 0 50px;
  }
  .homepage__title-container {
    margin-bottom: 40px;
  }
  .album-preview__container {
    grid-template-columns: 1fr 1fr;
  }
  .album-preview__title-overlay {
    position: absolute;
    bottom: 0;
    height: 20%;
    width: 100%;
    opacity: 1;
  }
}

@media only screen and (max-width: 767px) {
  .homepage {
    padding: 0 10px;
  }
  .album-preview__container {
    grid-template-columns: 1fr;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1rem;
  }
}
</style>
