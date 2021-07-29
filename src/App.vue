<template>
  <div id="app">
    <button
      v-if="$store.state.isMobile"
      class="hamburger hamburger--collapse"
      :class="{ 'is-active': $store.state.mobileMenuOpen }"
      type="button"
      @click="$store.commit('mobileMenuOpen', !$store.state.mobileMenuOpen)"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <Header v-show="$store.state.mobileMenuOpen || !$store.state.isMobile" />
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" v-if="albums" />
    </transition>
  </div>
</template>

<script>
import sanity from "./sanity";

import Header from "./components/Header.vue";

const query = `*[_type == "album"]`;

export default {
  name: "app",
  // components: { SiteFooter, Header },
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
    await this.setAlbums();
    const breakpointIndex = this.$store.state.breakpoints.findIndex((b) => {
      return window.innerWidth < b;
    });
    this.$store.commit("isMobile", breakpointIndex < 2 && breakpointIndex > -1);
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
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 3.5rem 0 100px;
  width: 100%;
  height: 100%;
  /* min-height: 150vh; */
  position: relative;
}

.hamburger {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
}

/* nav {
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 40px;
  background-color: #333;
  font-size: 1.2rem;
  height: 3.5rem;
  justify-content: flex-end;
  z-index: 30;
}

nav a {
  color: #fff;
  text-decoration: none;
  padding: 0 1rem;
  font-weight: 700;
}

nav span {
  color: #bfbfbf;
  padding: 0 20px;
  font-size: 0.8rem;
}

.home-link {
  flex-grow: 1;
}

.overflow-hidden {
  overflow: hidden;
}

@media only screen and (max-width: 991px) {
  nav {
    top: 0;
    right: 0;
    bottom: 0;
    left: auto;
    padding: 50px 20px;
    height: auto;
    width: 75%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  nav a {
    margin: 10px 0;
  }
  .home-link {
    flex-grow: initial;
    padding-bottom: 20px;
  }
} */
</style>