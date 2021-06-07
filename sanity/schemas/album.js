export default {
  name: "album",
  title: "Album",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          name: "photo",
          title: "Photo",

          fields: [
            {
              name: "imageName",
              title: "Image Name",
              type: "object",

              fields: [
                {
                  name: "name",
                  title: "Name",
                  type: "string"
                }
              ]
            },
            {
              name: "image",
              title: "Image",
              type: "image"
            }
          ],
          preview: {
            select: {
              title: "imageName",
              media: "image"
            },
            prepare(selection) {
              const { title, media } = selection;
              console.log(selection);
              return {
                title: title.name,
                media: media
              };
            }
          }
        }
      ]
    }
  ]
};
