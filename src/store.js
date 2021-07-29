export default {
  state: {
    albums: [],
    lightboxOpen: false,
    breakpoints: [767, 991, 1400],
    mobileMenuOpen: false,
    currentBreakpoint: 0,
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

    setCurrentBreakpoint(state) {
      const searchBreakpoint = state.breakpoints.findIndex((b) => {
        return window.innerWidth < b;
      });
      state.currentBreakpoint =
        searchBreakpoint >= 0 ? searchBreakpoint : state.breakpoints.length - 1;
    },
  },
  getters: {
    gridColumns: (state) => {
      return state.currentBreakpoint + 1;
    },
  },
};
