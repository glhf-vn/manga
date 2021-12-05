const withPlugins = require('next-compose-plugins')

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/google-calendar',
])

const withMDX = require('@next/mdx')({
  remarkPlugins: [],
  extension: /\.mdx?$/,
})

module.exports = withPlugins(
  [withTM, withMDX],
  {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  }
)
