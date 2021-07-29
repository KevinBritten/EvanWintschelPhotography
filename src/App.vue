<template>
  <div id="app">
    <button
      v-if="$store.state.currentBreakpoint <= 1"
      class="hamburger hamburger--collapse"
      :class="{ 'is-active': $store.state.mobileMenuOpen }"
      type="button"
      @click="$store.commit('mobileMenuOpen', !$store.state.mobileMenuOpen)"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <Header
      v-show="$store.state.mobileMenuOpen || $store.state.currentBreakpoint > 1"
    />
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" v-if="albums" />
    </transition>
  </div>
</template>

<script>
import sanity from "./sanity";

import Header from "./components/Header.vue";
var throttle = require("lodash.throttle");

const query = `*[_type == "album"]`;

export default {
  name: "app",
  components: { Header },

  data() {
    return {
      albums: false,
    };
  },
  computed: {
    lightboxOpen() {
      return this.$store.state.lightboxOpen;
    },
  },
  async created() {
    this.setCurrentBreakpoint();
    await this.setAlbums();
    const setBreakpointThrottled = throttle(
      () => {
        this.setCurrentBreakpoint();
      },
      100,
      {
        leading: false,
      }
    );
    window.addEventListener("resize", setBreakpointThrottled);
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
      this.albums = payload;
    },
    setCurrentBreakpoint() {
      this.$store.commit("setCurrentBreakpoint");
    },
  },
  watch: {
    lightboxOpen() {
      if (this.lightboxOpen) {
        document.body.style.overflow = "hidden";
        document.body.style.padding = "0 18px 0 0";
      } else {
        document.body.style.overflow = "initial";
        document.body.style.padding = "0";
      }
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 3.5rem 0 100px;
  width: 100%;
  height: 100%;
  position: relative;
}

.hamburger {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
}
</style>