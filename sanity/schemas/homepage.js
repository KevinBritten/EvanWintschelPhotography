export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
