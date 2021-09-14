<template>
  <div class="homepage">
    <div class="homepage__title-container">
      <h1>EVAN<br />WINTSCHEL</h1>
      <h2>PHOTOGRAPHY</h2>
    </div>
    <h3>albums:</h3>
    <hr />
    <div class="album-preview__container">
      <div
        v-for="album in $store.state.albums"
        :key="album.title + 'preview'"
        role="button"
      >
        <router-link :to="'/album/' + album.title">
          <div class="album-preview__link-container">
            <img
              class="album-preview__image"
              :srcset="`${imageUrlFor(album.images[0].image).width(300)} 300w,
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
              :src="`${imageUrlFor(album.images[0].image)}`"
              :alt="album.images[0].imageName.name"
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
      bio: [],
    };
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
  margin-bottom: 3rem;
}
.album-preview__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 300px;
  gap: 20px 20px;
  margin-top: 40px;
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

.album-preview__link-container:hover .album-preview__image {
  transform: scale(1.1);
}

#title {
  grid-column-start: 2;
}
#bio {
  grid-column-start: 3;
  grid-row-start: 2;
}
h1 {
  margin: 3rem 0 1rem;
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
  .homepage {
    padding: 0 50px;
  }
}

@media only screen and (max-width: 767px) {
  .homepage {
    padding: 0 10px;
  }
}
</style>
