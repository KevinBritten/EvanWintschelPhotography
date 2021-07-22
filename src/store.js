export default {
  state: {
    albums: [],
    lightboxOpen: false,
    breakpoints: [767, 991, 1400],
    mobileMenuOpen: false,
    isMobile: false,
  },
  mutations: {
    setAlbums(state, payload) {
      state.albums = payload;
    },
    toggleLightbox(state) {
      state.lightboxOpen = !state.lightboxOpen;
    },
    closeLightbox(state) {
      state.lightboxOpen = false;
    },
    mobileMenuOpen(state, payload) {
      state.mobileMenuOpen = payload;
    },
    isMobile(state, payload) {
      state.isMobile = payload;
    },
  },
};
