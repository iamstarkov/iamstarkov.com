const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});

module.exports = {
  ...withMDX({
    pageExtensions: ["js", "mdx", "md"]
  }),
  exportTrailingSlash: true,
  exportPathMap: async defaultPathMap => {
    delete defaultPathMap["/404"];
    return {
      "/404.html": { page: "/_error" },
      ...defaultPathMap
    };
  }
};
