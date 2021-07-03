export default {
  state: {
    albums: [],
    lightboxOpen: false,
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
