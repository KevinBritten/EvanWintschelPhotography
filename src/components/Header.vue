<template>
  <div>
    <nav>
      <span class="mobile-close-btn" v-if="isMobile">X</span>
      <router-link :to="'/'" class="home-link">Home</router-link>
      <span>albums:</span>
      <router-link
        v-for="album in albums"
        :key="album.title"
        :to="'/album/' + album.title"
      >
        {{ album.title }}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
    };
  },
  props: ["albums"],
  created() {
    const breakpointIndex = this.$store.state.breakpoints.findIndex((b) => {
      return window.innerWidth < b;
    });
    this.isMobile = breakpointIndex < 2 && breakpointIndex > -1;
  },
};
</script>

<style>
nav {
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

.mobile-close-btn {
  position: fixed;
  right: 1em;
  top: 1em;
  font-size: 20px;
  font-family: sans-serif;
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
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  nav a {
    margin: 10px 0;
  }
  .home-link {
    position: fixed;
    left: 1em;
    top: 1em;
    margin: 0;
  }
}
</style>