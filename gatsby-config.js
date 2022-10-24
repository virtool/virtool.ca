module.exports = {
  siteMetadata: {
    title: `virtool.ca`,
    siteUrl: `https://www.virtool.ca`,
  },
  plugins: [
    "gatsby-plugin-slug",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-mdx",
      options: { gatsbyRemarkPlugins: ["gatsby-remark-prismjs"] },
    },
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: "Inter",
            file: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap",
          },
          {
            name: "Source Code Pro",
            file: "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;700&display=swap",
          },
        ],
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/data`,
      },
    },
  ],
};
