module.exports = {
  siteMetadata: {
    title: `virtool.ca`,
    siteUrl: `https://www.virtool.ca`,
  },
  plugins: [
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-mdx",
      options: { gatsbyRemarkPlugins: ["gatsby-remark-prismjs"] },
    },
    "gatsby-plugin-sharp",
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
