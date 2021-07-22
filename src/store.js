export default {
  state: {
    albums: [],
    lightboxOpen: false,
    breakpoints: [767, 991, 1400],
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
  },
};
