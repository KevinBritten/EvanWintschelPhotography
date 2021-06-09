module.exports = function(api) {
  const presets = ["@vue/app"];
  api.cache(true);
  return {
    presets
  };
};
