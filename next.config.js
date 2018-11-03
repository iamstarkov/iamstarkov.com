const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withMDX = require("@zeit/next-mdx")({
  extension: /\.mdx?$/
});

module.exports = withBundleAnalyzer({
  analyzeBrowser: true,
  bundleAnalyzerConfig: {
    browser: {
      analyzerMode: 'static',
      reportFilename: '../out/analyze-bundle-client.html'
    }
  },
  ...withMDX({
    pageExtensions: ["js", "mdx", "md"]
  }),
  exportPathMap: async defaultPathMap => {
    delete defaultPathMap["/404"];
    return {
      "/404.html": { page: "/_error" },
      ...defaultPathMap
    };
  }
});
