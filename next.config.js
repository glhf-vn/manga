const withPlugins = require("next-compose-plugins");

const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/list",
  "@fullcalendar/google-calendar",
]);

module.exports = withPlugins([withTM], {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx"],
});
