<template>
  <div id="app">
    <nav>
      <router-link :to="'/'">Home</router-link>
      <router-link
        v-for="album in albums"
        :key="album.title"
        :to="'/album/' + album.title"
      >
        {{ album.title }}
      </router-link>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
    <SiteFooter />
  </div>
</template>

<script>
import sanity from "./sanity";

import SiteFooter from "./components/SiteFooter.vue";

const query = `*[_type == "album"]`;

export default {
  name: "app",
  components: { SiteFooter },

  data() {
    return {
      albums: [],
    };
  },
  created() {
    this.setAlbums();
  },
  methods: {
    fetchData() {
      this.error = this.post = null;

      return sanity.fetch(query).then(
        (albums) => {
          return albums;
        },
        (error) => {
          this.error = error;
        }
      );
    },
    async setAlbums() {
      const payload = await this.fetchData();
      this.$store.commit("setAlbums", payload);
      this.albums = this.$store.state.albums;
    },
  },
};
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.8s ease;
}

.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

body::-webkit-scrollbar {
  display: none;
}

#app {
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 3.5rem 0 100px;
  width: 100%;
  height: 100%;
  min-height: 150vh;
  position: relative;
}

nav {
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  font-size: 1rem;
  height: 3.5rem;
  justify-content: flex-start;
  z-index: 10;
}

nav a {
  color: #fff;
  text-decoration: none;
  text-align: center;
  padding: 0 1rem;
  font-weight: 700;
}
</style>

<style>
/* Global styles */

body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
